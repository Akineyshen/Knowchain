import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'


registerSW({ immediate: true })

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

import { useAppLoading } from '@/composables/ui/useAppLoading.ts'
const { finishLoading } = useAppLoading()
import { useTonConnect } from "@/composables";

useTonConnect()

app.mount('#app')


const routerReady = router.isReady()
const minTime = new Promise(resolve => setTimeout(resolve, 1500))

Promise.all([routerReady, minTime]).then(() => {
    finishLoading()
})