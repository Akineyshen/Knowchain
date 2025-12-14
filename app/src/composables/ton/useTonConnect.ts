import { ref, computed, onMounted } from 'vue'
import { toUserFriendlyAddress, type Wallet } from '@tonconnect/sdk'
import { TonConnectUI } from '@tonconnect/ui'
import { tonLogin, getMe, type User } from "@/services/auth.services.ts"

interface TonConnectState {
    wallet: Wallet | null
    connected: boolean
    address: string | null
    rawAddress: string | null
    initialized: boolean
    user: User | null
}

const tonConnectUI = ref<TonConnectUI | null>(null)

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
    const user = computed(() => state.value.user)

    const manifestUrl = "https://knowchain.eu/tonconnect-manifest.json"

    const updateWalletState = async (wallet: Wallet | null) => {
        if (!wallet) {
            state.value.wallet = null
            state.value.connected = false
            state.value.address = null
            state.value.rawAddress = null
            state.value.user = null
            return
        }

        const rawAddress = wallet.account.address

        state.value.wallet = wallet
        state.value.connected = true
        state.value.rawAddress = rawAddress
        state.value.address = toUserFriendlyAddress(rawAddress)

        try {
            await tonLogin(rawAddress)

            const userData = await getMe()
            if (userData) {
                state.value.user = userData
            }
        } catch (e) {
            console.error('Backend login failed:', e)
        }
    }

    const initTonConnect = async () => {
        if (state.value.initialized) return

        try {
            tonConnectUI.value = new TonConnectUI({
                manifestUrl
            })

            tonConnectUI.value.onStatusChange(async (wallet) => {
                await updateWalletState(wallet)
            })

            const current = tonConnectUI.value.wallet
            if (current) {
                await updateWalletState(current)
            } else {
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
    }

    const formatAddress = (address: string | null ) => {
        if (!address) return ''
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    async function refreshUser() {
        try {
            const userData = await getMe();
            if (userData) {
                state.value.user = userData;
            }
            return userData;
        } catch (e) {
            console.error('refreshUser failed', e);
            return null;
        }
    }

    onMounted(() => {
        if (!tonConnectUI.value) {
            initTonConnect()
        }
    })

    return {
        isConnected,
        walletAddress,
        currentWallet,
        isInitialized,
        user,

        refreshUser,
        connectWallet,
        disconnectWallet,
        formatAddress,
        initTonConnect,
    }
}

export function getTonConnectUI() {
    return tonConnectUI.value
}
