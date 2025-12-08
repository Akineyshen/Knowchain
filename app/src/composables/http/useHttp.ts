// src/api/http.ts
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface RequestOptions {
    endpoint: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: any
    headers?: HeadersInit
}

export function useHttp() {
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const userStore = useUserStore()

    const request = async <T>({
                                  endpoint,
                                  method = 'GET',
                                  body = null,
                                  headers = {},
                              }: RequestOptions): Promise<T> => {
        isLoading.value = true
        error.value = null

        try {
            const url = `${API_URL}${endpoint}`

            const finalHeaders: Record<string, string> = {
                ...(headers as Record<string, string> || {}),
            }

            if (!(body instanceof FormData) && !finalHeaders['Content-Type']) {
                finalHeaders['Content-Type'] = 'application/json'
            }

            // add Authorization header if store has token (or raw JWT)
            if (userStore?.user && (userStore.user as any).token) {
                finalHeaders['Authorization'] = `Bearer ${(userStore.user as any).token}`
            }

            const options: RequestInit = {
                method,
                headers: finalHeaders,
                credentials: 'include',
            }

            if (body !== null) {
                options.body = body instanceof FormData ? body : JSON.stringify(body)
            }

            const response = await fetch(url, options)

            // allow 401/404 pass-through to upper layers if needed
            if (!response.ok && response.status !== 401 && response.status !== 404) {
                throw new Error(`Request failed: ${url}, status: ${response.status}`)
            }

            if (response.status === 204) {
                return null as unknown as T
            }

            const data = await response.json()
            return data as T
        } catch (e: any) {
            error.value = e?.message || 'Unknown error'
            throw e
        } finally {
            isLoading.value = false
        }
    }

    const get = <T>(endpoint: string, headers?: HeadersInit) =>
        request<T>({ endpoint, method: 'GET', headers })

    const post = <T>(endpoint: string, body?: any, headers?: HeadersInit) =>
        request<T>({ endpoint, method: 'POST', body, headers })

    const put = <T>(endpoint: string, body?: any, headers?: HeadersInit) =>
        request<T>({ endpoint, method: 'PUT', body, headers })

    const del = <T>(endpoint: string, headers?: HeadersInit) =>
        request<T>({ endpoint, method: 'DELETE', headers })

    return {
        request,
        get,
        post,
        put,
        del,
        isLoading,
        error,
    }
}
