<script setup lang="ts">
import Navbar from "@components/Navbar/Navbar.vue"
import Button from "@components/Button/Button.vue"
import Icon from "@components/Icon/Icon.vue"
import FriendsItem from "@components/FriendsItem/FriendsItem.vue"
import { onMounted, computed, ref } from 'vue'
import { useFriends } from "../../composables/useFriends"

const {
  friends,
  stats,
  error,
  loadList,
  loadStats,
  shareLink,
} = useFriends()

const isCopied = ref(false)

const totalEarned = computed(() => stats.value?.totalEarned ?? 0)
const totalInvited = computed(() => stats.value?.totalInvited ?? 0)

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('pl-PL')
  } catch {
    return iso
  }
}

async function handleShareLink() {
  await shareLink()
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

onMounted(async () => {
  await Promise.all([
    loadStats(),
    loadList({ reset: true }),
  ])
})
</script>

<template>
  <main class="friends-page">
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-label">Earned</div>
        <div class="stat-value">{{ totalEarned.toLocaleString('en-US') }}K</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Invited</div>
        <div class="stat-value">{{ totalInvited.toLocaleString('en-US') }}</div>
      </div>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div class="friends-section">
      <h2 class="section-title">Your referred friends:</h2>

      <div class="friends-list">
        <FriendsItem
            v-for="friend in friends"
            :key="friend.id"
            :avatar="friend.avatarUrl"
            :name="friend.name"
            :date="formatDate(friend.joinedAt)"
            :balance="friend.balance"
        />
      </div>
    </div>
  </main>

  <div class="actions">
    <Button variant="primary" class="invite-button" @click="handleShareLink">
      <Icon name="AddFriends" :size="24" />
      {{ isCopied ? 'Link copied' : 'Invite friends' }}
    </Button>
  </div>
  <Navbar />
</template>

<style scoped lang="scss" src="./Friends.scss"/>