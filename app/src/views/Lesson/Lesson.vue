<script setup lang="ts">
import { useLessonView } from './Lesson'
import LessonStories from '@/components/learn/LessonStories/LessonStories.vue'
import LessonTest from '@/components/learn/LessonTest/LessonTest.vue'
import LessonFinish from '@/components/learn/LessonFinish/LessonFinish.vue'

const {
  lesson,
  loading,
  error,
  answers,
  step,
  questions,
  currentStoryIndex,
  currentQuestionIndex,
  awardedPoints,
  correctCount,
  incorrectCount,

  handleStoriesIndexUpdate,
  handleStoriesComplete,
  handleQuestionIndexUpdate,
  handleUpdateAnswer,
  handleTestFinish,
  handleBackToLearn,
} = useLessonView()

</script>

<template>
  <main v-if="!loading && lesson">

    <!-- STORIES -->
    <LessonStories
        v-if="step === 'stories'"
        :images="lesson.image_urls"
        :current-index="currentStoryIndex"
        @update:current-index="handleStoriesIndexUpdate"
        @complete="handleStoriesComplete"
    />

    <!-- TEST -->
    <LessonTest
        v-else-if="step === 'test'"
        :questions="questions"
        :current-index="currentQuestionIndex"
        :answers="answers"
        @update:current-index="handleQuestionIndexUpdate"
        @update-answer="handleUpdateAnswer"
        @finish="handleTestFinish"
    />

    <!-- FINISH -->
    <LessonFinish
        v-else-if="step === 'finish'"
        :total-questions="questions.length"
        :correct="correctCount"
        :incorrect="incorrectCount"
        :points="awardedPoints"
        @back="handleBackToLearn"
    />

  </main>

  <div v-else-if="loading">Loading…</div>
  <div v-else-if="error">{{ error }}</div>
</template>
