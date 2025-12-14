import { ref, computed } from 'vue'
import { CourseService } from '@/services/course.service'
import { useUserCourseStore } from '@/stores/useCourseStore'
import type { Lesson, CourseWithUserCourse  } from '@/types/api.d'

export function useCourse() {
    const userCourseStore = useUserCourseStore()

    const courseId = ref<string | null>(null)
    const courses = ref<CourseWithUserCourse[]>([])
    const lessons = ref<Lesson[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function loadCoursesAndLessons() {
        loading.value = true
        error.value = null

        try {
            const rawCourses = await CourseService.fetchCourses() as CourseWithUserCourse[]
            courses.value = rawCourses

            const withUserCourse = rawCourses.find(
                (c: any) => c.userCourse
            )

            if (withUserCourse?.userCourse) {
                userCourseStore.setFromApi(withUserCourse.userCourse)
            }

            if (userCourseStore.courseId) {
                courseId.value = userCourseStore.courseId
            } else {
                const firstAvailable = courses.value[0] ?? null
                courseId.value = firstAvailable?.id ?? null
            }

            if (courseId.value) {
                const rawLessons = await CourseService.fetchLessons(courseId.value)
                lessons.value = Array.isArray(rawLessons) ? rawLessons : []
            } else {
                lessons.value = []
            }
        } catch (e: any) {
            error.value = e?.message ?? String(e)
            courses.value = []
            lessons.value = []
            courseId.value = null
        } finally {
            loading.value = false
        }
    }

    async function startCourse(cid: string) {
        if (!cid) throw new Error('no courseId')
        const result = await CourseService.startCourse(cid)
        if (result) {
            courseId.value = cid
        }
        return result
    }

    const activeIndex = computed<number>(() => {
        if (!Array.isArray(lessons.value) || lessons.value.length === 0) {
            return -1
        }

        if (userCourseStore.currentLessonId) {
            const idx = lessons.value.findIndex(
                l => String(l.id) === String(userCourseStore.currentLessonId)
            )
            return idx >= 0 ? idx : -1
        }

        if (
            typeof userCourseStore.completedLessonsCount === 'number' &&
            userCourseStore.completedLessonsCount >= 0
        ) {
            const next = userCourseStore.completedLessonsCount
            if (next < lessons.value.length) return next
            return lessons.value.length - 1
        }

        return -1
    })

    function getStatusByLessonIndex(
        index: number
    ): 'completed' | 'active' | 'locked' {

        const completed = userCourseStore.completedLessonsCount ?? 0
        const currentLessonId = userCourseStore.currentLessonId

        // 🟢 если есть активный урок
        if (currentLessonId) {
            const activeIndex = lessons.value.findIndex(
                l => String(l.id) === String(currentLessonId)
            )

            if (activeIndex === -1) return 'locked'
            if (index < activeIndex) return 'completed'
            if (index === activeIndex) return 'active'
            return 'locked'
        }

        // 🟦 если активного нет — ориентируемся на completed
        if (index < completed) return 'completed'
        if (index === completed) return 'active'
        return 'locked'
    }






    function getLessonIdByIndex(idx: number): string | null {
        return lessons.value[idx]?.id ?? null
    }

    return {
        // state
        courseId,
        courses,
        lessons,
        loading,
        error,
        activeIndex,

        // actions
        loadCoursesAndLessons,
        startCourse,
        getStatusByLessonIndex,
        getLessonIdByIndex,
    }
}
