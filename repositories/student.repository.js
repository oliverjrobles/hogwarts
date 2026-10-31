import { pool } from "../db.js";

export async function getAllStudents() {
  const result = await pool.query("SELECT * FROM students");

  return result.rows;
}

export async function getStudentById(id) {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

  return result.rows[0];
}

export async function createStudent(name, houseId) {
  const result = await pool.query("INSERT INTO students (name, house_id) VALUES ($1, $2) RETURNING *", [name, houseId]);

  return result.rows[0];
}

export async function updateStudent(id, name, houseId) {
  const result = await pool.query("UPDATE students SET name = $1, house_id = $2 WHERE id = $3 RETURNING *", [name, houseId, id]);

  return result.rows[0];
}

export async function updateStudentName(id, name) {
  const result = await pool.query("UPDATE students SET name = $1 WHERE id = $2 RETURNING *", [name, id]);

  return result.rows[0];
}

export async function deleteStudent(id) {
  const result = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [id]);

  return result.rows[0];
}
