import { pool } from "../db.js";

// hent alle karakterer //
export async function getAllGrades() {
  const result = await pool.query("SELECT * FROM grades ORDER BY id");

  return result.rows;
}

// hent en bestemt karakter //
export async function getGradeById(id) {
  const result = await pool.query("SELECT * FROM grades WHERE id = $1", [id]);

  return result.rows[0];
}
