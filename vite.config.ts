import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// En producción se sirve bajo /CV-Maker/ (GitHub Pages); en dev en la raíz.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/CV-Maker/' : '/',
  plugins: [react(), tailwindcss()],
}));
