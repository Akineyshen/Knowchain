<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Question {
  id: number
  text: string
  options: string[]
  correctOptionIndex: number
}

const props = defineProps<{
  questions: Question[]
  currentIndex: number
  answers: Record<number, number | null>
}>()

const emit = defineEmits<{
  (e: 'update:currentIndex', value: number): void
  (e: 'update-answer', questionId: number, optionIndex: number): void
  (e: 'finish'): void
}>()

const totalQuestions = computed(() => props.questions.length)

const currentQuestion = computed<Question | null>(() => {
  if (!props.questions.length) return null
  return props.questions[props.currentIndex] ?? null
})

const isLastQuestion = computed(
    () => props.currentIndex === totalQuestions.value - 1,
)

const selectedIndex = computed(() => {
  if (!currentQuestion.value) return null
  const selected = props.answers[currentQuestion.value.id]
  return selected === undefined ? null : selected
})

const isOptionSelected = computed(() => selectedIndex.value !== null)

// флаг: ответ уже проверен для текущего вопроса
const isChecked = ref(false)

// сбрасываем checked при смене вопроса
watch(
    () => props.currentIndex,
    () => {
      isChecked.value = false
    },
)

const buttonLabel = computed(() => {
  if (!isChecked.value) return 'Check answer'
  return isLastQuestion.value ? 'Finish lesson' : 'Next question'
})

function selectOption(optionIndex: number) {
  if (!currentQuestion.value) return
  emit('update-answer', currentQuestion.value.id, optionIndex)
}

function goNext() {
  if (!currentQuestion.value) return

  if (!isChecked.value) {
    if (!isOptionSelected.value) return
    isChecked.value = true
    return
  }

  if (!isLastQuestion.value) {
    emit('update:currentIndex', props.currentIndex + 1)
  } else {
    emit('finish')
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
        <li
            v-for="(option, index) in currentQuestion.options"
            :key="option + index"
        >
          <button
              type="button"
              class="lesson-test__option-btn"
              :class="{
              // до проверки — просто выбранный вариант
              'lesson-test__option-btn--selected':
                !isChecked &&
                selectedIndex === index,

              // после проверки: правильный ответ зелёный
              'lesson-test__option-btn--correct':
                isChecked &&
                index === currentQuestion.correctOptionIndex,

              // после проверки: ошибочный выбор красный
              'lesson-test__option-btn--wrong':
                isChecked &&
                selectedIndex === index &&
                index !== currentQuestion.correctOptionIndex,
            }"
              @click="selectOption(index)"
          >
            {{ option }}
          </button>
        </li>
      </ul>

      <button
          type="button"
          class="lesson-test__next-btn"
          :disabled="!isOptionSelected && !isChecked"
          @click="goNext"
      >
        {{ buttonLabel }}
      </button>
    </div>

    <div v-else class="lesson-test__empty">
      No questions for this lesson yet.
    </div>
  </div>
</template>

<style scoped lang="scss" src="./LessonTest.scss" />
