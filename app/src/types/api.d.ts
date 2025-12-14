export interface User {
    id: string
    name: string | null
    raw_address: string
    ton_public_key: string | null
    tokens: number
    role: string
    created_at: string
}

export interface UserCourse {
    id: string
    user_id: string
    course_id: string
    current_lesson_id: string | null
    status: 'started' | 'active' | 'completed' | 'failed'
    earned_points: number
    completed_lessons_count: number
    created_at: string
}

export interface CourseWithUserCourse extends Course {
    userStatus?: 'available' | 'started' | 'active' | 'completed' | 'failed'
    userCourse?: {
        id: string
        course_id: string
        status: 'available' | 'started' | 'active' | 'completed' | 'failed'
        current_lesson_id: string | null
        earned_points: number
        completed_lessons_count: number
        created_at: string
    } | null
}


export interface Course {
    id: string
    title: string
    description: string | null
    cost: number
    is_free: boolean
    course_status: 'available' | 'draft' | 'closed'
    created_at: string
}

export interface TestQuestion {
    question: string
    options: string[]
    correct_answer: string
}

export interface Lesson {
    id: string
    course_id: string
    title: string
    lesson_cost: number
    image_urls: string[]
    test_questions: TestQuestion[]
    max_points: number
    created_at: string
}