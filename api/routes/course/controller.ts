import { Request, Response } from "express";
import { CourseService } from "../../services/course.service";
import { RESPONSE_MESSAGES } from "../../constants";

export const getCoursesList = async (req: Request, res: Response) => {
    const userId = (req as any).user.id; 
    
    try {
        const courses = await CourseService.getAvailableCoursesWithStatus(userId);
        return res.json({ courses });
    } catch (err: any) {
        console.error("Course list error:", err);
        return res.status(500).json({ 
            error: RESPONSE_MESSAGES.INTERNAL_ERROR, 
            details: "Error" 
        });
    }
};

export const getCourseDetails = async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const userId = (req as any).user.id; 
    
    try {
        const details = await CourseService.getCourseDetails(userId, courseId);
        
        if (!details) {
            return res.status(404).json({ error: "Course not found" });
        }
        
        return res.json({ course: details });
    } catch (err: any) {
        console.error("Course details error:", err);
        return res.status(500).json({ error: RESPONSE_MESSAGES.INTERNAL_ERROR });
    }
};

export const startCourse = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const courseId = req.params.courseId;

    try {
        const result = await CourseService.startCourse(userId, courseId);
        
        return res.json({ 
            message: "Course started",
            userCourse: result 
        });

    } catch (err: any) {
        console.error("Start course error:", err);

        if (err.message.includes("Insufficient tokens")) {
            return res.status(403).json({ error: err.message }); 
        }
        
        if (err.message.includes("already started") || err.message.includes("Course not found")) {
             return res.status(400).json({ error: err.message });
        }

        return res.status(500).json({ error: RESPONSE_MESSAGES.INTERNAL_ERROR });
    }
};

export const updateCourseStatus = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const courseId = req.params.courseId;
    const { status } = req.body; 

    try {
        if ((req as any).user.role !== 'admin' && status === 'completed') {
            return res.status(403).json({ error: "No" });
        }
        
        const updatedCourse = await CourseService.updateUserCourseStatus(userId, courseId, status);
        
        return res.json({ 
            message: `Course status for ${userId} updated: ${status}.`,
            userCourse: updatedCourse 
        });

    } catch (err: any) {
        console.error("Update status error:", err);
        if (err.message.includes("not found")) {
            return res.status(404).json({ error: err.message });
        }
        return res.status(500).json({ error: RESPONSE_MESSAGES.INTERNAL_ERROR });
    }
};


export const getLessonsInCourse = async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    
    try {
        const lessons = await CourseService.getLessonsInCourse(courseId);
        return res.json({ lessons });
    } catch (err: any) {
        console.error("Get lessons error:", err);
        return res.status(500).json({ error: RESPONSE_MESSAGES.INTERNAL_ERROR });
    }
};

export const getLessonDetails = async (req: Request, res: Response) => {
    const { courseId, lessonId } = req.params;

    try {
        const lesson = await CourseService.getLessonDetails(courseId, lessonId); 
        
        if (!lesson) {
            return res.status(404).json({ error: "Course not found." });
        }
        
        return res.json({ lesson });
    } catch (err: any) {
        console.error("Get lesson detail error:", err);
        return res.status(500).json({ error: RESPONSE_MESSAGES.INTERNAL_ERROR });
    }
};

export const startLesson = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { courseId, lessonId } = req.params;
    
    try {
        const result = await CourseService.startLesson(userId, courseId, lessonId);
        return res.json({ message: "Lesson is started, 500 go out.", userCourse: result });
    } catch (err: any) {
        console.error("Lesson start error:", err);
        
        if (err.message.includes("Insufficient points") || err.message.includes("not active")) {
             return res.status(400).json({ error: err.message });
        }
        
        return res.status(500).json({ error: RESPONSE_MESSAGES.INTERNAL_ERROR });
    }
};

export const submitLessonTest = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { courseId, lessonId } = req.params;
    const answers = req.body.answers; 

    try {
        const result = await CourseService.submitTestAndAwardPoints(userId, courseId, lessonId, answers);
        
        return res.json({ 
            message: `Added ${result.pointsAwarded}`, 
            userCourse: result.userCourse,
            pointsAwarded: result.pointsAwarded,
        });
        
    } catch (err: any) {
        console.error("Test submission failed:", err);
        
        if (err.message.includes("not current lesson") || err.message.includes("already submitted")) {
             return res.status(400).json({ error: err.message });
        }
        
        return res.status(500).json({ error: RESPONSE_MESSAGES.INTERNAL_ERROR });
    }
};