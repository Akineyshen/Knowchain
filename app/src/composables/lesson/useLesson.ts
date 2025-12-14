import { ref, reactive } from 'vue'
import { LessonService } from '@/services/lesson.service'
import { CourseService } from '@/services/course.service'
import type { Lesson } from '@/types/api.d'

export function useLesson() {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const lesson = ref<Lesson | null>(null)

    // answers: question_id -> answer_index
    const answers = reactive<Record<string, number>>({})

    async function loadLesson(courseId: string, lessonId: string) {
        loading.value = true
        error.value = null
        lesson.value = null

        try {
            const l = await LessonService.loadLesson(courseId, lessonId)
            if (!l) {
                throw new Error('Lesson not found')
            }

            lesson.value = l

            // reset answers
            Object.keys(answers).forEach(key => {
                delete answers[key]
            })
        } catch (e: any) {
            error.value = e?.message ?? String(e)
            lesson.value = null
            throw e
        } finally {
            loading.value = false
        }
    }

    async function submitTest(courseId: string, lessonId: string) {
        if (!lesson.value) {
            throw new Error('Lesson not found')
        }

        loading.value = true
        error.value = null

        try {
            // гарантируем current lesson
            await CourseService.startLesson(courseId, lessonId)

            const payload = Object.entries(answers).map(
                ([questionId, answerIndex]) => ({
                    question_id: questionId,
                    answer_index: answerIndex
                })
            )

            return await CourseService.submitLesson(courseId, lessonId, payload)
        } finally {
            loading.value = false
        }
    }



    return {
        lesson,
        loading,
        error,
        answers,
        loadLesson,
        submitTest,
    }
}
