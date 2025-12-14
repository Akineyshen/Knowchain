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
          '@': path.resolve(__dirname, './src'),
          '@shared': path.resolve(__dirname, '../shared'),
      },
    }
})
