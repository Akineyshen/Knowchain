import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
          '@shared': path.resolve(__dirname, '../shared'),
          '@components': path.resolve(__dirname, './src/components'),
          '@composables': path.resolve(__dirname, './src/composables'),
          '@types': path.resolve(__dirname, './src/types'),
      },
    },
    server: {
        allowedHosts: [
            '2dd368dac286.ngrok-free.app',
            '.ngrok-free.app',
            '.ngrok.io',
        ]
    }
})
