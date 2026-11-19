import { pool } from "../db.js";

export async function getAllCourses() {
  const result = await pool.query("SELECT * FROM courses");

  return result.rows;
}

export async function getCourseById(id) {
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);

  return result.rows[0];
}

export async function createCourse(name, teacherId, type, level, schoolYear) {
  const result = await pool.query(
    `INSERT INTO courses
      (name, teacher_id, type, level, school_year)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, teacherId, type, level, schoolYear]
  );

  return result.rows[0];
}

export async function updateCourse(id, name, teacherId, type, level, schoolYear) {
  const result = await pool.query(
    `UPDATE courses
     SET name = $1,
         teacher_id = $2,
         type = $3,
         level = $4,
         school_year = $5
     WHERE id = $6
     RETURNING *`,
    [name, teacherId, type, level, schoolYear, id]
  );

  return result.rows[0];
}

export async function deleteCourse(id) {
  const result = await pool.query("DELETE FROM courses WHERE id = $1 RETURNING *", [id]);

  return result.rows[0];
}

export async function changeCourseTeacher(id, teacherId) {
  const result = await pool.query("UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *", [teacherId, id]);

  return result.rows[0];
}

export async function addStudentToCourse(studentId, courseId) {
  const result = await pool.query("INSERT INTO student_courses (student_id, course_id) VALUES ($1, $2) RETURNING *", [studentId, courseId]);

  return result.rows[0];
}

export async function removeStudentFromCourse(studentId, courseId) {
  const result = await pool.query("DELETE FROM student_courses WHERE student_id = $1 AND course_id = $2 RETURNING *", [studentId, courseId]);

  return result.rows[0];
}
