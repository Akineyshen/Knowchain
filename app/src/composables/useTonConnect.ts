import { ref, computed, onMounted } from 'vue'
import { toUserFriendlyAddress, type Wallet } from '@tonconnect/sdk'
import { TonConnectUI } from '@tonconnect/ui'
import { tonLogin, getMe, type User } from "../services/authAPI"

interface TonConnectState {
    wallet: Wallet | null
    connected: boolean
    address: string | null
    rawAddress: string | null
    initialized: boolean
    user: User | null // Добавили поле для юзера
}

const tonConnectUI = ref<TonConnectUI | null>(null)

// Глобальный стейт (вне функции, чтобы был общим для всего приложения)
const state = ref<TonConnectState>({
    wallet: null,
    connected: false,
    address: null,
    rawAddress: null,
    initialized: false,
    user: null
})

export function useTonConnect() {
    const isConnected = computed(() => state.value.connected)
    const walletAddress = computed(() => state.value.address)
    const currentWallet = computed(() => state.value.wallet)
    const isInitialized = computed(() => state.value.initialized)
    const user = computed(() => state.value.user) // Геттер для юзера

    const manifestUrl = `https://app.knowchain.eu/manifest/tonconnect-manifest.json`

    // Логика обновления стейта при изменении кошелька
    const updateWalletState = async (wallet: Wallet | null) => {
        if (!wallet) {
            // Сброс данных при отключении
            state.value.wallet = null
            state.value.connected = false
            state.value.address = null
            state.value.rawAddress = null
            state.value.user = null
            return
        }

        const rawAddress = wallet.account.address

        // Обновляем локальный стейт кошелька
        state.value.wallet = wallet
        state.value.connected = true
        state.value.rawAddress = rawAddress
        state.value.address = toUserFriendlyAddress(rawAddress)

        // --- ЛОГИКА БЕКЕНДА ---
        // 1. Если мы подключились, пробуем залогиниться на беке
        try {
            await tonLogin(rawAddress)

            // 2. После успешного логина запрашиваем данные пользователя
            const userData = await getMe()
            if (userData) {
                state.value.user = userData
            }
        } catch (e) {
            console.error('Backend login failed:', e)
            // Здесь можно добавить логику отображения ошибки (toast)
        }
    }

    const initTonConnect = async () => {
        if (state.value.initialized) return // Защита от повторной инициализации

        try {
            tonConnectUI.value = new TonConnectUI({
                manifestUrl
            })

            // Подписываемся на изменения статуса
            tonConnectUI.value.onStatusChange(async (wallet) => {
                await updateWalletState(wallet)
            })

            // Проверяем текущий статус при загрузке (если пользователь уже был подключен)
            const current = tonConnectUI.value.wallet
            if (current) {
                await updateWalletState(current)
            } else {
                // Если кошелька нет, попробуем просто дернуть getMe, вдруг сессия кук жива
                // (Опционально, зависит от логики вашего приложения)
                const userData = await getMe()
                if (userData) state.value.user = userData
            }

            state.value.initialized = true
        } catch (error) {
            console.error('Error init Ton Connect:', error)
            state.value.initialized = true
        }
    }

    const connectWallet = async () => {
        if (!tonConnectUI.value) {
            console.error('TonConnectUI is not initialized')
            return
        }
        try {
            await tonConnectUI.value.openModal()
        } catch (error) {
            console.error('Error opening modal:', error)
        }
    }

    const disconnectWallet = async () => {
        if (!tonConnectUI.value) return
        await tonConnectUI.value.disconnect()
        // updateWalletState(null) сработает автоматически через onStatusChange
    }

    const formatAddress = (address: string | null ) => {
        if (!address) return ''
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    onMounted(() => {
        // Инициализируем только если еще не инициализировано
        if (!tonConnectUI.value) {
            initTonConnect()
        }
    })

    return {
        // Состояние
        isConnected,
        walletAddress,
        currentWallet,
        isInitialized,
        user, // Теперь компонент может делать const { user } = useTonConnect()

        // Методы
        connectWallet,
        disconnectWallet,
        formatAddress,
        initTonConnect,
    }
}