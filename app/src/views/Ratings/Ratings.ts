import { computed } from 'vue'

export interface RatingUser {
    id: number
    name: string
    balance: number
    avatar?: string | null
    isCurrent?: boolean
}

export interface RatedUser extends RatingUser {
    rank: number
}

const MOCK_USERS: RatingUser[] = [
    {
        id: 1,
        name: 'Vortex',
        balance: 100_000,
        avatar: '/logo/icon-192.png'
    },
    {
        id: 2,
        name: 'Nytrix',
        balance: 88_000,
        avatar: '/logo/icon-192.png'
    },
    {
        id: 3,
        name: 'Solven',
        balance: 58_000,
        avatar: '/logo/icon-192.png'
    },
    { id: 4, name: 'Averon', balance: 46_000, avatar: '/logo/icon-192.png' },
    { id: 5, name: 'Klyra', balance: 44_000, avatar: '/logo/icon-192.png' },
    { id: 6, name: 'Taren', balance: 42_000, avatar: '/logo/icon-192.png' },
    { id: 7, name: 'Rynex', balance: 39_000, avatar: '/logo/icon-192.png' },
    { id: 8, name: 'Rynex', balance: 39_000, avatar: '/logo/icon-192.png' },
    { id: 9, name: 'Rynex', balance: 39_000, avatar: '/logo/icon-192.png' },
    { id: 10, name: 'Rynex', balance: 39_000, avatar: '/logo/icon-192.png' },
    { id: 11, name: 'Rynex', balance: 39_000, avatar: '/logo/icon-192.png' },
    { id: 12, name: 'Rynex', balance: 39_000, avatar: '/logo/icon-192.png' },
    { id: 13, name: 'Rynex', balance: 39_000, avatar: '/logo/icon-192.png' },
    {
        id: 99,
        name: 'Zerith',
        balance: 2_300,
        avatar: '/logo/icon-192.png',
        isCurrent: true
    }
]

// форматирование в стиле 1K / 1.2K / 170
export function formatBalanceShort(balance: number): string {
    if (balance >= 1000) {
        const value = balance / 1000
        const str =
            value % 1 === 0 ? value.toFixed(0) : value.toFixed(1).replace(/\.0$/, '')
        return `${str}K`
    }
    return `${balance}`
}

export function useRatings() {
    const ranked = computed<RatedUser[]>(() => {
        return [...MOCK_USERS]
            .sort((a, b) => b.balance - a.balance)
            .map((user, index) => ({
                ...user,
                rank: index + 1
            }))
    })

    const top3 = computed(() => ranked.value.slice(0, 3))
    const others = computed(() => ranked.value.slice(3))

    const currentUser = computed<RatedUser | null>(() => {
        return ranked.value.find(u => u.isCurrent) ?? null
    })

    return {
        top3,
        others,
        currentUser
    }
}
