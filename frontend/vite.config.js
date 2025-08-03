import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all',
    hmr: {
      port: 443,
    },
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