import * as studentsRepository from "../repositories/student.repository.js";
import HTTPError from "../errorHandling/HTTPError.js";

//hent alle elever//
export async function getAllStudents(req, res) {
  const students = await studentsRepository.getAllStudents();

  return res.status(200).json(students);
}

//hent en bestemt elev//
export async function getStudentById(req, res) {
  const id = req.params.id;

  const student = await studentsRepository.getStudentById(id);

  if (!student) {
    throw new HTTPError(404, "Student not found");
  }

  return res.status(200).json(student);
}

//opret en ny elev//
export async function createStudent(req, res) {
  const { name, house_id } = req.body;

  const student = await studentsRepository.createStudent(name, house_id);

  return res.status(201).json(student);
}

//opdater en eksisterende elev//
export async function updateStudent(req, res) {
  const id = req.params.id;
  const { name, house_id } = req.body;

  const student = await studentsRepository.updateStudent(id, name, house_id);

  if (!student) {
    throw new HTTPError(404, "Student not found");
  }

  return res.status(200).json(student);
}

//slet en elev//
export async function deleteStudent(req, res) {
  const id = req.params.id;

  const student = await studentsRepository.deleteStudent(id);

  if (!student) {
    throw new HTTPError(404, "Student not found");
  }

  return res.status(204).send();
}
