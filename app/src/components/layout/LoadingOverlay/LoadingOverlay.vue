<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppLoading } from '@/composables/ui/useAppLoading.ts'

const { isAppLoading } = useAppLoading()

const show = computed(() => isAppLoading.value)

onMounted(() => {
  console.log('[LoadingOverlay] mounted, isAppLoading =', isAppLoading.value)
})
</script>

<template>
  <div v-if="show" class="loading-overlay">
    <div class="loading-card">
      <img
          src="/logo/logo_dark.svg"
          alt="Knowchain logo"
          class="loading-logo"
      />

      <h1 class="loading-title">KNOWCHAIN</h1>

      <div class="loading-bar">
        <div class="loading-bar-fill" />
      </div>
    </div>
  </div>
</template>

<style scoped src="./LoadingOverlay.scss" />
