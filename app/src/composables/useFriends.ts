import { ref, computed } from "vue"
// import { fetchFriends, fetchFriendsStats, fetchReferralLink } from "../services/friends.api"
import type { FriendDTO } from "../types/friends.ts"

export function useFriends() {
    const isLoadingList = ref(false)
    const isLoadingStats = ref(false)
    const isLoadingLink = ref(false)
    const error = ref<string | null>(null)

    const page = ref(1)
    const pageSize = ref(20)
    const total = ref(0)
    const friends = ref<FriendDTO[]>([])

    const stats = ref<{ totalEarned: number; totalInvited: number } | null>(null)
    const referralLink = ref<string>("")

    // mock helpers
    const MOCK_TOTAL = 57
    function makeMockFriend(id: number): FriendDTO {
        const names = ["Olrosa","Shadow","Blaze","Vortex","Phantom","Raven","Thunder","Nova","Echo","Storm"]
        const name = names[id % names.length]
        const date = new Date()
        date.setDate(date.getDate() - (id * 3) % 400)
        return {
            id,
            // @ts-ignore
            avatarUrl: id % 4 === 0 ? null : `/avatars/${names[id % names.length].toLowerCase()}.png`,
            // @ts-ignore
            name,
            joinedAt: date.toISOString(),
            balance: (id * 137) % 10000,
        }
    }

    async function loadList({ reset = false } = {}) {
        try {
            isLoadingList.value = true
            error.value = null
            if (reset) page.value = 1
            // const { items, total: t } = await fetchFriends({ page: page.value, pageSize: pageSize.value })
            // mock
            const start = (page.value - 1) * pageSize.value
            const end = Math.min(MOCK_TOTAL, start + pageSize.value)
            const items: FriendDTO[] = []
            for (let i = start + 1; i <= end; i++) items.push(makeMockFriend(i))
            const t = MOCK_TOTAL
            // end mock
            total.value = t
            friends.value = reset ? items : [...friends.value, ...items]
            page.value += 1
        } catch (e: any) {
            error.value = e?.message || "Failed to load friends"
        } finally {
            isLoadingList.value = false
        }
    }

    async function loadStats() {
        try {
            isLoadingStats.value = true
            error.value = null
            // stats.value = await fetchFriendsStats()
            // mock
            stats.value = { totalEarned: 23, totalInvited: MOCK_TOTAL }
            // end mock
        } catch (e: any) {
            error.value = e?.message || "Failed to load stats"
        } finally {
            isLoadingStats.value = false
        }
    }

    async function loadReferralLink() {
        try {
            isLoadingLink.value = true
            error.value = null
            // const { link } = await fetchReferralLink()
            // mock
            const link = `https://app.knowchain.eu?ref=${Math.floor(100000 + Math.random()*899999)}`
            // end mock
            referralLink.value = link
        } catch (e: any) {
            error.value = e?.message || "Failed to load referral link"
        } finally {
            isLoadingLink.value = false
        }
    }

    async function shareLink() {
        if (!referralLink.value) await loadReferralLink()
        await navigator.clipboard.writeText(referralLink.value)
    }

    const hasMore = computed(() => friends.value.length < total.value)

    return {
        // state
        friends,
        total,
        stats,
        referralLink,
        isLoadingList,
        isLoadingStats,
        isLoadingLink,
        error,
        hasMore,

        // methods
        loadList,
        loadStats,
        loadReferralLink,
        shareLink,

        // paging controls
        page,
        pageSize,
    }
}