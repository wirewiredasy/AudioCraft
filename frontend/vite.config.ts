import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: '0.0.0.0',
    allowedHosts: [
      'localhost',
      '*.replit.dev',
      '*.repl.co',
      '694273af-7140-4123-b61b-ff079dc8abbf-00-z965ewv12ibk.spock.replit.dev'
    ],
    proxy: {
      '/api': 'http://localhost:5000',
      '/remove-vocals': 'http://localhost:5000',
      '/adjust-pitch-tempo': 'http://localhost:5000',
      '/convert-format': 'http://localhost:5000',
      '/cut-join-audio': 'http://localhost:5000',
      '/reduce-noise': 'http://localhost:5000',
      '/download': 'http://localhost:5000',
      '/health': 'http://localhost:5000'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  }
})