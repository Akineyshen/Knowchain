import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    // Main Pages
    { path: '/', name: 'home', component: () => import('@pages/home/HomePage/Home.vue') },
    { path: '/learn', name: 'learn', component: () => import('@pages/learn/LearnPage/Learn.vue') },
    { path: '/games', name: 'games', component: () => import('@pages/games/GamesPage/Games.vue') },
    { path: '/friends', name: 'friends', component: () => import('@pages/friends/FriendsPage/Friends.vue') },
    // Settings Pages
    { path: '/settings', name: 'settings', component: () => import('@pages/settings/SettingsPage/Settings.vue') },
    // Games Pages
    { path: '/games/clicker', name: 'Clicker', component: () => import('@pages/games/ClickerPage/Clicker.vue') },
    { path: '/games/pairs', name: 'Pairs', component: () => import('@pages/games/PairsPage/Pairs.vue') },
    { path: '/games/roulette', name: 'Roulette', component: () => import('@pages/games/RoulettePage/Roulette.vue') },
    // Other Pages
    { path: '/ratings', name: 'Ratings', component: () => import('@pages/ratings/RatingsPage/Ratings.vue') },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
