<script setup lang="ts">
interface Props {
  avatar?: string | null
  name: string
  date: string
  balance: number
}

const props = defineProps<Props>()

function safeAvatar(src?: string | null): string {
  return src || '/avatars/default.png'
}

function formatBalance(balance: number): string {
  if (balance === 0) return '0 KNW'
  return `${balance.toLocaleString('en-US')} KNW`
}
</script>

<template>
  <div class="friend-item">
    <div class="friend-info">
      <div class="friend-avatar">
        <img :src="safeAvatar(props.avatar)" :alt="name" />
      </div>
      <div class="friend-details">
        <div class="friend-name">{{ name }}</div>
        <div class="friend-date">{{ date }}</div>
      </div>
    </div>
    <div class="friend-balance">
      {{ formatBalance(balance) }}
    </div>
  </div>
</template>

<style lang="scss" scoped src="./FriendsItem.scss"/>