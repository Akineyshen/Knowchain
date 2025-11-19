<script setup>
  import { ref, computed, onBeforeUnmount } from 'vue'
  import Topbar from '@components/Topbar/Topbar.vue'
  import Button from "@components/Button/Button.vue";
  import Icon from "@components/Icon/Icon.vue";

  const GAME_DURATION = 60 // секунд

  const score = ref(0)
  const isPlaying = ref(false)
  const remainingTime = ref(GAME_DURATION)
  const isSending = ref(false)

  let timerId = null

  const formattedTime = computed(() => {
    const minutes = Math.floor(remainingTime.value / 60)
    const seconds = remainingTime.value % 60
    const mm = String(minutes)
    const ss = String(seconds).padStart(2, '0')
    return `${mm}:${ss}`
  })

  function startGame() {
    // перезапуск игры
    score.value = 0
    remainingTime.value = GAME_DURATION
    isPlaying.value = true

    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }

    timerId = setInterval(() => {
      if (remainingTime.value <= 1) {
        remainingTime.value = 0
        endGame()
      } else {
        remainingTime.value -= 1
      }
    }, 1000)
  }

  function handleCircleClick() {
    if (!isPlaying.value) return
    score.value += 1
  }

  async function endGame() {
    isPlaying.value = false

    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }

    // отправка результата на бэк и обновление баланса
    try {
      isSending.value = true
      await sendScoreToBackend(score.value)
    } finally {
      isSending.value = false
      // по желанию можешь тут показывать тост / модалку
    }
  }

  async function sendScoreToBackend(finalScore) {
    // здесь просто заглушка — подставь свой URL и логику
    try {
      await fetch('/api/clicker/finish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: finalScore,
        }),
      })
      // дальше бэк прибавляет к балансу
    } catch (e) {
      console.error('Ошибка отправки результата кликера', e)
    }
  }

  onBeforeUnmount(() => {
    if (timerId) clearInterval(timerId)
  })
</script>

<template>
  <div class="clicker-page">
    <Topbar>
      <template #left>
        <Button variant="circle" as="router-link" to="/">
          <Icon name="Left" :filled="false" :size="20" />
        </Button>
      </template>

      <template #center>
        <div>Settings</div>
      </template>
    </Topbar>

    <main class="clicker-content">
      <!-- счёт -->
      <div class="clicker-score">
        {{ score }}
      </div>

      <!-- большая круглая кнопка -->
      <div class="clicker-circle-wrapper">
        <button
            class="clicker-circle"
            :class="{ 'clicker-circle--disabled': !isPlaying }"
            @click="handleCircleClick"
        >
          <!-- простая заглушка-логотип, можно заменить на svg / img -->
          <div class="clicker-circle__logo">
            <span class="clicker-circle__logo-left"></span>
            <span class="clicker-circle__logo-right"></span>
          </div>
        </button>
      </div>
    </main>

    <!-- нижняя кнопка Start / таймер -->
    <!-- если у тебя уже есть компонент кнопки, просто замени тег button -->
    <button
        class="clicker-start-btn"
        :disabled="isPlaying || isSending"
        @click="startGame"
    >
      <span v-if="!isPlaying">
        {{ remainingTime === GAME_DURATION ? 'Start' : 'Restart' }}
      </span>
      <span v-else>
        {{ formattedTime }}
      </span>
    </button>
  </div>
</template>

<style lang="scss" scoped src="./Clicker.scss" />
