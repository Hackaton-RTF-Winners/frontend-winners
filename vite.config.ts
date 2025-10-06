import fs from 'node:fs'
import { defineConfig } from 'vite'
import path from 'path'

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
    port: 443,
    host: '0.0.0.0',
    hmr: {
      host: 'mercatus.local',
      port: 443,
    },
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'mercatus.local-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'mercatus.local.pem')),
    },
  },
})
