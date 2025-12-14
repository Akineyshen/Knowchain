<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/ui/Icon/Icon.vue'
import LearnModal from '@/components/modals/LearnModal/LearnModal.vue'
import { useCourseApi } from '@/api/course'

type NodeStatus = 'completed' | 'active' | 'locked'

const props = defineProps<{
  status: NodeStatus
  courseId: string
  title?: string
}>()

const router = useRouter()
const api = useCourseApi()

const isModalOpen = ref(false)
const isLoading = ref(false)
const courseTitle = ref(props.title ?? '')
const courseDescription = ref('')

async function handleNodeClick() {
  if (props.status !== 'active') return

  isModalOpen.value = true
  isLoading.value = true

  try {
    const res = await api.getCourse(props.courseId)
    courseTitle.value =
        res?.course?.title ??
        res?.title ??
        'Kurs'

    courseDescription.value =
        res?.course?.description ??
        res?.description ??
        'Opis niedostępny'
  } finally {
    isLoading.value = false
  }
}

async function handleStartCourse() {
  isModalOpen.value = false

  // 1️⃣ получаем уроки курса
  const res = await api.getLessons(props.courseId)

  const lessons =
      res?.lessons ??
      res?.data?.lessons ??
      res

  if (!Array.isArray(lessons) || !lessons.length) {
    console.error('No lessons in course')
    return
  }

  const firstLessonId = lessons[0].id

  // 2️⃣ ПЕРЕХОД С courseId + lessonId
  await router.push({
    name: 'Lesson',
    params: {
      courseId: props.courseId,
      id: firstLessonId,
    },
  })
}

</script>

<template>
  <button
      class="lesson-node"
      :class="`lesson-node--${status}`"
      type="button"
      :disabled="status === 'locked' || isLoading"
      @click="handleNodeClick"
  >
    <span class="lesson-node__ring">
      <span class="lesson-node__circle">
        <span class="lesson-node__icon">
          <Icon v-if="status === 'locked'" name="Lock" :size="32" color="#404040" />
          <Icon v-else-if="status === 'completed'" name="Cup" :size="32" color="#3374ED" />
          <Icon v-else name="Learn" :size="32" color="#fde047" />
        </span>
      </span>
    </span>

    <div v-if="status === 'active'" class="lesson-node__tooltip">
      Rozpocznij
    </div>

    <span class="lesson-node__label">
      {{ title }}
    </span>
  </button>

  <Teleport to="body">
    <LearnModal
        v-if="isModalOpen"
        :title="isLoading ? 'Ładowanie...' : courseTitle"
        :description="isLoading ? 'Ładowanie...' : courseDescription"
        @close="isModalOpen = false"
        @start="handleStartCourse"
    />
  </Teleport>
</template>

<style scoped lang="scss" src="./LessonNode.scss" />
