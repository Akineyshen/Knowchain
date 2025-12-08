<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import Icon from "@/components/ui/Icon/Icon.vue"

  const tabs = [
    { key: 'Home', label: 'Home', name: 'Home', path: '/' },
    { key: 'Learn', label: 'Learn', name: 'Book', path: '/Learn' },
    { key: 'games', label: 'Games', name: 'Minigames', path: '/games' },
    { key: 'friends', label: 'Friends', name: 'Friends', path: '/Friends'},
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