const BASE_URL = import.meta.env.VITE_API_URL ?? ""

async function http<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(BASE_URL + path, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        credentials: "include",
        ...options,
    })

    if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(`HTTP ${res.status}: ${text || res.statusText}`)
    }
    return res.json() as Promise<T>
}

export { http }