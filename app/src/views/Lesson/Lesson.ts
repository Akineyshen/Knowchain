// src/views/Lesson/Lesson.ts
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLesson } from '@/composables/lesson/useLesson'
import { CourseService } from '@/services/course.service'
import { useRouter } from 'vue-router'
import { useCourse } from '@/composables/course/useCourse'

type Step = 'stories' | 'test' | 'finish'

interface QuestionView {
    id: string
    text: string
    options: string[]
    correctAnswer: string
}

export function useLessonView() {
    const route = useRoute()

    const {
        lesson,
        loading,
        error,
        answers,
        loadLesson,
        submitTest,
    } = useLesson()

    const step = ref<Step>('test')
    const currentQuestionIndex = ref(0)
    const currentStoryIndex = ref(0)

    const awardedPoints = ref(0)
    const correctCount = ref(0)
    const incorrectCount = ref(0)

    const { lessons } = useCourse()

    const router = useRouter()
    const { loadCoursesAndLessons } = useCourse()

    const questions = computed<QuestionView[]>(() => {
        if (!lesson.value) return []
        return lesson.value.test_questions.map((q: any) => ({
            id: String(q.id),
            text: q.question,
            options: q.options,
            correctAnswer: q.correct_answer,
        }))
    })

    async function init() {
        const cid = String(route.params.courseId)
        const lid = String(route.params.id)

        if (!cid || !lid) {
            throw new Error('Invalid route params')
        }

        // 1️⃣ гарантируем активный курс
        try {
            await CourseService.startCourse(cid)
        } catch {}

        // 2️⃣ гарантируем current lesson
        try {
            await CourseService.startLesson(cid, lid)
        } catch {}

        // 3️⃣ грузим урок
        await loadLesson(cid, lid)

        if (lesson.value?.image_urls?.length) {
            step.value = 'stories'
        } else {
            step.value = 'test'
        }
    }

    onMounted(init)

    async function handleTestFinish() {
        const cid = String(route.params.courseId)
        const lid = String(route.params.id)

        const res = await submitTest(cid, lid)

        awardedPoints.value = Number(
            res?.pointsAwarded ??
            res?.points ??
            0
        )

        correctCount.value = questions.value.reduce((acc, q) => {
            const sel = answers[q.id]
            if (typeof sel !== 'number') return acc
            return q.options[sel] === q.correctAnswer ? acc + 1 : acc
        }, 0)

        incorrectCount.value = questions.value.length - correctCount.value

        // 🔑 ВОТ ЭТО ГЛАВНОЕ
        const currentIndex = lessons.value.findIndex(
            l => String(l.id) === String(lid)
        )

        const nextLesson = lessons.value[currentIndex + 1]

        if (nextLesson) {
            // активируем следующий урок
            await CourseService.startLesson(cid, nextLesson.id)
        }

        step.value = 'finish'
    }

    function handleUpdateAnswer(id: string, idx: number) {
        answers[id] = idx
    }

    function handleQuestionIndexUpdate(v: number) {
        currentQuestionIndex.value = v
    }

    function handleStoriesIndexUpdate(v: number) {
        currentStoryIndex.value = v
    }

    function handleStoriesComplete() {
        step.value = 'test'
    }

    async function handleBackToLearn() {
        await loadCoursesAndLessons() // ⬅️ ОБЯЗАТЕЛЬНО
        router.push('/Learn')
    }

    return {
        lesson,
        loading,
        error,
        answers,
        step,
        questions,
        currentQuestionIndex,
        currentStoryIndex,
        awardedPoints,
        correctCount,
        incorrectCount,
        handleBackToLearn,
        handleStoriesComplete,
        handleStoriesIndexUpdate,
        handleTestFinish,
        handleUpdateAnswer,
        handleQuestionIndexUpdate,
    }
}
