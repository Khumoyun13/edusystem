import express from "express";
import CourseController from "../controllers/CourseController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.use(AuthMiddleware);

router.get("/", CourseController.getCourses);
router.get("/:course_id", CourseController.getCourse);

export default {
  path: "/course",
  router: router,
};
