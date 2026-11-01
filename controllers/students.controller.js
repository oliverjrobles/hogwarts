import * as studentsRepository from "../repositories/student.repository.js";

//hent alle elever//
export async function getAllStudents(req, res) {
  try {
    const students = await studentsRepository.getAllStudents();

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch students",
    });
  }
}

//hent en bestemt elev//
export async function getStudentById(req, res) {
  try {
    const id = req.params.id;

    const student = await studentsRepository.getStudentById(id);

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch student",
    });
  }
}

//opret en ny elev//
export async function createStudent(req, res) {
  try {
    const { name, house_id } = req.body;

    const student = await studentsRepository.createStudent(name, house_id);

    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create student",
    });
  }
}

//opdater en eksisterende elev//
export async function updateStudent(req, res) {
  try {
    const id = req.params.id;
    const { name, house_id } = req.body;

    const student = await studentsRepository.updateStudent(id, name, house_id);

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update student",
    });
  }
}

//slet en elev//
export async function deleteStudent(req, res) {
  try {
    const id = req.params.id;

    const student = await studentsRepository.deleteStudent(id);

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete student",
    });
  }
}
