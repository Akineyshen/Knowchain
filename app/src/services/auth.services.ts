// src/services/auth.service.ts
import { useHttp } from '@/api/http'
import type { User } from '@/types/api.d'

const { get, post } = useHttp()

export async function tonLogin(rawAddress: string): Promise<any> {
    const data = await post<any>('/auth/ton-login', { raw_address: rawAddress })

    if (data?.token) {
        localStorage.setItem('token', data.token)
    }

    return data
}


export async function getMe(): Promise<User | null> {
    try {
        const data = await get<any>('/user/me')
        return data?.user ?? data ?? null
    } catch (err) {
        return null
    }
}
