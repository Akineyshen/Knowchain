<script setup lang="ts">
defineProps<{
  title: string
  description: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'start'): void
  (e: 'close'): void
}>()
</script>

<template>
  <div
      class="learn-modal-overlay"
      @click.self="!loading && emit('close')"
  >
    <div class="learn-modal">
      <div class="learn-modal__header">
        <div class="learn-modal__title">
          {{ title }}
        </div>
      </div>

      <div class="learn-modal__body">
        <div class="learn-modal__description">
          {{ description }}
        </div>
      </div>

      <div class="learn-modal__footer">
        <button
            class="learn-modal__start-btn"
            type="button"
            :disabled="loading"
            @click="emit('start')"
        >
          {{ loading ? 'Ładowanie...' : 'Rozpocznij' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./LearnModal.scss" />
