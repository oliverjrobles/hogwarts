import * as teachersRepository from "../repositories/teachers.repository.js";
import UpdateTeacherDto from "../dtos/updateteacher.dto.js";
import HTTPError from "../errorHandling/HTTPError.js";

// hent alle lærere //
export async function getAllTeachers(req, res) {
  const teachers = await teachersRepository.getAllTeachers();

  return res.status(200).json(teachers);
}

// hent en bestemt lærer //
export async function getTeacherById(req, res) {
  const id = req.params.id;

  const teacher = await teachersRepository.getTeacherById(id);

  if (!teacher) {
    throw new HTTPError(404, "Teacher not found");
  }

  return res.status(200).json(teacher);
}

// opret en ny lærer //
export async function createTeacher(req, res) {
  const { name, subject, employment_start, currently_active, deceased } = req.body;

  if (!name || !subject || !employment_start || typeof currently_active !== "boolean" || typeof deceased !== "boolean") {
    throw new HTTPError(400, "All teacher fields are required");
  }

  const teacher = await teachersRepository.createTeacher(name, subject, employment_start, currently_active, deceased);

  return res.status(201).json(teacher);
}

// opdater en eksisterende lærer //
export async function updateTeacher(req, res) {
  const id = req.params.id;

  // Valider data med Zod
  const result = UpdateTeacherDto.safeParse(req.body);

  if (!result.success) {
    throw new HTTPError(400, "Invalid teacher data");
  }

  const { name, subject, employment_start, currently_active, deceased } = result.data;

  const teacher = await teachersRepository.updateTeacher(id, name, subject, employment_start, currently_active, deceased);

  if (!teacher) {
    throw new HTTPError(404, "Teacher not found");
  }

  return res.status(200).json(teacher);
}

// slet en lærer //
export async function deleteTeacher(req, res) {
  const id = req.params.id;

  const teacher = await teachersRepository.deleteTeacher(id);

  if (!teacher) {
    throw new HTTPError(404, "Teacher not found");
  }

  return res.status(204).send();
}
