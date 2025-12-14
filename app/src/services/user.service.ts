import { useUserApi } from '@/api'
import { useUserStore } from '@/stores/useUserStore'

class UserService {
    private get api() {
        return useUserApi()
    }

    private get store() {
        return useUserStore()
    }

    async loadMe() {
        const user = await this.api.getMe()
        this.store.setUser(user)
        return user
    }

    async addTokens(amount: number) {
        if (!this.store.user) {
            throw new Error('User is not loaded')
        }

        const updated = await this.api.addTokensToUser(this.store.user.id, amount)

        if (updated?.tokens !== undefined) {
            this.store.updateTokens(updated.tokens)
        }

        return updated
    }

    syncUser(payload: any) {
        if (!this.store.user) return
        this.store.setUser({ ...this.store.user, ...payload })
    }
}

export const userService = new UserService()
