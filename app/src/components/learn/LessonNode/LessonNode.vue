<script setup lang="ts">
import Icon from '@components/ui/Icon/Icon.vue'

type LessonStatus = 'completed' | 'active' | 'locked'

defineProps<{
  status: LessonStatus
}>()
</script>

<template>
  <button
    class="lesson-node"
    :class="[`lesson-node--${status}`]"
    type="button"
    :disabled="status === 'locked'"
  >
    <span class="lesson-node__ring">
      <span class="lesson-node__circle">
        <span class="lesson-node__icon">
          <template v-if="status === 'locked'">
            <Icon name="Lock" :size="32" color="#404040" />
          </template>

          <template v-else-if="status === 'completed'">
            <Icon name="Cup" :size="32" color="#3374ED" />
          </template>

          <template v-else>
            <Icon name="Learn" :size="32" color="#fde047" />
          </template>
        </span>
      </span>
    </span>

    <span class="lesson-node__label">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss" src="./LessonNode.scss" />
