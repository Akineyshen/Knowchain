<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import LoadingOverlay from "@/components/layout/LoadingOverlay/LoadingOverlay.vue"
import InstallGate from "@/components/pwa/InstallGate/InstallGate.vue"
import { useUserStore } from '@/stores/useUserStore'
import { useHttp } from '@/api/http'
import { useTonConnect } from "@/composables";

const userStore = useUserStore()
const { get } = useHttp()
useTonConnect()

function onUserUpdatedEvent(e: Event) {
  const ev = e as CustomEvent
  if (ev?.detail) {
    userStore.setUser(ev.detail)
  }
}

onMounted(async () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('user:updated', onUserUpdatedEvent)
  }

  try {
    const res = await get<{ user: any }>('/user/me')
    const profile = (res?.user ?? res) as any
    if (profile) {
      userStore.setUser(profile)
    }
  } catch (err) {
    console.warn('App: /user/me failed', err)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('user:updated', onUserUpdatedEvent)
  }
})
</script>

<template>
  <InstallGate>
    <LoadingOverlay />
    <router-view />
  </InstallGate>
</template>
