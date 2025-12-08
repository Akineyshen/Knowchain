<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import LessonStories from '@/components/learn/LessonStories/LessonStories.vue'
import LessonTest from '@/components/learn/LessonTest/LessonTest.vue'
import LessonFinish from '@/components/learn/LessonFinish/LessonFinish.vue'

type Step = 'stories' | 'test' | 'finish'

interface Question {
  id: number
  text: string
  options: string[]
  correctOptionIndex: number
}

interface Lesson {
  id: string
  images: string[]
  questions: Question[]
}

const props = defineProps<{
  id: string
}>()

const router = useRouter()

// --- mock lessons ---
// потом заменишь на реальные данные с бэка
const LESSONS: Lesson[] = [
  {
    id: '10',
    images: [
      '/lesson/lesson-1.png',
      '/lesson/lesson-2.png',
      '/lesson/lesson-3.png',
      '/lesson/lesson-4.png',
      '/lesson/lesson-5.png',
    ],
    questions: [
      {
        id: 1,
        text: 'What is Bitcoin?',
        options: [
          'A digital currency',
          'A physical coin',
          'A social network',
          'An online game',
        ],
        correctOptionIndex: 0,
      },
      {
        id: 2,
        text: 'What is one key difference between Blockchain and Banks?',
        options: ['Banks use a decentralized ledger', 'Blockchain requires trusted intermediaries', 'Blockchain provides transparent, tamper-proof transactions', 'Banks have no central control'],
        correctOptionIndex: 2,
      },
      {
        id: 3,
        text: 'Where are Bitcoin transactions recorded?',
        options: [
          'In a local file on your PC',
          'In a central bank database',
          'In the blockchain',
          'Only in your wallet app',
        ],
        correctOptionIndex: 2,
      },
    ],
  },
]

const lesson = computed<Lesson | undefined>(() =>
    LESSONS.find((l) => l.id === props.id),
)

if (!lesson.value) {
  router.replace({ name: 'Learn' })
}

// --- step state ---
const step = ref<Step>('stories')

// --- stories state ---
const currentStoryIndex = ref(0)

// --- test state ---
const currentQuestionIndex = ref(0)
const answers = reactive<Record<number, number | null>>({})

// --- computed helpers ---
const storyImages = computed(() => lesson.value?.images ?? [])
const questions = computed(() => lesson.value?.questions ?? [])
const totalQuestions = computed(() => questions.value.length)

const correctCount = computed(() =>
    questions.value.reduce((acc, q) => {
      const selected = answers[q.id]
      if (selected === q.correctOptionIndex) return acc + 1
      return acc
    }, 0),
)

const incorrectCount = computed(
    () => totalQuestions.value - correctCount.value,
)

const totalPoints = computed(() => correctCount.value * 1000)

// --- handlers ---
function handleBackToLearn() {
  router.push({ name: 'Learn' })
}

// stories
function handleStoriesIndexUpdate(value: number) {
  currentStoryIndex.value = value
}

function handleStoriesComplete() {
  step.value = 'test'
}

// test
function handleQuestionIndexUpdate(value: number) {
  currentQuestionIndex.value = value
}

function handleUpdateAnswer(questionId: number, optionIndex: number) {
  answers[questionId] = optionIndex
}

function handleTestFinish() {
  step.value = 'finish'
}
</script>

<template>
  <main v-if="lesson" class="lesson-page">
      <section class="lesson-page__body">
      <LessonStories
          v-if="step === 'stories'"
          :images="storyImages"
          :current-index="currentStoryIndex"
          @update:current-index="handleStoriesIndexUpdate"
          @complete="handleStoriesComplete"
      />

      <LessonTest
          v-else-if="step === 'test'"
          :questions="questions"
          :current-index="currentQuestionIndex"
          :answers="answers"
          @update:current-index="handleQuestionIndexUpdate"
          @update-answer="handleUpdateAnswer"
          @finish="handleTestFinish"
      />

      <LessonFinish
          v-else
          :total-questions="totalQuestions"
          :correct="correctCount"
          :incorrect="incorrectCount"
          :points="totalPoints"
          @back="handleBackToLearn"
      />
    </section>
  </main>
</template>

<style scoped lang="scss" src="./Lesson.scss" />
