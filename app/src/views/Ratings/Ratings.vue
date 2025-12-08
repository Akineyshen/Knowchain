<script setup lang="ts">
import Topbar from '@/components/layout/Topbar/Topbar.vue'
import Button from '@/components/ui/Button/Button.vue'
import Icon from '@/components/ui/Icon/Icon.vue'
import UsersItem from '@/components/users/UsersItem/UsersItem.vue'

import { useRatings } from './Ratings.ts'
import { formatBalanceShort } from './Ratings.ts'
import BaseModal from "@/components/modals/BaseModal/BaseModal.vue";
import {ref} from "vue";

const { top3, others, currentUser } = useRatings()

const safeAvatar = (src?: string | null) => src || '/avatars/default.png'

const isPopupOpen = ref(false)

function openInfoSheet() {
  isPopupOpen.value = true
}
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
        <Button variant="circle" @click="openInfoSheet">
          <Icon name="Info" :filled="false" :size="24" />
        </Button>
      </template>
    </Topbar>

    <main class="ratings-content">
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
            > {{ user.rank }}
            </div>
          </div>

          <div class="ratings-podium-name">{{ user.name }}</div>
          <div class="ratings-podium-balance">
            {{ formatBalanceShort(user.balance) }}
            <img class="ratings-token-icon" src="/logo/logo_dark.svg" />
          </div>
        </div>
      </section>

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
        </div>
      </section>
      <section v-if="currentUser" class="ratings-me">
        <div class="ratings-me-card">
          <div class="ratings-me-left">
            <div class="ratings-me-avatar">
              <img :src="safeAvatar(currentUser.avatar)" :alt="currentUser.name"/>
            </div>
            <div class="ratings-me-name">{{ currentUser.name }}</div>
          </div>

          <div class="ratings-me-rank">#{{ currentUser.rank }}</div>
        </div>
      </section>
    </main>

    <BaseModal
        v-model="isPopupOpen"
        title="Rating"
        description="The ranking reflects your activity and achievements in the game. Complete tasks and go through lessons to earn points and make it into the top 100. Compete with other players and show who’s the best."
        confirm-text="OK"
        :closeOnConfirm="true"
    />
  </div>
</template>

<style lang="scss" scoped src="./Ratings.scss" />
