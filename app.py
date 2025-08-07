import os
import subprocess
import threading
import time
import requests
from flask import Flask, render_template, send_from_directory, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)

# Create the Flask app
app = Flask(__name__, static_folder='frontend/.next/static', template_folder='frontend/out')
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///odoremover.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# Initialize the app with the extension
db.init_app(app)

# FastAPI backend process
backend_process = None
frontend_process = None

def start_backend():
    """Start the FastAPI backend server"""
    global backend_process
    try:
        backend_process = subprocess.Popen([
            "python", "-m", "uvicorn", 
            "backend.api_gateway.main:app", 
            "--host", "0.0.0.0", 
            "--port", "8000",
            "--reload"
        ], cwd=".")
        print("Backend started on port 8000")
    except Exception as e:
        print(f"Failed to start backend: {e}")

def start_frontend():
    """Build and start the Next.js frontend"""
    global frontend_process
    try:
        # Install dependencies first
        subprocess.run(["npm", "install"], cwd="frontend", check=True)
        # Build the frontend
        subprocess.run(["npm", "run", "build"], cwd="frontend", check=True)
        # Export static files
        subprocess.run(["npm", "run", "export"], cwd="frontend", check=True)
        print("Frontend built and exported successfully")
    except Exception as e:
        print(f"Failed to build frontend: {e}")

# Start backend and frontend processes
def initialize_services():
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=start_backend)
    backend_thread.daemon = True
    backend_thread.start()
    
    # Build frontend
    frontend_thread = threading.Thread(target=start_frontend)
    frontend_thread.daemon = True
    frontend_thread.start()
    
    # Wait a moment for backend to start
    time.sleep(3)

# Initialize services when app starts
with app.app_context():
    # Import models (create if they don't exist)
    try:
        import models  # noqa: F401
    except ImportError:
        pass
    
    db.create_all()
    initialize_services()

@app.route('/')
def index():
    """Serve the main application"""
    try:
        return send_from_directory('frontend/out', 'index.html')
    except:
        # Fallback if static files aren't ready
        return """
        <html>
        <head><title>ODOREMOVER Audio Suite</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>ODOREMOVER Audio Suite</h1>
            <p>Professional Audio Processing Platform</p>
            <p>Building frontend... Please refresh in a moment.</p>
        </body>
        </html>
        """

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files and frontend routes"""
    try:
        # Try to serve from frontend build output
        if path.endswith('.html') or '.' not in path:
            return send_from_directory('frontend/out', path + '.html' if '.' not in path else path)
        else:
            return send_from_directory('frontend/out', path)
    except:
        # Fallback to index for SPA routing
        return send_from_directory('frontend/out', 'index.html')

@app.route('/api/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
def proxy_api(path):
    """Proxy API requests to FastAPI backend"""
    try:
        backend_url = f"http://localhost:8000/{path}"
        
        # Forward the request to backend
        if request.method == 'GET':
            resp = requests.get(backend_url, params=request.args, timeout=30)
        elif request.method == 'POST':
            if request.is_json:
                resp = requests.post(backend_url, json=request.json, timeout=30)
            else:
                resp = requests.post(backend_url, data=request.form, files=request.files, timeout=30)
        elif request.method == 'PUT':
            resp = requests.put(backend_url, json=request.json, timeout=30)
        elif request.method == 'DELETE':
            resp = requests.delete(backend_url, timeout=30)
        elif request.method == 'PATCH':
            resp = requests.patch(backend_url, json=request.json, timeout=30)
        
        # Return the response
        return resp.content, resp.status_code, resp.headers.items()
        
    except requests.exceptions.ConnectionError:
        return jsonify({"error": "Backend service unavailable"}), 503
    except requests.exceptions.Timeout:
        return jsonify({"error": "Request timeout"}), 504
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "frontend": "active",
        "backend": "active" if backend_process and backend_process.poll() is None else "inactive"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)