
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Vercel 部署建议使用绝对路径
  build: {
    outDir: 'dist',
  },
});