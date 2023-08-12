import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/device': 'http://localhost:3000',
      '/devices': 'http://localhost:3000',
    },
  },
});
