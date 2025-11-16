import { ref, computed, onMounted } from 'vue'
import type { Wallet } from '@tonconnect/sdk'
import { toUserFriendlyAddress } from '@tonconnect/sdk'
import { TonConnectUI } from '@tonconnect/ui'

interface TonConnectState {
    wallet: Wallet | null
    connected: boolean
    address: string | null
}

const tonConnectUI = ref<TonConnectUI | null>(null)

const state = ref<TonConnectState>({
    wallet: null,
    connected: false,
    address: null,
})

export function useTonConnect() {
    const isConnected = computed(() => state.value.connected)
    const walletAddress = computed(() => state.value.address)
    const currentWallet = computed(() => state.value.wallet)

    const manifestUrl = `https://app.knowchain.eu/manifest/tonconnect-manifest.json`

    const updateWalletState = (wallet: Wallet | null) => {
        if (!wallet) {
            state.value.wallet = null
            state.value.connected = false
            state.value.address = null
            return
        }

        const rawAddress = wallet.account.address

        state.value.wallet = wallet
        state.value.connected = true
        state.value.address = toUserFriendlyAddress(rawAddress)
    }

    const initTonConnect = async () => {
        try {
            tonConnectUI.value = new TonConnectUI({
                manifestUrl
            })

            tonConnectUI.value.onStatusChange((wallet) => {
                updateWalletState(wallet)
            })

            const current = tonConnectUI.value.wallet
            if (current) {
                updateWalletState(current)
            }

        } catch (error) {
            console.error('Error init Ton Connect:', error)
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

    return {
        // Condition
        isConnected,
        walletAddress,
        currentWallet,

        // Methods
        connectWallet,
        formatAddress,

        // Utils
        initTonConnect,
    }
}