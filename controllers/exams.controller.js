import * as examsRepository from "../repositories/exams.repository.js";
import HTTPError from "../errorHandling/HTTPError.js";

// valider et ID //
function validateId(id) {
  if (!/^[1-9]\d*$/.test(String(id))) {
    throw new HTTPError(400, "Invalid ID");
  }
}

// valider eksamensdata //
function validateExamData(data) {
  const { course_id, student_id, grade_id } = data;

  if (!Number.isSafeInteger(course_id) || course_id <= 0 || !Number.isSafeInteger(student_id) || student_id <= 0 || !Number.isSafeInteger(grade_id) || grade_id <= 0) {
    throw new HTTPError(400, "course_id, student_id and grade_id must be positive integers");
  }

  return { course_id, student_id, grade_id };
}

// hent alle eksamener //
export async function getAllExams(req, res) {
  const exams = await examsRepository.getAllExams();

  return res.status(200).json(exams);
}

// hent en bestemt eksamen //
export async function getExamById(req, res) {
  const { id } = req.params;
  validateId(id);

  const exam = await examsRepository.getExamById(id);

  if (!exam) {
    throw new HTTPError(404, "Exam not found");
  }

  return res.status(200).json(exam);
}

// opret en eksamen //
export async function createExam(req, res) {
  const { course_id, student_id, grade_id } = validateExamData(req.body);

  const exam = await examsRepository.createExam(course_id, student_id, grade_id);

  return res.status(201).json(exam);
}

// opdater en eksamen //
export async function updateExam(req, res) {
  const { id } = req.params;
  validateId(id);

  const { course_id, student_id, grade_id } = validateExamData(req.body);

  const exam = await examsRepository.updateExam(id, course_id, student_id, grade_id);

  if (!exam) {
    throw new HTTPError(404, "Exam not found");
  }

  return res.status(200).json(exam);
}

// slet en eksamen //
export async function deleteExam(req, res) {
  const { id } = req.params;
  validateId(id);

  const exam = await examsRepository.deleteExam(id);

  if (!exam) {
    throw new HTTPError(404, "Exam not found");
  }

  return res.status(204).send();
}
