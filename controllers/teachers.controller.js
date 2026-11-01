import * as teachersRepository from "../repositories/teachers.repository.js";

//hent alle lærere//
export async function getAllTeachers(req, res) {
  try {
    const teachers = await teachersRepository.getAllTeachers();

    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
}

//hent en bestemt lærer//
export async function getTeacherById(req, res) {
  try {
    const id = req.params.id;

    const teacher = await teachersRepository.getTeacherById(id);

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch teacher" });
  }
}

//opret en ny lærer//
export async function createTeacher(req, res) {
  try {
    const { name, subject } = req.body;

    if (!name || !subject) {
      return res.status(400).json({
        error: "Name and subject are required",
      });
    }

    const teacher = await teachersRepository.createTeacher(name, subject);

    res.status(201).json(teacher);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create teacher",
    });
  }
}

//opdater en eksisterende lærer//
export async function updateTeacher(req, res) {
  try {
    const id = req.params.id;
    const { name, subject } = req.body;

    const teacher = await teachersRepository.updateTeacher(id, name, subject);

    if (!teacher) {
      return res.status(404).json({
        error: "Teacher not found",
      });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update teacher",
    });
  }
}

//slet en lærer//
export async function deleteTeacher(req, res) {
  try {
    const id = req.params.id;

    const teacher = await teachersRepository.deleteTeacher(id);

    if (!teacher) {
      return res.status(404).json({
        error: "Teacher not found",
      });
    }

    res.status(200).json({
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete teacher",
    });
  }
}
