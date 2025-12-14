<script setup lang="ts">
import Topbar from '@/components/layout/Topbar/Topbar.vue'
import Button from '@/components/ui/Button/Button.vue'
import Icon from '@/components/ui/Icon/Icon.vue'
import BaseModal from '@/components/modals/BaseModal/BaseModal.vue'

import { useClickerGame } from './Clicker.ts'

const {
  score,
  isPlaying,
  isSending,
  isPopupOpen,
  popupTitle,
  popupDescription,
  popupMode,
  hasPlayedToday,
  formattedTime,
  startGame,
  handleCircleClick,
  openInfoSheet
} = useClickerGame()
</script>

<template>
  <div class="clicker-page">
    <Topbar>
      <template #left>
        <Button variant="circle" as="router-link" to="/games">
          <Icon name="Left" :filled="false" />
        </Button>
      </template>

      <template #center>
        <div>Kliker</div>
      </template>

      <template #right>
        <Button variant="circle" @click="openInfoSheet">
          <Icon name="Info" :filled="false" :size="24" />
        </Button>
      </template>
    </Topbar>

    <main class="clicker-content">
      <div class="clicker-score">
        {{ score }}
      </div>

      <div class="clicker-circle-wrapper">
        <button
            class="clicker-circle"
            :class="{ 'clicker-circle--disabled': !isPlaying }"
            @click="handleCircleClick"
        >
          <img
              class="clicker-circle__logo"
              src="../../../../public/logo/logo_dark.svg"
          />
        </button>
      </div>
    </main>

    <Button
        variant="primary"
        class="clicker-start-btn"
        :disabled="isPlaying || isSending || hasPlayedToday"
        @click="startGame"
    >
      <span v-if="!isPlaying">
        {{ hasPlayedToday ? 'Spróbuj ponownie jutro' : 'Rozpocznij' }}
      </span>
      <span v-else>
        {{ formattedTime }}
      </span>
    </Button>

    <BaseModal
        v-model="isPopupOpen"
        :title="popupTitle"
        :description="popupDescription"
        confirm-text="Zrozumiano"
        :closeOnConfirm="true"
        :closeOnOverlay="popupMode === 'info'"
    />
  </div>
</template>

<style lang="scss" scoped src="./Clicker.scss" />