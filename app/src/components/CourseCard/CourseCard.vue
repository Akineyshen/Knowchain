<script setup lang="ts">
defineProps<{
  title: string
  points: number
  image: string
  isLocked?: boolean
}>()

const emit = defineEmits<{
  (e: 'start'): void
}>()
</script>

<template>
  <div class="course-card">
    <div class="course-image">
      <img :src="image" :alt="title">
      <div v-if="isLocked" class="course-locked">
        <span class="lock-icon">🔒</span>
      </div>
    </div>

    <div class="course-info">
      <h3 class="course-title">{{ title }}</h3>
      <div class="course-points">{{ points }} баллов</div>
    </div>

    <button
      class="course-start-btn"
      :disabled="isLocked"
      @click="emit('start')"
    >
      Старт
    </button>
  </div>
</template>

<style scoped lang="scss">
.course-card {
  width: 280px;
  background-color: #171c3c;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.course-image {
  height: 160px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.course-locked {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  .lock-icon {
    font-size: 36px;
  }
}

.course-info {
  padding: 16px;
}

.course-title {
  color: #ffffff;
  font-size: 18px;
  margin: 0 0 8px;
  font-weight: 600;
}

.course-points {
  color: #0c66f0;
  font-size: 14px;
  font-weight: 500;
}

.course-start-btn {
  width: calc(100% - 32px);
  margin: 0 16px 16px;
  padding: 12px;
  background-color: #0c66f0;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #0a58d3;
  }

  &:disabled {
    background-color: #434860;
    cursor: not-allowed;
    opacity: 0.7;
  }
}
</style>
