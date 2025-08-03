import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 3000,
      host: '0.0.0.0'
    },
    allowedHosts: [
      'all',
      '.replit.dev',
      '.replit.app',
      'df6257d2-c49c-4f68-8d01-070ba16678cf-00-2ylyv99lc2w6r.janeway.replit.dev'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/remove-vocals': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/adjust-pitch-tempo': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/convert-format': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/cut-join-audio': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/reduce-noise': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/play': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})