import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth";
import * as courseController from "./controller";

const router = express.Router();

router.get("/", ensureAuthenticated, courseController.getCoursesList); 
router.get("/:courseId", ensureAuthenticated, courseController.getCourseDetails); 
router.post("/:courseId/start", ensureAuthenticated, courseController.startCourse);
router.put("/:courseId/status", ensureAuthenticated, courseController.updateCourseStatus); 
router.get("/:courseId/lessons", ensureAuthenticated, courseController.getLessonsInCourse);
router.get("/:courseId/lessons/:lessonId", ensureAuthenticated, courseController.getLessonDetails);
router.post("/:courseId/lessons/:lessonId/start", ensureAuthenticated, courseController.startLesson);
router.post("/:courseId/lessons/:lessonId/submit", ensureAuthenticated, courseController.submitLessonTest);

export default router;