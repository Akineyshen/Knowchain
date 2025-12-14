<script setup lang="ts">
import Topbar from '@/components/layout/Topbar/Topbar.vue'
import Button from '@/components/ui/Button/Button.vue'
import Icon from '@/components/ui/Icon/Icon.vue'
import BaseModal from '@/components/modals/BaseModal/BaseModal.vue'

import { useRouletteGame } from './Roulette.ts'

const {
  segments,
  wheelRotation,
  isSpinning,
  isSending,
  hasPlayedToday,
  isPopupOpen,
  popupTitle,
  popupDescription,
  popupMode,
  startSpin,
  openInfoSheet
} = useRouletteGame()

const getLabelStyle = (angle: number) => ({
  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-400%) rotate(${-angle}deg)`
})
</script>

<template>
  <div class="roulette-page">
    <Topbar>
      <template #left>
        <Button variant="circle" as="router-link" to="/games">
          <Icon name="Left" :filled="false" />
        </Button>
      </template>

      <template #center>
        <div>Ruletka</div>
      </template>

      <template #right>
        <Button variant="circle" @click="openInfoSheet">
          <Icon name="Info" :filled="false" :size="24" />
        </Button>
      </template>
    </Topbar>

    <main class="roulette-content">
      <div class="roulette-wheel-wrapper">
        <div
            class="roulette-wheel"
            :style="{ transform: `rotate(${wheelRotation}deg)` }"
        >
          <div
              v-for="segment in segments"
              :key="segment.index"
              class="roulette-wheel__label"
              :style="getLabelStyle(segment.centerAngle)"
          >
            {{ segment.value }}
          </div>
        </div>

        <!-- стрелка сверху, смотрит вниз на сектор -->
        <div class="roulette-pointer">
          <div class="roulette-pointer__shape">
            <img
                class="roulette-pointer__logo"
                src="../../../../public/logo/logo_light.svg"
                alt=""
            />
          </div>
        </div>
      </div>
    </main>

    <Button
        variant="primary"
        class="roulette-start-btn"
        :disabled="isSpinning || isSending || hasPlayedToday"
        @click="startSpin"
    >
      <span v-if="!isSpinning">
        {{ hasPlayedToday ? 'Spróbuj ponownie jutro' : 'Pozpocznij' }}
      </span>
      <span v-else>
        Kręci się...
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

<style lang="scss" scoped src="./Roulette.scss" />
