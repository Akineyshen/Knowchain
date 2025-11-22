<script setup lang="ts">
import Topbar from '@components/layout/Topbar/Topbar.vue'
import Button from '@components/ui/Button/Button.vue'
import Icon from '@components/ui/Icon/Icon.vue'
import BaseModal from '@components/modals/BaseModal/BaseModal.vue'

import { usePairsGame } from './Pairs.ts'

const {
  cards,
  moves,
  timeFormatted,
  isPlaying,
  isSending,
  hasPlayedToday,
  isPopupOpen,
  popupTitle,
  popupDescription,
  popupMode,
  startGame,
  handleCardClick,
  openInfoSheet
} = usePairsGame()
</script>

<template>
  <div class="pairs-page">
    <Topbar>
      <template #left>
        <Button variant="circle" as="router-link" to="/games">
          <Icon name="Left" :filled="false" />
        </Button>
      </template>

      <template #center>
        <div>Pairs</div>
      </template>

      <template #right>
        <Button variant="circle" @click="openInfoSheet">
          <Icon name="Info" :filled="false" :size="24" />
        </Button>
      </template>
    </Topbar>

    <main class="pairs-content">
      <div class="pairs-stats">
        <span class="pairs-stats__moves">
          Collected: {{ moves }}
        </span>
        <span class="pairs-stats__time">
          {{ timeFormatted }}
        </span>
      </div>

      <div class="pairs-grid">
        <button
            v-for="(card, index) in cards"
            :key="card.id"
            class="pairs-card"
            :class="{
            'pairs-card--revealed': card.isRevealed || card.isMatched,
            'pairs-card--matched': card.isMatched
          }"
            @click="handleCardClick(index)"
        >
          <Icon
              v-if="card.isRevealed || card.isMatched"
              class="pairs-card__icon"
              :name="card.value"
              :size="44"
          />
        </button>
      </div>
    </main>

    <Button
        variant="primary"
        class="pairs-play-btn"
        :disabled="isPlaying || isSending || hasPlayedToday"
        @click="startGame"
    >
      <span v-if="!isPlaying">
        {{ hasPlayedToday ? 'Try again tomorrow' : 'Play' }}
      </span>
      <span v-else>
        {{ timeFormatted }}
      </span>
    </Button>

    <BaseModal
        v-model="isPopupOpen"
        :title="popupTitle"
        :description="popupDescription"
        confirm-text="Got it"
        :closeOnConfirm="true"
        :closeOnOverlay="popupMode === 'info'"
    />
  </div>
</template>

<style lang="scss" scoped src="./Pairs.scss" />
