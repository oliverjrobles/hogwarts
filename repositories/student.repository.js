import { pool } from "../db.js";

export async function getAllStudents() {
  const result = await pool.query("SELECT * FROM students");

  return result.rows;
}

export async function getStudentById(id) {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

  return result.rows[0];
}
