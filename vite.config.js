import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    // server configurations
    hmr: {
      protocol: 'ws',  // using 'ws' for WebSockets
      timeout: 5000,  // a timeout for HMR
    },
  },
})
