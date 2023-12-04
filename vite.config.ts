import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@config': '/src/Config/',
      '@components': '/src/Components/',
      '@pages': '/src/Pages/',
      "@interfaces": '/src/Interfaces',
      "@services": '/src/Services',
      "@context": '/src/Context',
      "@hooks": '/src/Hooks',
      "@utils": '/src/Utils'
    }
  }
})
