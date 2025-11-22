<script setup lang="ts">
import Topbar from '@components/layout/Topbar/Topbar.vue'
import Button from '@components/ui/Button/Button.vue'
import Icon from '@components/ui/Icon/Icon.vue'
import UsersItem from '@components/users/UsersItem/UsersItem.vue'

import { useRatings } from './Ratings.ts'
import { formatBalanceShort } from './Ratings.ts'

const { top3, others, currentUser } = useRatings()

const safeAvatar = (src?: string | null) => src || '/avatars/default.png'
</script>

<template>
  <div class="ratings-page">
    <Topbar>
      <template #left>
        <Button variant="circle" as="router-link" to="/">
          <Icon name="Left" :filled="false" />
        </Button>
      </template>

      <template #center>
        <div>Ratings</div>
      </template>

      <template #right>
        <Button variant="circle">
          <Icon name="Info" :filled="false" :size="24" />
        </Button>
      </template>
    </Topbar>

    <main class="ratings-content">
      <!-- TOP 3 -->
      <section class="ratings-podium">
        <div
            v-for="user in top3"
            :key="user.id"
            class="ratings-podium-item"
            :class="`ratings-podium-item--${user.rank}`"
        >
          <div class="ratings-podium-avatar">
            <img :src="safeAvatar(user.avatar)" :alt="user.name" />
            <div
                class="ratings-podium-badge"
                :class="`ratings-podium-badge--${user.rank}`"
            >
              {{ user.rank }}
            </div>
          </div>

          <div class="ratings-podium-name">
            {{ user.name }}
          </div>
          <div class="ratings-podium-balance">
            {{ formatBalanceShort(user.balance) }}
            <span class="ratings-token-icon" />
          </div>
        </div>
      </section>

      <!-- LIST -->
      <section class="ratings-list">
        <div
            v-for="user in others"
            :key="user.id"
            class="ratings-row"
        >
          <div class="ratings-row__rank">
            {{ user.rank }}
          </div>

          <UsersItem
              class="ratings-row__item"
              :avatar="user.avatar"
              :name="user.name"
              :date="''"
              :balance="user.balance"
          />

          <div class="ratings-row__score">
            {{ formatBalanceShort(user.balance) }}
            <img src="/logo/logo_dark.svg" class="ratings-token-icon" />
          </div>
        </div>
      </section>

      <!-- FLOATING CURRENT USER -->
      <section
          v-if="currentUser"
          class="ratings-me"
      >
        <div class="ratings-me-card">
          <div class="ratings-me-left">
            <div class="ratings-me-avatar">
              <img
                  :src="safeAvatar(currentUser.avatar)"
                  :alt="currentUser.name"
              />
            </div>
            <div class="ratings-me-name">
              {{ currentUser.name }}
            </div>
          </div>

          <div class="ratings-me-rank">
            #{{ currentUser.rank }}
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped src="./Ratings.scss" />
