import { UserCourse } from "../types/userCourse";
import { Course } from "../types/course";
import { Lesson } from "../types/lesson";
import { UserService } from "./user.service";

import * as courseModel from "../models/course";
import * as lessonModel from "../models/lesson";
import * as userModel from "../models/user";
import User from "@/routes/user";

export class CourseService {

    static async getAvailableCoursesWithStatus(userId: string): Promise<Array<Course & { userStatus: 'available' | 'started' | 'active' | 'completed' | 'failed' }>> {
        const [availableCourses, userStatuses] = await Promise.all([
            courseModel.getAvailableCourses(),
            courseModel.getUserCourseStatuses(userId),
        ]);

        const statusMap = new Map(userStatuses.map(uc => [uc.course_id, uc]));

        return availableCourses.map(course => {
            const userCourse = statusMap.get(course.id);
            let userStatus: 'available' | 'started' | 'active' | 'completed' | 'failed' = 'available';

            if (userCourse) {
                userStatus = userCourse.status;
            }

            return {
                ...course,
                userStatus: userStatus ?? 'available',
                userCourse: userCourse ?? null
            };
        });
    }

    static async startCourse(userId: string, courseId: string): Promise<UserCourse> {
        
        const [user, course, userCourseCheck] = await Promise.all([
            userModel.getUserById(userId),
            courseModel.getCourseById(courseId),
            courseModel.getUserCourseByIds(userId, courseId),
        ]);

        if (!user) {
            throw new Error("User not found.");
        }

        if (!course) {
            throw new Error("Course not found or closed.");
        }

        if (userCourseCheck) {
            throw new Error("Course already started.");
        }

        const cost = course.cost;

        if (!course.is_free && user.tokens < cost) {
            throw new Error(`Insufficient tokens: ${cost} required, ${user.tokens} available.`);
        }

        if (!course.is_free) {
            await userModel.spendTokens(userId, cost); 
        }

        const newUserCourse = await courseModel.createUserCourse(userId, courseId);

        return newUserCourse;
    }
    
    static async startLesson(userId: string, courseId: string, lessonId: string): Promise<UserCourse> {
        
        const [userCourse, lesson] = await Promise.all([
            courseModel.getUserCourseByIds(userId, courseId),
            lessonModel.getLessonById(lessonId)
        ]);
        
        if (!userCourse || userCourse.status !== 'active') {
            throw new Error("Course not active or user not enrolled.");
        }
        
        if (!lesson) {
            throw new Error("Lesson not found.");
        }

        if (userCourse.current_lesson_id === lessonId) {
            return userCourse;
        }

        const lessonCost = lesson.lesson_cost;

        if (userCourse.earned_points < lessonCost) {
            throw new Error(`Insufficient points to start lesson. ${lessonCost} required.`);
        }

        const updatedUserCourse = await courseModel.updateUserCourseOnLessonStart(
            userId, 
            courseId, 
            lessonId, 
            lessonCost
        );

        return updatedUserCourse;
    }

    static async submitTestAndAwardPoints(
        userId: string,
        courseId: string,
        lessonId: string,
        answers: { question_id: string; answer_index: number }[]
    ) {
        const [userCourse, lesson] = await Promise.all([
            courseModel.getUserCourseByIds(userId, courseId),
            lessonModel.getLessonById(lessonId),
        ])

        if (!userCourse || userCourse.current_lesson_id !== lessonId) {
            throw new Error('This is not the current lesson')
        }

        if (!lesson) {
            throw new Error('Lesson not found')
        }

        let correctAnswers = 0

        for (const a of answers) {
            const q = lesson.test_questions.find(
                (tq: any) => String(tq.id) === String(a.question_id)
            )
            if (!q) continue

            const correctIndex = q.options.findIndex(
                opt => opt === q.correct_answer
            )

            if (a.answer_index === correctIndex) {
                correctAnswers++
            }
        }

        const pointsAwarded = correctAnswers * 1000

        const updatedUserCourse =
            await courseModel.updateUserCourseOnLessonComplete(
                userId,
                courseId,
                lessonId,
                pointsAwarded
            )

        if (pointsAwarded > 0) {
            await UserService.addTokens(userId, pointsAwarded)
        }

        return {
            pointsAwarded,
            userCourse: updatedUserCourse,
        }
    }


    static async getCourseDetails(userId: string, courseId: string): Promise<Course | null> {
        return courseModel.getCourseById(courseId);
    }
    
    static async getLessonsInCourse(courseId: string): Promise<Lesson[]> {
        return lessonModel.getAllLessonsForCourse(courseId); 
    }
    
    static async getLessonDetails(courseId: string, lessonId: string): Promise<Lesson | null> {
        const lesson = await lessonModel.getLessonById(lessonId);
        if (lesson && lesson.course_id === courseId) {
            return lesson;
        }
        return null;
    }
    
    static async updateUserCourseStatus(userId: string, courseId: string, status: string): Promise<UserCourse> {
        // ASSUMES courseModel.updateUserCourseStatus IS IMPLEMENTED
        const updated = await courseModel.updateUserCourseStatus(userId, courseId, status);
        if (!updated) {
            throw new Error("User course record not found.");
        }
        return updated;
    }
}