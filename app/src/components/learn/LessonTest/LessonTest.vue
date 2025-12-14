<script setup lang="ts">
import { computed } from 'vue'

interface QuestionView {
  id: string
  text: string
  options: string[]
}

const props = defineProps<{
  questions: QuestionView[]
  currentIndex: number
  answers: Record<string, number>
}>()

const emit = defineEmits<{
  (e: 'update:current-index', value: number): void
  (e: 'update-answer', questionId: string, optionIndex: number): void
  (e: 'finish'): void
}>()

const currentQuestion = computed(() =>
    props.questions[props.currentIndex] ?? null
)

const isLast = computed(
    () => props.currentIndex === props.questions.length - 1
)

const selectedIndex = computed<number | null>(() => {
  if (!currentQuestion.value) return null
  const v = props.answers[currentQuestion.value.id]
  return typeof v === 'number' ? v : null
})

function selectOption(index: number) {
  if (!currentQuestion.value) return
  emit('update-answer', currentQuestion.value.id, index)
}

function goNext() {
  if (selectedIndex.value === null) return

  if (isLast.value) {
    emit('finish')
  } else {
    emit('update:current-index', props.currentIndex + 1)
  }
}
</script>

<template>
  <div class="lesson-test">
    <div v-if="currentQuestion" class="lesson-test__card">
      <h2 class="lesson-test__question">
        {{ currentQuestion.text }}
      </h2>

      <ul class="lesson-test__options">
        <li v-for="(opt, i) in currentQuestion.options" :key="i">
          <button
              type="button"
              class="lesson-test__option-btn"
              :class="{ 'lesson-test__option-btn--selected': selectedIndex === i }"
              @click="selectOption(i)"
          >
            {{ opt }}
          </button>
        </li>
      </ul>

      <button
          type="button"
          class="lesson-test__next-btn"
          :disabled="selectedIndex === null"
          @click="goNext"
      >
        {{ isLast ? 'Zakończ lekcję' : 'Dalej' }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./LessonTest.scss" />