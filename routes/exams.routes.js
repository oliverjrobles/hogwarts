import express from "express";
import * as examsController from "../controllers/exams.controller.js";

const router = express.Router();

// hent alle eksamener //
router.get("/", examsController.getAllExams);

// hent en bestemt eksamen //
router.get("/:id", examsController.getExamById);

// opret en eksamen //
router.post("/", examsController.createExam);

// opdater en eksamen //
router.put("/:id", examsController.updateExam);

// slet en eksamen //
router.delete("/:id", examsController.deleteExam);

export default router;
