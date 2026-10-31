import { pool } from "../db.js";

export async function getAllTeachers() {
  const result = await pool.query("SELECT * FROM teachers");

  return result.rows;
}

export async function getTeacherById(id) {
  const result = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]);
  return result.rows[0];
}

export async function createTeacher(name, subject) {
  const result = await pool.query("INSERT INTO teachers (name, subject) VALUES ($1, $2) RETURNING *", [name, subject]);

  return result.rows[0];
}

export async function updateTeacher(id, name, subject) {
  const result = await pool.query("UPDATE teachers SET name = $1, subject = $2 WHERE id = $3 RETURNING *", [name, subject, id]);

  return result.rows[0];
}

export async function deleteTeacher(id) {
  const result = await pool.query("DELETE FROM teachers WHERE id = $1 RETURNING *", [id]);

  return result.rows[0];
}
