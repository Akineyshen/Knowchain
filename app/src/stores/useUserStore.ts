import { defineStore } from 'pinia'

export interface UserPayload {
    id: string
    tokens?: number
    [k: string]: any
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as UserPayload | null,
    }),

    actions: {
        setUser(u: UserPayload | null) {
            this.user = u
        },
        updateTokens(amount: number) {
            if (this.user) {
                this.user.tokens = amount
            }
        }
    }
})
