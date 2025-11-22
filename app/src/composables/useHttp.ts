import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || '/api'

interface RequestOptions {
    endpoint: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: any
    headers?: HeadersInit
}

export function useHttp() {
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const request = async <T>({
                                  endpoint,
                                  method = 'GET',
                                  body = null,
                                  headers = { 'Content-Type': 'application/json' },
                              }: RequestOptions): Promise<T> => {
        isLoading.value = true
        error.value = null

        try {
            const url = `${API_URL}${endpoint}`

            const options: RequestInit = {
                method,
                headers,
                credentials: 'include',
            }

            if (body !== null) {
                const hasContentType =
                    headers &&
                    typeof headers === 'object' &&
                    'Content-Type' in headers

                if (!hasContentType) {
                    ;(options.headers as Record<string, string>)['Content-Type'] = 'application/json'
                }

                options.body =
                    body instanceof FormData ? body : JSON.stringify(body)
            }

            const response = await fetch(url, options)

            if (!response.ok && response.status !== 401 && response.status !== 404) {
                throw new Error(
                    `Request failed: ${url}, status: ${response.status}`,
                )
            }

            if (response.status === 204) {
                return null as T
            }

            const data = (await response.json()) as T
            return data
        } catch (e: any) {
            error.value = e?.message || 'Unknown error'
            throw e
        } finally {
            isLoading.value = false
        }
    }

    const get = <T>(endpoint: string, headers?: HeadersInit) =>
        request<T>({ endpoint, method: 'GET', headers })

    const post = <T>(
        endpoint: string,
        body?: any,
        headers?: HeadersInit,
    ) => request<T>({ endpoint, method: 'POST', body, headers })

    const put = <T>(
        endpoint: string,
        body?: any,
        headers?: HeadersInit,
    ) => request<T>({ endpoint, method: 'PUT', body, headers })

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
