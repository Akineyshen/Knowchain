const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export interface User {
    id: string | number
    raw_address: string
    name?: string
    tokens: number
}

export async function tonLogin(rawAddress: string): Promise<any> {
    try {
        console.log('🚀 Auth: Sending login request via Cookie Session...');

        const res = await fetch(`${API_URL}/auth/ton-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Важно: include заставляет браузер принимать и сохранять Set-Cookie от сервера
            credentials: 'include',
            body: JSON.stringify({ raw_address: rawAddress }),
        })

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            throw new Error(data?.message || 'Login failed');
        }

        console.log('✅ Login successful. Session cookie should be set by browser.');
        return data
    } catch (error) {
        console.error('Ton login error:', error)
        throw error
    }
}

export async function getMe(): Promise<User | null> {
    try {
        // Мы не отправляем заголовок Authorization, так как токен лежит в куках.
        // Браузер сам прикрепит куки благодаря credentials: 'include'
        const res = await fetch(`${API_URL}/user/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })

        if (!res.ok) {
            if (res.status === 401) {
                console.warn('❌ Unauthorized (401). Cookie missing or CORS issue on Backend.');
            }
            return null
        }

        const userData = await res.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user:', error)
        return null
    }
}