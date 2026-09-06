import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        project:   resolve(__dirname, 'project.html'),
        about:     resolve(__dirname, 'about.html'),
        services:  resolve(__dirname, 'services.html'),
        contact:   resolve(__dirname, 'contact.html'),
      }
    }
  }
});
