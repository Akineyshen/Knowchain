<script setup lang="ts">
const emit = defineEmits<{
  (e: 'back'): void
}>()

defineProps<{
  totalQuestions: number
  correct: number
  incorrect: number
  points: number
}>()

</script>

<template>
  <div class="lesson-finish">
    <div class="lesson-finish__card">
      <h2 class="lesson-finish__title">Lekcja zakończona</h2>

      <dl class="lesson-finish__stats">
        <div class="lesson-finish__stat-row">
          <dt>Prawidłowe odpowiedzi</dt>
          <dd>{{ correct }} / {{ totalQuestions }}</dd>
        </div>

        <div class="lesson-finish__stat-row">
          <dt>Nieprawidłowe odpowiedzi</dt>
          <dd>{{ incorrect }}</dd>
        </div>

        <div class="lesson-finish__stat-row lesson-finish__stat-row--accent">
          <dt>Łączna liczba punktów</dt>
          <dd>{{ points }}</dd>
        </div>
      </dl>

      <div class="lesson-finish__actions">
        <button
            type="button"
            class="lesson-finish__btn"
            @click="emit('back')"
        >
          Powrót do ścieżki
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./LessonFinish.scss" />