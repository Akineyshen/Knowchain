import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['logo/icon-192.png', 'logo/icon-512.png'],
            manifest: false,
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            }
        })
    ],
    resolve: {
      alias: {
          '@shared': path.resolve(__dirname, '../shared'),
          '@components': path.resolve(__dirname, './src/components'),
          '@composables': path.resolve(__dirname, './src/composables'),
          '@types': path.resolve(__dirname, './src/types'),
          '@pages': path.resolve(__dirname, './src/pages'),
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
