import { defineConfig } from 'vite'
import fs from 'node:fs'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 443,
    host: '0.0.0.0',
    hmr: {
      host: 'mercatus.local',
      port: 443,
    },
    https: {
      key: fs.readFileSync('./mercatus.local-key.pem'),
      cert: fs.readFileSync('./mercatus.local.pem'),
    },
  },
})
