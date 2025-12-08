<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const { totalQuestions, correct, incorrect, points } = defineProps<{
  totalQuestions: number
  correct: number
  incorrect: number
  points: number
}>()

function goBack() {
  router.push('/Learn')
}
</script>

<template>
  <div class="lesson-finish">
    <div class="lesson-finish__card">
      <h2 class="lesson-finish__title">Lesson completed</h2>

      <dl class="lesson-finish__stats">
        <div class="lesson-finish__stat-row">
          <dt>Correct answers</dt>
          <dd>{{ correct }} / {{ totalQuestions }}</dd>
        </div>

        <div class="lesson-finish__stat-row">
          <dt>Incorrect answers</dt>
          <dd>{{ incorrect }}</dd>
        </div>

        <div class="lesson-finish__stat-row lesson-finish__stat-row--accent">
          <dt>Total points</dt>
          <dd>{{ points }}</dd>
        </div>
      </dl>

      <div class="lesson-finish__actions">
        <button
            type="button"
            class="lesson-finish__btn"
            @click="goBack"
        >
          Back to path
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./LessonFinish.scss" />
