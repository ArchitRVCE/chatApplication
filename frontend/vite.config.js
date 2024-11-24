import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests starting with /api to the backend server
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
       // rewrite: (path) => path.replace(/^\/api/, ''), // Optionally remove "/api" from the path
      },
    },
  },
})
