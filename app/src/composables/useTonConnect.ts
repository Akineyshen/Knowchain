import { ref, computed, onMounted } from 'vue'
import { toUserFriendlyAddress, type Wallet } from '@tonconnect/sdk'
import { TonConnectUI } from '@tonconnect/ui'
import { getTonProofPayload, tonLogin, type TonProofPayload } from "../services/authAPI.ts";

interface TonConnectState {
    wallet: Wallet | null
    connected: boolean
    address: string | null
    rawAddress: string | null
    initialized: boolean
}

const tonConnectUI = ref<TonConnectUI | null>(null)

const state = ref<TonConnectState>({
    wallet: null,
    connected: false,
    address: null,
    rawAddress: null,
    initialized: false,
})

export function useTonConnect() {
    const isConnected = computed(() => state.value.connected)
    const walletAddress = computed(() => state.value.address)
    const currentWallet = computed(() => state.value.wallet)
    const isInitialized = computed(() => state.value.initialized)

    const manifestUrl = `https://app.knowchain.eu/manifest/tonconnect-manifest.json`

    const updateWalletState = (wallet: Wallet | null) => {
        if (!wallet) {
            state.value.wallet = null
            state.value.connected = false
            state.value.address = null
            state.value.rawAddress = null
            return
        }

        const rawAddress = wallet.account.address

        state.value.wallet = wallet
        state.value.connected = true
        state.value.rawAddress = rawAddress
        state.value.address = toUserFriendlyAddress(rawAddress)
    }

    const prepareTonProof = async () => {
        if (!tonConnectUI.value) return

        tonConnectUI.value.setConnectRequestParameters({ state: 'loading' })

        try {
            const payload = await getTonProofPayload()

            if (!payload) {
                tonConnectUI.value.setConnectRequestParameters(null)
                return
            }

            tonConnectUI.value.setConnectRequestParameters({
                state: 'ready',
                value: {
                    tonProof: payload,
                },
            })
        } catch (e) {
            console.error('Error in prepareTonProof', e)
            tonConnectUI.value.setConnectRequestParameters(null)
        }
    }

    const initTonConnect = async () => {
        try {
            tonConnectUI.value = new TonConnectUI({
                manifestUrl
            })

            tonConnectUI.value.onStatusChange(async (wallet) => {
                updateWalletState(wallet)

                if (
                    wallet &&
                    wallet.connectItems?.tonProof &&
                    'proof' in wallet.connectItems.tonProof
                ) {
                    const proof = wallet.connectItems.tonProof.proof as TonProofPayload
                    const rawAddress = wallet.account.address

                    try {
                        await tonLogin(rawAddress, proof)
                    } catch (e) {
                        console.error('Ton login error:', e)
                    }
                }
            })

            const current = tonConnectUI.value.wallet
            if (current) {
                updateWalletState(current)
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
            void prepareTonProof()

            await tonConnectUI.value.openModal()
        } catch (error) {
            console.error('TonConnectUI is not initialized')
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
        isInitialized,

        // Methods
        connectWallet,
        formatAddress,

        // Utils
        initTonConnect,
    }
}