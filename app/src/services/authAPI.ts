export interface TonProofPayload {
    timestamp: number
    domain: {
        lengthBytes: number
        value: string
    }
    signature: string
    payload: string
}

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function getTonProofPayload(): Promise<string | null> {
    try {
        const res = await fetch(`${apiUrl}/auth/ton-login/payload`)

        if (!res.ok) {
            return null
        }

        const contentType = res.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
            return null
        }

        const data = await res.json().catch(() => null)
        if (!data || typeof data.payload !== 'string') {
            return null
        }

        return data.payload
    } catch (error) {
        console.error('Error fetching ton-proof payload', error)
        return null
    }
}

export async function tonLogin(address: string, proof: TonProofPayload) {
    const body = {
        address,
        proof: {
            timestamp: proof.timestamp,
            domain: proof.domain,
            signature: proof.signature,
            payload: proof.payload,
        },
    }

    const res = await fetch(`${apiUrl}/auth/ton-login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
        console.error('Ton login failed:', data || res.statusText)
        throw new Error('Ton login failed')
    }

    return data
}