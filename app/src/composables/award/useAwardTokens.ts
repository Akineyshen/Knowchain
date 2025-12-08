import { useHttp } from '@composables/http/useHttp.ts'
import { useUserStore } from '@/stores/useUserStore.ts'

export interface UserPayload {
    id: string
    tokens?: number
    [k: string]: any
}

export function useAwardTokens() {
    const { get, put } = useHttp()
    const userStore = useUserStore()

    async function awardTokens(amount: number): Promise<UserPayload | null> {
        try {
            let me: UserPayload | null = userStore.user ?? null

            if (!me) {
                try {
                    const res = await get<{ user: UserPayload }>('/user/me')
                    me = (res?.user ?? (res as unknown as UserPayload)) as UserPayload | null
                } catch (err) {
                    console.warn('useAwardTokens: /user/me failed', err)
                    me = null
                }
            }

            if (!me || !me.id) {
                console.warn('useAwardTokens: no logged user, skipping')
                return null
            }

            try {
                const putRes = await put<any>(`/user/${me.id}/tokens`, { amount })
                if (putRes && (putRes.user || putRes.tokens || putRes.id)) {
                    const profile = (putRes.user ?? putRes) as UserPayload

                    userStore.setUser(profile)

                    window.dispatchEvent(new CustomEvent('user:updated', { detail: profile }))

                    return profile
                }
            } catch (err) {
                console.warn('useAwardTokens: put tokens failed', err)
            }

            try {
                const refreshed = await get<{ user: UserPayload }>('/user/me')
                const profile = (refreshed?.user ?? refreshed) as UserPayload | null
                if (profile) {
                    userStore.setUser(profile)
                    window.dispatchEvent(new CustomEvent('user:updated', { detail: profile }))
                    return profile
                }
                return null
            } catch (err) {
                console.warn('useAwardTokens: refresh /user/me failed', err)
                return null
            }
        } catch (e) {
            console.error('useAwardTokens: unexpected error', e)
            return null
        }
    }

    return { awardTokens }
}
