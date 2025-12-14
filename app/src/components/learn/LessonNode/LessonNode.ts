// src/composables/learn/lessonnode.ts
import { onMounted, computed } from 'vue'
import type { Ref } from 'vue'
import { useCourse } from '@/composables/course/useCourse'

type LessonStatus = 'completed' | 'active' | 'locked'

interface NodeBase { x: number; y: number; label?: string }
export interface NodeWithStatus extends NodeBase { status: LessonStatus; lessonId: string | number | null }

const baseNodes: NodeBase[] = [
    { x: 38,  y: 27 }, { x: 216, y: 27 }, { x: 126, y: 141 },
    { x: 83,  y: 255 }, { x: 83,  y: 369 }, { x: 128, y: 483 },
    { x: 267, y: 483 }, { x: 160, y: 597 }, { x: 150, y: 725 },
    { x: 160, y: 828 }, { x: 195, y: 941 }, { x: 106, y: 1054 },
]

export function useLessonNode() {
    const { lessons, loadCoursesAndLessons, getStatusByLessonIndex, getLessonIdByIndex, courseId } = useCourse()

    onMounted(async () => {
        try {
            await loadCoursesAndLessons()
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('[useLessonNode] loadCoursesAndLessons failed', e)
        }
    })

    const computedNodes = computed<NodeWithStatus[]>(() => {
        const ls = (lessons as unknown as Ref<any[]>).value
        if (!ls || ls.length === 0) {
            return baseNodes.map((n, index) => ({
                x: n.x,
                y: n.y,
                label: n.label,
                status: index === 0 ? 'active' : 'locked',
                lessonId: null,
            }))
        }

        return baseNodes.map((n, index) => {
            const status = getStatusByLessonIndex(index) as LessonStatus
            const lessonId = getLessonIdByIndex(index)
            return {
                x: n.x,
                y: n.y,
                label: n.label,
                status,
                lessonId,
            }
        })
    })

    return {
        computedNodes,
        courseId,
        lessons,
    }
}
