import { pool } from "../../config/db";
import { Course } from "../../types/course";
import { UserCourse } from "../../types/userCourse";
import * as lessonModel from '../lesson'

export async function getAvailableCourses(): Promise<Course[]> {
    const query = `
        SELECT id, title, description, cost, is_free, course_status, created_at
        FROM courses 
        WHERE course_status = 'available'
        ORDER BY created_at ASC;
    `;
    const { rows } = await pool.query(query);
    return rows;
}

export async function getUserCourseStatuses(userId: string): Promise<UserCourse[]> {
    const query = `
        SELECT id, course_id, status, current_lesson_id, earned_points, completed_lessons_count
        FROM user_courses 
        WHERE user_id = $1;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
}

export async function getCourseById(courseId: string): Promise<Course | null> {
    const query = `
        SELECT id, title, description, cost, is_free, course_status, created_at
        FROM courses 
        WHERE id = $1 AND course_status = 'available'
        LIMIT 1;
    `;
    const { rows } = await pool.query(query, [courseId]);
    return rows[0] || null;
}

export async function getUserCourseByIds(userId: string, courseId: string): Promise<UserCourse | null> {
    const query = `
        SELECT id, user_id, course_id, status, current_lesson_id, earned_points
        FROM user_courses 
        WHERE user_id = $1 AND course_id = $2
        LIMIT 1;
    `;
    const { rows } = await pool.query(query, [userId, courseId]);
    return rows[0] || null;
}

export async function createUserCourse(userId: string, courseId: string): Promise<UserCourse> {
    const query = `
        INSERT INTO user_courses (user_id, course_id, status)
        VALUES ($1, $2, 'active')
        RETURNING id, user_id, course_id, status, current_lesson_id, earned_points;
    `;
    const { rows } = await pool.query(query, [userId, courseId]);
    return rows[0];
}

export async function updateUserCourseOnLessonStart(
    userId: string,
    courseId: string,
    lessonId: string,
    cost: number
): Promise<UserCourse> {
    const query = `
        UPDATE user_courses
        SET 
            current_lesson_id = $3,
            earned_points = earned_points - $4,
            status = 'active'
        WHERE user_id = $1 AND course_id = $2 AND earned_points >= $4
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [userId, courseId, lessonId, cost]);
    if (rows.length === 0) {
        throw new Error("Could not start lesson: Insufficient points or record not found.");
    }
    return rows[0];
}

export async function updateUserCourseOnLessonComplete(
    userId: string,
    courseId: string,
    lessonId: string,
    pointsAwarded: number
): Promise<UserCourse> {
    const query = `
    UPDATE user_courses
    SET
      earned_points = earned_points + $4,
      completed_lessons_count = completed_lessons_count + 1,
      current_lesson_id = NULL,
      status = 'completed'
    WHERE user_id = $1
      AND course_id = $2
      AND current_lesson_id = $3
    RETURNING *;
  `

    const { rows } = await pool.query(query, [
        userId,
        courseId,
        lessonId,
        pointsAwarded,
    ])

    if (!rows.length) {
        throw new Error('User course not updated')
    }

    return rows[0]
}



export async function updateUserCourseStatus(
    userId: string,
    courseId: string,
    status: string
): Promise<UserCourse> {
    const query = `
        UPDATE user_courses
        SET status = $3
        WHERE user_id = $1 AND course_id = $2
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [userId, courseId, status]);
    if (rows.length === 0) {
        throw new Error("User course record not found for status update.");
    }
    return rows[0];
}