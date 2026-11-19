import { pool } from "../db.js";

// hent alle elever //
export async function getAllStudents() {
  const result = await pool.query("SELECT * FROM students");

  return result.rows;
}

// hent en bestemt elev //
export async function getStudentById(id) {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

  return result.rows[0];
}

// opret en ny elev //
export async function createStudent(name, houseId, birthday, schoolYear) {
  const result = await pool.query(
    `INSERT INTO students
      (name, house_id, birthday, school_year)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, houseId, birthday, schoolYear]
  );

  return result.rows[0];
}

// opdater en elev //
export async function updateStudent(id, name, houseId, birthday, schoolYear) {
  const result = await pool.query(
    `UPDATE students
     SET name = $1,
         house_id = $2,
         birthday = $3,
         school_year = $4
     WHERE id = $5
     RETURNING *`,
    [name, houseId, birthday, schoolYear, id]
  );

  return result.rows[0];
}

// opdater kun elevens navn //
export async function updateStudentName(id, name) {
  const result = await pool.query("UPDATE students SET name = $1 WHERE id = $2 RETURNING *", [name, id]);

  return result.rows[0];
}

// slet en elev //
export async function deleteStudent(id) {
  const result = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [id]);

  return result.rows[0];
}
