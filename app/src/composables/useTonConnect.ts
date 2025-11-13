import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Wallet } from '@tonconnect/sdk'
import { TonConnect } from '@tonconnect/sdk'
import { TonConnectUI } from '@tonconnect/ui'

interface TonConnectState {
    wallet: Wallet | null
    connected: boolean
    address: string | null
}

const tonConnect = ref<TonConnect | null>(null)
const tonConnectUI = ref<TonConnectUI | null>(null)
const state = ref<TonConnectState>({
    wallet: null,
    connected: false,
    address: null
})

export function useTonConnect() {
    const isConnected = computed(() => state.value.connected)
    const walletAddress = computed(() => state.value.address)
    const currentWallet = computed(() => state.value.wallet)

    const manifestUrl = 'https://900e6fd14e25.ngrok-free.app/manifest/tonconnect-manifest.json'

    const initTonConnect = async () => {
        try {
            tonConnect.value = new TonConnect({
                manifestUrl
            })

            tonConnectUI.value = new TonConnectUI({
                manifestUrl,
            })

            tonConnect.value.onStatusChange((wallet) => {
                updateWalletState(wallet)
            })

            const currentWallet = tonConnect.value.wallet
            if (currentWallet) {
                updateWalletState(currentWallet)
            }

        } catch (error) {
            console.error('Error init Ton Connect:', error)
        }
    }

    const updateWalletState = (wallet: Wallet | null) => {
        state.value.wallet = wallet
        state.value.connected = !!wallet
        state.value.address = wallet ? wallet.account.address : null
    }

    const connectWallet = async () => {
        if (!tonConnectUI.value) {
            console.error('TonConnectUI is not initialized')
            return
        }

        try {
            await tonConnectUI.value.openModal()
        } catch (error) {
            console.error('Error connect wallet:', error)
            throw error
        }
    }

    const formatAddress = (address: string | null ) => {
        if (!address) return ''
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    onMounted(() => {
        initTonConnect()
    })

    onUnmounted(() => {
        if(tonConnect.value) {
            tonConnect.value.disconnect()
        }
    })

    return {
        // Condition
        isConnected,
        walletAddress,
        currentWallet,

        // Methods
        connectWallet,
        formatAddress,

        // Utils
        initTonConnect
    }
}