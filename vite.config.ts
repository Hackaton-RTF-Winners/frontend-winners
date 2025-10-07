import { defineConfig } from 'vite'
import path from 'path'
// https://vite.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@process': path.resolve(__dirname, 'src/process'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
})
