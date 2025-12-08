<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/ui/Icon/Icon.vue'
import LearnModal from '@/components/modals/LearnModal/LearnModal.vue'

type LessonStatus = 'completed' | 'active' | 'locked'
type LessonKind = 'test' | 'theory'

const props = defineProps<{
  status: LessonStatus
  kind: LessonKind
  lessonId: number | string
}>()

const router = useRouter()
const isModalOpen = ref(false)

function handleNodeClick() {
  if (props.status === 'active') {
    isModalOpen.value = true
  }
}

function handleStartLesson() {
  isModalOpen.value = false
  router.push({ name: 'Lesson', params: { id: String(props.lessonId) } })
}
</script>

<template>
  <button
      class="lesson-node"
      :class="[`lesson-node--${status}`, `lesson-node--${kind}`]"
      type="button"
      :disabled="status === 'locked'"
      @click="handleNodeClick"
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

    <div v-if="status === 'active'" class="lesson-node__tooltip">Start</div>

    <span class="lesson-node__label">
      <slot />
    </span>
  </button>

  <Teleport to="body">
    <LearnModal
        v-if="isModalOpen"
        title="Bitcoin Basics"
        description="This lesson will teach you the fundamentals of Bitcoin, including how it works and why it's important."
        @close="isModalOpen = false"
        @start="handleStartLesson"
    />
  </Teleport>
</template>

<style scoped lang="scss" src="./LessonNode.scss" />
