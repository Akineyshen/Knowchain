<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();

const emit = defineEmits<{
  (e: 'start'): void;
  (e: 'close'): void;
}>();
</script>

<template>
  <div class="learn-modal-overlay" @click.self="emit('close')">
    <div class="learn-modal">
      <div class="learn-modal__header">
        <div class="learn-modal__title">{{ title }}</div>
      </div>
      <div class="learn-modal__body">
        <div class="learn-modal__description">{{ description }}</div>
      </div>
      <div class="learn-modal__footer">
        <button
            class="learn-modal__start-btn"
            type="button"
            @click="emit('start')"
        >
          Start
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./LearnModal.scss" />
