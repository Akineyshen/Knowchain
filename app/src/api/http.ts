export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface HttpError extends Error {
    status?: number
    body?: any
}

async function request<R = any>(
    method: HttpMethod,
    path: string,
    body?: any,
    opts: RequestInit = {}
): Promise<R> {
    const base = (import.meta as any).env?.VITE_API_BASE_URL ?? 'https://knowchain-px47.onrender.com'
    const url = path.startsWith('http') ? path : `${base}${path}`

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const headers: Record<string, string> = {
        'Accept': 'application/json',
        ...((opts.headers as Record<string, string>) ?? {})
    }

    const hasBody = typeof body !== 'undefined' && body !== null && method !== 'GET'
    if (hasBody) {
        headers['Content-Type'] = headers['Content-Type'] ?? 'application/json'
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const fetchOpts: RequestInit = {
        method,
        credentials: 'include',
        ...opts,
        headers,
        body: hasBody ? (headers['Content-Type'] === 'application/json' ? JSON.stringify(body) : (body as any)) : undefined
    }

    let res: Response
    try {
        res = await fetch(url, fetchOpts)
    } catch (err: any) {
        const e: HttpError = new Error(`Network error: ${err?.message ?? String(err)}`)
        e.body = null
        throw e
    }

    let parsedBody: any = null
    const contentType = res.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) {
        try {
            parsedBody = await res.json()
        } catch (err) {
            parsedBody = null
        }
    } else {
        try {
            const text = await res.text()
            parsedBody = text ? text : null
        } catch {
            parsedBody = null
        }
    }

    if (!res.ok) {
        const msg = (parsedBody && (parsedBody.message || parsedBody.error || JSON.stringify(parsedBody))) ?? res.statusText
        const e: HttpError = new Error(msg)
        e.status = res.status
        e.body = parsedBody
        throw e
    }

    return parsedBody as R
}

export function useHttp() {
    return {
        get: <T = any>(path: string, opts?: RequestInit) => request<T>('GET', path, undefined, opts),
        post: <T = any>(path: string, body?: any, opts?: RequestInit) => request<T>('POST', path, body, opts),
        put: <T = any>(path: string, body?: any, opts?: RequestInit) => request<T>('PUT', path, body, opts),
        del: <T = any>(path: string, body?: any, opts?: RequestInit) => request<T>('DELETE', path, body, opts),
        request
    }
}
