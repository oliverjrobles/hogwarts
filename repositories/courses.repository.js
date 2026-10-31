import { pool } from "../db.js";

export async function getAllCourses() {
  const result = await pool.query("SELECT * FROM courses");

  return result.rows;
}

export async function getCourseById(id) {
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);

  return result.rows[0];
}

export async function createCourse(name, teacherId) {
  const result = await pool.query("INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *", [name, teacherId]);

  return result.rows[0];
}

export async function updateCourse(id, name, teacherId) {
  const result = await pool.query("UPDATE courses SET name = $1, teacher_id = $2 WHERE id = $3 RETURNING *", [name, teacherId, id]);

  return result.rows[0];
}

export async function deleteCourse(id) {
  const result = await pool.query("DELETE FROM courses WHERE id = $1 RETURNING *", [id]);

  return result.rows[0];
}
