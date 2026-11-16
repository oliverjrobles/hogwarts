import * as coursesRepository from "../repositories/courses.repository.js";
import HTTPError from "../errorHandling/HTTPError.js";

// hent alle kurser //
export async function getAllCourses(req, res) {
  const courses = await coursesRepository.getAllCourses();

  return res.status(200).json(courses);
}

// hent et bestemt kursus //
export async function getCourseById(req, res) {
  const id = req.params.id;

  const course = await coursesRepository.getCourseById(id);

  if (!course) {
    throw new HTTPError(404, "Course not found");
  }

  return res.status(200).json(course);
}

// opdater et kursus //
export async function updateCourse(req, res) {
  const { id } = req.params;
  const { name, teacher_id } = req.body;

  const course = await coursesRepository.updateCourse(id, name, teacher_id);

  if (!course) {
    throw new HTTPError(404, "Course not found");
  }

  return res.status(200).json(course);
}

// slet et kursus //
export async function deleteCourse(req, res) {
  const { id } = req.params;

  const course = await coursesRepository.deleteCourse(id);

  if (!course) {
    throw new HTTPError(404, "Course not found");
  }

  return res.status(204).send();
}

// skift lærer på et kursus //
export async function updateCourseTeacher(req, res) {
  const { id } = req.params;
  const { teacher_id } = req.body;

  const course = await coursesRepository.updateCourseTeacher(id, teacher_id);

  if (!course) {
    throw new HTTPError(404, "Course not found");
  }

  return res.status(200).json(course);
}

// tilføj en elev til et kursus //
export async function addStudentToCourse(req, res) {
  const { id } = req.params;
  const { student_id } = req.body;

  const result = await coursesRepository.addStudentToCourse(id, student_id);

  if (!result) {
    throw new HTTPError(404, "Course or student not found");
  }

  return res.status(201).json(result);
}

// fjern en elev fra et kursus //
export async function removeStudentFromCourse(req, res) {
  const { id, studentId } = req.params;

  const result = await coursesRepository.removeStudentFromCourse(id, studentId);

  if (!result) {
    throw new HTTPError(404, "Student is not enrolled in this course");
  }

  return res.status(200).json({
    message: "Student removed from course successfully",
  });
}

// opret et nyt kursus //
export async function createCourse(req, res) {
  const { name, teacher_id } = req.body;

  if (!name || !teacher_id) {
    throw new HTTPError(400, "Name and teacher_id are required");
  }

  const course = await coursesRepository.createCourse(name, teacher_id);

  return res.status(201).json(course);
}
