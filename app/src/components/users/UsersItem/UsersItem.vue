<script setup lang="ts">
interface Props {
  avatar?: string | null
  name: string
  date: string
  balance: number
}

const props = defineProps<Props>()

function safeAvatar(src?: string | null): string {
  return src || '/logo/icon-192.png'
}

function formatPoints(value: number): string {
  if (value === 0) return '0'
  if (value < 1_000) return value.toString()

  if (value < 1_000_000) {
    const k = value / 1_000
    return (Number.isInteger(k) ? k.toString() : k.toFixed(1)) + 'K'
  }

  const m = value / 1_000_000
  return (Number.isInteger(m) ? m.toString() : m.toFixed(1)) + 'M'
}
</script>

<template>
  <div class="user-item">
    <div class="user-info">
      <div class="user-avatar">
        <img :src="safeAvatar(props.avatar)" :alt="name" />
      </div>

      <div class="user-details">
        <div class="user-name">{{ name }}</div>
        <div class="user-date">{{ date }}</div>
      </div>
    </div>

    <div class="user-balance">
      <span>{{ formatPoints(balance) }}</span>
      <img
          class="user-points-logo"
          src="/logo/logo_dark.svg"
          alt="Points"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped src="./UsersItem.scss" />
