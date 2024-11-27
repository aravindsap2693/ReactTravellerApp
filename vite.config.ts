import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config
export default defineConfig({
  plugins: [react()],

  // Environment variables (must be defined in .env files with VITE_ prefix)
  define: {
    API_URL: JSON.stringify(process.env.VITE_API_URL),
    BASE_URL: JSON.stringify(process.env.VITE_BASE_URL),
  },

  // Add any base path or public directory
  base: './', // Optional base path setting

  // Enable trailing slashes if necessary by configuring routes or deployment setup
  server: {
    headers: {
      'X-Powered-By': 'Vite',
    },
    port: 3000,
  },

  // Other potential options
  build: {
    outDir: 'dist', // Example: output to a standalone folder like "standalone" 
  }
})
