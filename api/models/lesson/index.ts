import { pool } from "../../config/db";
import { Lesson } from "../../types/lesson";

export async function getFirstLessonForCourse(courseId: string): Promise<Lesson | null> {
    const query = `
        SELECT id, course_id, title, lesson_cost, image_urls, test_questions, max_points, created_at
        FROM lessons
        WHERE course_id = $1
        ORDER BY created_at ASC
        LIMIT 1;
    `;
    const { rows } = await pool.query(query, [courseId]);
    return rows[0] || null;
}   

export async function getLessonById(lessonId: string): Promise<Lesson | null> {
    const query = `
        SELECT id, course_id, title, lesson_cost, image_urls, test_questions, max_points, created_at
        FROM lessons
        WHERE id = $1
        LIMIT 1;
    `;
    const { rows } = await pool.query(query, [lessonId]);
    return rows[0] || null;
}

export async function getAllLessonsForCourse(courseId: string): Promise<Lesson[]> {
    const query = `
        SELECT id, course_id, title, lesson_cost, image_urls, test_questions, max_points, created_at
        FROM lessons
        WHERE course_id = $1
        ORDER BY created_at ASC;
    `;
    const { rows } = await pool.query(query, [courseId]);
    return rows;
}