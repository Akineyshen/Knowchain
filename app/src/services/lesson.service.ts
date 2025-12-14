import { useCourseApi } from '@/api/course'
import type { Lesson, TestQuestion } from '@/types/api.d'

const api = useCourseApi()

export class LessonService {
    static async loadLesson(
        courseId: string,
        lessonId: string
    ): Promise<Lesson | null> {
        const res = await api.getLesson(courseId, lessonId)
        const payload = res?.lesson ?? res
        if (!payload) return null

        const image_urls = Array.isArray(payload.image_urls)
            ? payload.image_urls.map(String)
            : []

        const rawQuestions = payload.test_questions ?? []

        if (!Array.isArray(rawQuestions)) {
            throw new Error('Invalid test_question from backend')
        }

        const test_questions: TestQuestion[] = rawQuestions.map((q: any) => {
            if (!q.id) {
                throw new Error('Question id missing in backend payload')
            }

            return {
                question: String(q.question),
                options: Array.isArray(q.options) ? q.options.map(String) : [],
                correct_answer: String(q.correct_answer),
                ...(q.id ? { id: String(q.id) } : {})
            } as TestQuestion
        })

        return {
            id: String(payload.id ?? lessonId),
            course_id: String(payload.course_id),
            title: String(payload.title),
            lesson_cost: Number(payload.lesson_cost ?? 0),
            image_urls,
            test_questions,
            max_points: Number(payload.max_points ?? 0),
            created_at: payload.created_at,
        }
    }
}