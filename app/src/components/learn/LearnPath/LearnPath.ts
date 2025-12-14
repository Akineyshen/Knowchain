import { onMounted, computed, ref } from 'vue'
import { CourseService } from '@/services/course.service'
import type { CourseWithUserCourse } from '@/types/api.d'

export type NodeStatus = 'completed' | 'active' | 'locked'

interface NodeBase {
    x: number
    y: number
    label?: string
}

export interface NodeWithStatus extends NodeBase {
    status: NodeStatus
    courseId: string
}

const baseNodes: NodeBase[] = [
    { x: 38, y: 27 },
    { x: 216, y: 27 },
    { x: 126, y: 141 },
    { x: 83, y: 255 },
    { x: 83, y: 369 },
    { x: 128, y: 483 },
    { x: 267, y: 483 },
    { x: 160, y: 597 },
    { x: 150, y: 725 },
    { x: 160, y: 828 },
    { x: 195, y: 941 },
    { x: 106, y: 1054 },
]

export function useLearnPath() {
    const courses = ref<CourseWithUserCourse[]>([])

    onMounted(async () => {
        const res = await CourseService.fetchCourses()
        courses.value = Array.isArray(res) ? res : []
        console.log('[LearnPath] courses ->', courses.value)
    })

    const computedNodes = computed<NodeWithStatus[]>(() => {
        let hasActive = false

        return courses.value.map((course, index) => {
            const base = baseNodes[index]

            let status: NodeStatus = 'locked'

            if (course.userStatus === 'completed') {
                status = 'completed'
            } else if (
                course.userStatus === 'active' ||
                course.userStatus === 'started'
            ) {
                status = 'active'
                hasActive = true
            } else if (
                course.userStatus === 'available' &&
                !hasActive
            ) {
                status = 'active'
                hasActive = true
            }

            return {
                x: base?.x ?? 0,
                y: base?.y ?? 0,
                label: course.title,
                status,
                courseId: course.id,
            }
        })
    })


    return {
        computedNodes,
    }
}
