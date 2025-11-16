<script setup lang="ts">
  withDefaults(defineProps<{
    sticky?: boolean
    maxWidth?: number
  }>(), {
    sticky: true,
    maxWidth: 720,
  })
</script>

<template>
  <header class="topbar" :class="{ sticky }" role="banner">
    <div class="container" :style="{ maxWidth: maxWidth + 'px' }">
      <div class="zone left">
        <slot name="left" />
      </div>
      <div class="zone center">
        <slot name="center" />
      </div>
      <div class="zone right">
        <slot name="right" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" src="./Topbar.scss" scoped />