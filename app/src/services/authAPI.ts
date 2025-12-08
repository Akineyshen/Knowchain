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
        const res = await fetch(`${API_URL}/user/me`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            cache: 'no-store'
        });

        if (!res.ok) {
            if (res.status === 401) {
                console.warn('❌ Unauthorized (401). Cookie missing or CORS issue on Backend.');
            }
            return null;
        }

        const data = await res.json();
        return data?.user ?? data;
    } catch (error) {
        console.error('Error fetching user:', error)
        return null
    }
}
