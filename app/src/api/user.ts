import { useHttp } from '@/api'

export function useUserApi() {
    const { get, put } = useHttp()

    function addTokensToUser(userId: string, amount: number) {
        return put<any>(`/user/${userId}/tokens`, { amount })
    }

    function getMe() {
        return get('/user/me')
    }

    return {
        addTokensToUser,
        getMe
    }
}