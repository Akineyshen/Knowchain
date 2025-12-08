<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  images: string[]
  currentIndex: number
}>()

const emit = defineEmits<{
  (e: 'update:currentIndex', value: number): void
  (e: 'complete'): void
}>()

const hasImages = computed(() => props.images && props.images.length > 0)

const isLast = computed(
    () => props.currentIndex === props.images.length - 1,
)

function handleNext() {
  if (!hasImages.value) return
  if (props.currentIndex < props.images.length - 1) {
    emit('update:currentIndex', props.currentIndex + 1)
  } else {
    emit('complete')
  }
}

function handlePrev() {
  if (props.currentIndex > 0) {
    emit('update:currentIndex', props.currentIndex - 1)
  }
}

const currentImage = computed(() =>
    hasImages.value ? props.images[props.currentIndex] : '',
)
</script>

<template>
  <div class="lesson-stories">
    <div v-if="hasImages" class="lesson-stories__progress">
      <div
          v-for="(image, index) in images"
          :key="image + index"
          class="lesson-stories__progress-item"
      >
        <div
            class="lesson-stories__progress-bar"
            :class="{
            'lesson-stories__progress-bar--completed':
              index < currentIndex,
            'lesson-stories__progress-bar--active':
              index === currentIndex,
          }"
        />
      </div>
    </div>

    <div v-if="hasImages" class="lesson-stories__image-wrapper">
      <img
          :src="currentImage"
          alt="Lesson slide"
          class="lesson-stories__image"
      />
    </div>

    <div v-else class="lesson-stories__empty">
      No lesson content yet.
    </div>

    <div v-if="hasImages" class="lesson-stories__controls">
      <button
          type="button"
          class="lesson-stories__nav-btn"
          :disabled="currentIndex === 0"
          @click="handlePrev"
      >
        Previous
      </button>

      <button
          type="button"
          class="lesson-stories__nav-btn lesson-stories__nav-btn--primary"
          @click="handleNext"
      >
        {{ isLast ? 'Test' : 'Next' }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./LessonStories.scss" />
