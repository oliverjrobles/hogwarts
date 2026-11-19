import * as gradesRepository from "../repositories/grades.repository.js";
import HTTPError from "../errorHandling/HTTPError.js";

// hent alle karakterer //
export async function getAllGrades(req, res) {
  const grades = await gradesRepository.getAllGrades();

  return res.status(200).json(grades);
}

// hent en bestemt karakter //
export async function getGradeById(req, res) {
  const id = req.params.id;

  if (!/^[1-9]\d*$/.test(id)) {
    throw new HTTPError(400, "Invalid grade ID");
  }

  const grade = await gradesRepository.getGradeById(id);

  if (!grade) {
    throw new HTTPError(404, "Grade not found");
  }

  return res.status(200).json(grade);
}
