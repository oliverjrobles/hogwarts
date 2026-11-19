import { pool } from "../db.js";

// hent alle lærere //
export async function getAllTeachers() {
  const result = await pool.query("SELECT * FROM teachers");

  return result.rows;
}

// hent en bestemt lærer //
export async function getTeacherById(id) {
  const result = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]);

  return result.rows[0];
}

// opret en ny lærer //
export async function createTeacher(name, subject, employmentStart, currentlyActive, deceased) {
  const result = await pool.query(
    `INSERT INTO teachers
      (name, subject, employment_start, currently_active, deceased)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, subject, employmentStart, currentlyActive, deceased]
  );

  return result.rows[0];
}

// opdater en lærer //
export async function updateTeacher(id, name, subject, employmentStart, currentlyActive, deceased) {
  const result = await pool.query(
    `UPDATE teachers
     SET name = $1,
         subject = $2,
         employment_start = $3,
         currently_active = $4,
         deceased = $5
     WHERE id = $6
     RETURNING *`,
    [name, subject, employmentStart, currentlyActive, deceased, id]
  );

  return result.rows[0];
}

// slet en lærer //
export async function deleteTeacher(id) {
  const result = await pool.query("DELETE FROM teachers WHERE id = $1 RETURNING *", [id]);

  return result.rows[0];
}
