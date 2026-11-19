import express from "express";
import * as gradesController from "../controllers/grades.controller.js";

const router = express.Router();

// hent alle karakterer //
router.get("/", gradesController.getAllGrades);

// hent en bestemt karakter //
router.get("/:id", gradesController.getGradeById);

export default router;
