import { defineStore } from 'pinia'
import type { User } from '@/types/api'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
    }),


    getters: {
        isLogged: (state): boolean => state.user !== null,
        userId: (state): string | null => state.user?.id ?? null,
        balance: (state): number => state.user?.tokens ?? 0,
        rawAddress: (state): string | null => state.user?.raw_address ?? null,
    },

    actions: {
        setUser(payload: User | null) {
            this.user = payload
        },

        updateTokens(tokens: number) {
            if (!this.user) return
            this.user.tokens = tokens
        },

        patch(p: Partial<User>) {
            if (!this.user) return
            this.user = { ...this.user, ...p }
        }
    }
})