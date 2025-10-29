<script setup lang="ts">
import { ref } from 'vue'
import Icon from "../Icon/Icon.vue"
import './Navbar.scss'

const tabs = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'learn', label: 'Learn', icon: 'Book' },
  { key: 'games', label: 'Games', icon: 'Play' },
  { key: 'friends', label: 'Friends', icon: 'Users' },
] as const

type TabKey = 'home' | 'learn' | 'games' | 'friends'
const active = ref<TabKey>('home')

function onTabClick(key: TabKey) {
  active.value = key
}
</script>

<template>
  <nav class="navbar" role="tablist" aria-label="Main Navigation">
    <button
        v-for="t in tabs"
        :key="t.key"
        class="tab"
        :class="{ active: t.key === active }"
        role="tab"
        :aria-selected="t.key === active"
        @click="onTabClick(t.key)"
    >
      <!-- Home icon (house) -->
      <svg v-if="t.key === 'home'" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 21V15.5C9.5 15.0858 9.83579 14.75 10.25 14.75H13.75C14.1642 14.75 14.5 15.0858 14.5 15.5V21M11.3856 3.42229L4.13559 9.2973C3.74435 9.60611 3.5 10.0736 3.5 10.5708V19.25C3.5 20.0784 4.17157 20.75 5 20.75H19C19.8284 20.75 20.5 20.0784 20.5 19.25V10.5708C20.5 10.0736 20.2556 9.60611 19.8644 9.2973L12.6144 3.42229C12.2556 3.13924 11.7444 3.13924 11.3856 3.42229Z"/>
      </svg>

      <!-- Other icons from shared -->
      <Icon v-else-if="t.key === 'learn'" name="Book" :filled="false" width="24" height="24" />
      <Icon v-else-if="t.key === 'games'" name="Play" :filled="true" width="24" height="24" />
      <Icon v-else-if="t.key === 'friends'" name="Users" :filled="false" width="24" height="24" />

      <span class="label">{{ t.label }}</span>
    </button>
  </nav>
</template>