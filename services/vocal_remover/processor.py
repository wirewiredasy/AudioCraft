import os
import time
import subprocess
import asyncio
from typing import Dict, Any
from shared.config import PROCESSED_DIR
from shared.audio_utils import generate_unique_filename

async def process_vocal_removal(input_path: str, file_id: str) -> Dict[str, Any]:
    """
    Process vocal removal using Spleeter
    """
    start_time = time.time()
    
    try:
        # Create output directory for this specific processing
        output_dir = os.path.join(PROCESSED_DIR, f"vocal_removal_{file_id}")
        os.makedirs(output_dir, exist_ok=True)
        
        # Run Spleeter command
        cmd = [
            "spleeter", "separate",
            "-p", "spleeter:2stems",
            "-o", output_dir,
            input_path
        ]
        
        # Execute spleeter asynchronously
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        stdout, stderr = await process.communicate()
        
        if process.returncode != 0:
            error_msg = stderr.decode() if stderr else "Unknown spleeter error"
            return {
                "success": False,
                "error": f"Spleeter processing failed: {error_msg}"
            }
        
        # Find the generated files
        base_filename = os.path.splitext(os.path.basename(input_path))[0]
        source_folder = os.path.join(output_dir, base_filename)
        
        vocals_path = None
        instrumental_path = None
        
        if os.path.exists(source_folder):
            vocals_file = os.path.join(source_folder, "vocals.wav")
            accompaniment_file = os.path.join(source_folder, "accompaniment.wav")
            
            # Move files to final location with proper names
            if os.path.exists(vocals_file):
                vocals_filename = generate_unique_filename("vocals.wav", file_id)
                vocals_path = os.path.join(PROCESSED_DIR, vocals_filename)
                os.rename(vocals_file, vocals_path)
            
            if os.path.exists(accompaniment_file):
                instrumental_filename = generate_unique_filename("instrumental.wav", file_id)
                instrumental_path = os.path.join(PROCESSED_DIR, instrumental_filename)
                os.rename(accompaniment_file, instrumental_path)
        
        # Clean up temporary directory
        try:
            import shutil
            shutil.rmtree(output_dir)
        except:
            pass
        
        processing_time = time.time() - start_time
        
        return {
            "success": True,
            "vocals_path": vocals_path,
            "instrumental_path": instrumental_path,
            "processing_time": processing_time
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": f"Vocal removal processing error: {str(e)}"
        }
