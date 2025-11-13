export interface FriendDTO {
    id: number
    avatarUrl: string | undefined
    name: string
    joinedAt: string
    balance: number
}

export interface FriendsListResponse {
    items: FriendDTO[]
    total: number
}

export interface FriendsStatsResponse {
    totalEarned: number
    totalInvited: number
}

export interface ReferralLinkResponse {
    link: string
}