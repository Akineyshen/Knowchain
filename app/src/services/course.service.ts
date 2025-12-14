import { useCourseApi } from '@/api'
import { useUserCourseStore } from '@/stores/useCourseStore'
import type { Course, Lesson, UserCourse } from '@/types/api.d'

export class CourseService {

    private static getApi() {
        return useCourseApi()
    }

    private static getStore() {
        return useUserCourseStore()
    }

    static async fetchCourses(): Promise<Course[]> {
        const api = this.getApi()
        const resp = await api.getCourses()

        if (!resp) return []
        if (Array.isArray(resp)) return resp
        if (Array.isArray(resp.courses)) return resp.courses
        if (resp.data && Array.isArray(resp.data.courses)) return resp.data.courses
        if (resp.course && !Array.isArray(resp.course)) return [resp.course]
        return []
    }

    static async fetchLessons(courseId: string): Promise<Lesson[]> {
        const api = this.getApi()
        const resp = await api.getLessons(courseId)

        if (!resp) return []
        if (Array.isArray(resp)) return resp
        if (Array.isArray(resp.lessons)) return resp.lessons
        if (resp.data && Array.isArray(resp.data.lessons)) return resp.data.lessons
        if (Array.isArray((resp as any).lessonList)) return (resp as any).lessonList
        return []
    }

    static async startCourse(courseId: string): Promise<UserCourse | null> {
        const api = this.getApi()
        const store = this.getStore()

        const res = await api.startCourse(courseId)
        const uc = res?.userCourse ?? res?.data ?? res

        if (uc) {
            store.setFromApi(uc)
        }

        return uc ?? null
    }

    static async startLesson(courseId: string, lessonId: string): Promise<UserCourse | null> {
        const api = this.getApi()
        const store = this.getStore()

        const res = await api.startLesson(courseId, lessonId)
        const uc = res?.userCourse ?? res?.data ?? res

        if (uc) {
            store.setFromApi(uc)
            return uc
        }

        const info = await api.getCourse(courseId)
        const uc2 = info?.userCourse ?? info?.data?.userCourse ?? info

        if (uc2) {
            store.setFromApi(uc2)
            return uc2
        }

        return null
    }

    static async submitLesson(courseId: string, lessonId: string, payload: any) {
        const api = this.getApi()
        const store = this.getStore()

        const res = await api.submitLesson(courseId, lessonId, {
            answers: payload,
        })

        const uc = res?.userCourse ?? res?.data?.userCourse ?? null
        if (uc) {
            store.setFromApi(uc)
        }

        return res
    }

    static async updateCourseStatus(courseId: string, status: 'completed' | 'active') {
        const api = this.getApi()
        return api.updateCourseStatus(courseId, { status })
    }
}
