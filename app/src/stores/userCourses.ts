import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserCourseStore = defineStore('userCourse', () => {
    const courseId = ref<string | null>(null)
    const currentLessonId = ref<string | null>(null)
    const earnedPoints = ref<number>(0)
    const completedLessonsCount = ref<number>(0)
    const status = ref<'available' | 'active' | 'completed'>('available')

    function setFromApi(payload: any) {
        // ожидаем поля в payload.userCourse подобные API
        if (!payload) return
        courseId.value = payload.course_id ?? courseId.value
        currentLessonId.value = payload.current_lesson_id ?? currentLessonId.value
        earnedPoints.value = payload.earned_points ?? earnedPoints.value
        completedLessonsCount.value = payload.completed_lessons_count ?? completedLessonsCount.value
        status.value = payload.status ?? status.value
    }

    return {
        courseId,
        currentLessonId,
        earnedPoints,
        completedLessonsCount,
        status,
        setFromApi,
    }
})
