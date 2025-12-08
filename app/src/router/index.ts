import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    // Main Pages
    { path: '/', name: 'home', component: () => import('@/views/Home/Home.vue') },
    { path: '/Learn', name: 'learn', component: () => import('@/views/Learn/Learn.vue') },
    { path: '/games', name: 'games', component: () => import('@/views/Games/Games.vue') },
    { path: '/Friends', name: 'friends', component: () => import('@/views/Friends/Friends.vue') },
    // Settings Pages
    { path: '/Settings', name: 'settings', component: () => import('@/views/Settings/Settings.vue') },
    // Lesson Pages
    { path: '/lesson/:id', name: 'Lesson', component: () => import('@/views/Lesson/Lesson.vue'), props: true },
    // Games Pages
    { path: '/games/clicker', name: 'clicker', component: () => import('@/views/Games/Clicker/Clicker.vue') },
    { path: '/games/pairs', name: 'pairs', component: () => import('@/views/Games/Pairs/Pairs.vue') },
    { path: '/games/roulette', name: 'roulette', component: () => import('@/views/Games/Roulette/Roulette.vue') },
    // Other Pages
    { path: '/Ratings', name: 'ratings', component: () => import('@/views/Ratings/Ratings.vue') },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
