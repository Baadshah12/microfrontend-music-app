import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'music_library',
      filename: 'remoteEntry.js',
      exposes: {
        './MusicLibrary': './src/MusicLibrary.jsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
  },
  server: {
    port: 5001,
    cors: true,
  },
});



