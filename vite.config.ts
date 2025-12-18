
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 核心修复：使用相对路径，确保在 github.io/repo-name/ 下能正确找到文件
  build: {
    outDir: 'dist',
  },
});
