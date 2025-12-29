import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Base path for GitHub Pages deployment
  // For repo: https://github.com/username/repo-name
  // This will be: /repo-name/
  // Update this to match your repository name
  base: process.env.GITHUB_PAGES ? '/simple-todo-v4/' : '/',
});
