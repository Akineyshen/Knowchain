import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserCourseStore = defineStore('userCourse', () => {
    const courseId = ref<string | null>(null)
    const currentLessonId = ref<string | null>(null)
    const earnedPoints = ref<number>(0)
    const completedLessonsCount = ref<number>(0)
    const status = ref<'available' | 'started' | 'active' | 'completed' | 'failed'>('available')

    function getField(payload: any, snake: string, camel?: string, fallback?: any) {
        if (payload == null) return fallback
        if (payload[snake] !== undefined) return payload[snake]
        if (camel && payload[camel] !== undefined) return payload[camel]
        return fallback
    }

    function setFromApi(payload: any) {
        if (!payload) return
        courseId.value = getField(payload, 'course_id', 'courseId', courseId.value)
        currentLessonId.value = getField(payload, 'current_lesson_id', 'currentLessonId', currentLessonId.value)
        earnedPoints.value = Number(getField(payload, 'earned_points', 'earnedPoints', earnedPoints.value ?? 0)) ?? earnedPoints.value
        completedLessonsCount.value = Number(getField(payload, 'completed_lessons_count', 'completedLessonsCount', completedLessonsCount.value ?? 0)) ?? completedLessonsCount.value
        status.value = String(getField(payload, 'status', 'status', status.value)) as any
    }

    function applyLocalCompletion(pointsAdded: number, newCurrentLessonId?: string | null) {
        if (typeof pointsAdded === 'number' && !Number.isNaN(pointsAdded)) {
            earnedPoints.value = (earnedPoints.value ?? 0) + pointsAdded
        }
        if (typeof newCurrentLessonId !== 'undefined') currentLessonId.value = newCurrentLessonId
        completedLessonsCount.value = (completedLessonsCount.value ?? 0) + 1
    }

    return {
        courseId,
        currentLessonId,
        earnedPoints,
        completedLessonsCount,
        status,
        setFromApi,
        applyLocalCompletion,
    }
})
