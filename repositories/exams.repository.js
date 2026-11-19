import { pool } from "../db.js";

// hent alle eksamener //
export async function getAllExams() {
  const result = await pool.query("SELECT * FROM exams ORDER BY id");

  return result.rows;
}

// hent en bestemt eksamen //
export async function getExamById(id) {
  const result = await pool.query("SELECT * FROM exams WHERE id = $1", [id]);

  return result.rows[0];
}

// opret en eksamen //
export async function createExam(courseId, studentId, gradeId) {
  const result = await pool.query(
    `INSERT INTO exams (course_id, student_id, grade_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [courseId, studentId, gradeId]
  );

  return result.rows[0];
}

// opdater en eksamen //
export async function updateExam(id, courseId, studentId, gradeId) {
  const result = await pool.query(
    `UPDATE exams
     SET course_id = $1,
         student_id = $2,
         grade_id = $3
     WHERE id = $4
     RETURNING *`,
    [courseId, studentId, gradeId, id]
  );

  return result.rows[0];
}

// slet en eksamen //
export async function deleteExam(id) {
  const result = await pool.query("DELETE FROM exams WHERE id = $1 RETURNING *", [id]);

  return result.rows[0];
}
