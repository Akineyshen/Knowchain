<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import Icon from "@/components/ui/Icon/Icon.vue"

  const tabs = [
    { key: 'Home', label: 'Główna', name: 'Home', path: '/' },
    { key: 'Learn', label: 'Nauka', name: 'Book', path: '/learn' },
    { key: 'games', label: 'Gry', name: 'Minigames', path: '/games' },
    { key: 'withdraw', label: 'Wypłacić', name: 'Wallet', path: '/withdraw'},
  ] as const

  const router = useRouter()
  const route = useRoute()

  const activeKey = computed(() => {
    const currentPath = route.path
    const tab = tabs.find(t => t.path === currentPath)
    return tab?.key || 'Home'
  })

  function onTabClick(path: string) {
    router.push(path)
  }
</script>

<template>
  <div class="navbar-wrapper">
    <nav class="navbar" role="tablist" aria-label="Main Navigation">
      <button
          v-for="t in tabs"
          :key="t.key"
          class="tab"
          :class="{ active: t.key === activeKey  }"
          role="tab"
          :aria-selected="t.key === activeKey "
          :aria-label="t.label"
          :title="t.label"
          @click="onTabClick(t.path)"
      >
        <Icon :name="t.name" color="currentColor" />
        <span class="label">{{ t.label }}</span>
      </button>
    </nav>
  </div>
</template>

<style lang="scss" src="./Navbar.scss" scoped/>