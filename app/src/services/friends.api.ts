import { http } from "./http"
import type {
    FriendsListResponse,
    FriendsStatsResponse,
    ReferralLinkResponse,
} from "@/types/friends";

export function fetchFriends(params: {
    page?: number;
    pageSize?: number;
} = {}) {
    const q = new URLSearchParams()
    if (params.page) q.set("page", String(params.page))
    if (params.pageSize) q.set("pageSize", String(params.pageSize))
    const suffix = q.toString() ? `?${q}` : ""
    return http<FriendsListResponse>(`/friends${suffix}`)
}

export function fetchFriendsStats() {
    return http<FriendsStatsResponse>(`/friends/stats`)
}

export function fetchReferralLink() {
    return http<ReferralLinkResponse>(`/friends/referral-link`)
}