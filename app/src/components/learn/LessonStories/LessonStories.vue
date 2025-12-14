<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  images: string[]
  currentIndex: number
}>()

const emit = defineEmits<{
  (e: 'update:current-index', value: number): void
  (e: 'complete'): void
}>()

const hasImages = computed<boolean>(() =>
    Array.isArray(props.images) && props.images.length > 0
)

const safeIndex = computed(() => {
  if (!hasImages.value) return 0
  if (props.currentIndex < 0) return 0
  if (props.currentIndex >= props.images.length) {
    return props.images.length - 1
  }
  return props.currentIndex
})

const isLast = computed(() =>
    hasImages.value && safeIndex.value === props.images.length - 1
)

const currentImage = computed(() =>
    hasImages.value ? props.images[safeIndex.value] : ''
)

function handleNext() {
  if (!hasImages.value) return

  if (safeIndex.value < props.images.length - 1) {
    emit('update:current-index', safeIndex.value + 1)
  } else {
    emit('complete')
  }
}

function handlePrev() {
  if (!hasImages.value) return

  if (safeIndex.value > 0) {
    emit('update:current-index', safeIndex.value - 1)
  }
}
</script>

<template>
  <div class="lesson-stories" v-if="hasImages">
    <!-- КАРТИНКА -->
    <img
        :src="currentImage"
        class="lesson-stories__image"
        alt="Lesson slide"
    />

    <!-- прогресс -->
    <div class="lesson-stories__progress">
      <div
          v-for="(image, index) in images"
          :key="image + index"
          class="lesson-stories__progress-item"
      >
        <div
            class="lesson-stories__progress-bar"
            :class="{
            'lesson-stories__progress-bar--completed': index < safeIndex,
            'lesson-stories__progress-bar--active': index === safeIndex,
          }"
        />
      </div>
    </div>

    <!-- кнопки -->
    <div class="lesson-stories__controls">
      <button
          type="button"
          class="lesson-stories__nav-btn"
          :disabled="safeIndex === 0"
          @click="handlePrev"
      >
        Previous
      </button>

      <button
          type="button"
          class="lesson-stories__nav-btn lesson-stories__nav-btn--primary"
          @click="handleNext"
      >
        {{ isLast ? 'Test' : 'Dalej' }}
      </button>
    </div>
  </div>

  <div v-else class="lesson-stories__empty">
    No lesson content yet.
  </div>
</template>


<style scoped lang="scss" src="./LessonStories.scss" />
