import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    port: 3090,  // Match your Railway port
    strictPort: true,
    host: true    // Allow external connections
  },
  preview: {
    port: 3090,  // Match your Railway port
    strictPort: true,
    host: true    // Allow external connections
  }
})