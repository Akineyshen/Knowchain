import { computed } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { userService } from "@/services/user.service"

export function useUser() {
    const store = useUserStore()
    const user = computed(() => store.user)
    const isLogged = computed(() => store.isLogged)
    const userId = computed(() => store.userId)
    const balance = computed(() => store.balance)
    const rawAddress = computed(() => store.rawAddress)

    async function loadMe() {
        const user = await userService.loadMe()
        if (user) store.setUser(user)
        return user
    }

    async function addTokens(amount: number) {
        if (!store.user) throw new Error('User not loaded')
        const updated = await userService.addTokens(store.user.id, amount)
        if (updated?.tokens !== undefined) {
            store.updateTokens(updated.tokens)
        } else if (updated) {
            store.patch(updated)
        }
        return updated
    }

    return {
        user,
        isLogged,
        userId,
        balance,
        rawAddress,
        loadMe,
        addTokens
    }
}