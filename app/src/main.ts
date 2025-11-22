import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'
import { useAppLoading } from '@composables/useAppLoading'

registerSW({ immediate: true })

const { finishLoading } = useAppLoading()

const app = createApp(App)
app.use(router)

app.mount('#app')

const routerReady = router.isReady()
const minTime = new Promise(resolve => setTimeout(resolve, 1500))

Promise.all([routerReady, minTime]).then(() => {
    finishLoading()
})
