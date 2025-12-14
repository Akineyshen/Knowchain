import { ref } from 'vue'
import { getTonConnectUI } from '@/composables'
import { useHttp } from '@/api/http'

const JETTON_MINTER =
    'EQDPXJBVcivTaZGMisVxC0GMQaiWHtdVeG4TUIZqys2i-IHN'

export function useWithdraw() {
    const { post } = useHttp()

    const loading = ref(false)
    const error = ref<string | null>(null)
    const success = ref(false)

    async function withdraw(internalAmount: number) {
        loading.value = true
        error.value = null
        success.value = false

        try {
            const tonConnectUI = getTonConnectUI()
            if (!tonConnectUI?.account?.address) {
                throw new Error('Wallet not connected')
            }

            // 1️⃣ prepare payload (backend)
            const prep = await post('/withdraw/prepare', {
                internalAmount,
                walletAddress: tonConnectUI.account.address
            })

            if (!prep?.payload) {
                throw new Error('Withdraw preparation failed')
            }

            // 🔹 ЯВНО: сколько TON отправляет пользователь
            // 0.5 TON = 500_000_000
            const USER_TON_AMOUNT = '500000000'

            // 2️⃣ send on-chain tx
            const tx = await tonConnectUI.sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 120,
                messages: [
                    {
                        address: JETTON_MINTER,
                        amount: USER_TON_AMOUNT,
                        payload: prep.payload
                    }
                ]
            })

            // ⚠️ ВАЖНО: tx.boc — это НЕ hash, но мы используем как reference
            await post('/withdraw', {
                internalAmount,
                txHash: tx.boc
            })

            console.log(
                'Withdraw tx sent from:',
                tonConnectUI.account.address
            )

            success.value = true
        } catch (e: any) {
            error.value = e?.message || 'Withdraw failed'
        } finally {
            loading.value = false
        }
    }

    return {
        withdraw,
        loading,
        error,
        success
    }
}
