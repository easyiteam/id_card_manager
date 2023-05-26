import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      APP_MODE: 'dev',
      REACT_APP_API_URL: "http://localhost:8080",
      REACT_APP_URL: "http://localhost:8080",
      REACT_APP_IS_DEMO: false
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 5173,
  },
  build: {
    // chunkSizeWarningLimit: 5000,
  },
})
