import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'home', component: () => import('../pages/Home/Home.vue') },
    { path: '/profile', name: 'profile', component: () => import('../App.vue') },
    { path: '/friends', name: 'friends', component: () => import('../pages/Friends/Friends.vue') },
    { path: '/settings', name: 'settings', component: () => import('../pages/Settings/Settings.vue') },
    { path: '/learn', name: 'learn', component: () => import('../pages/Learn/Learn.vue') },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
