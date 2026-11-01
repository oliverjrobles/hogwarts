import "dotenv/config";
import express from "express";
import { pool } from "../db.js";
import * as housesRepository from "../repositories/houses.repository.js";
import * as teachersRepository from "../repositories/teachers.repository.js";
import * as studentsRepository from "../repositories/student.repository.js";
import * as coursesRepository from "../repositories/courses.repository.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Hogwarts API",
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database connection failed",
    });
  }
});

// Houses endpoint //
app.get("/houses", async (req, res) => {
  try {
    const houses = await housesRepository.getAllHouses();

    res.status(200).json(houses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch houses",
    });
  }
});

// Houses endpoint id som vælger specifikke huse //
app.get("/houses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const house = await housesRepository.getHouseById(id);

    if (!house) {
      return res.status(404).json({
        error: "House not found",
      });
    }

    res.status(200).json(house);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch house",
    });
  }
});

// lærerne //
app.get("/teachers", async (req, res) => {
  try {
    const teachers = await teachersRepository.getAllTeachers();

    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch teachers",
    });
  }
});

app.get("/teachers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await teachersRepository.getTeacherById(id);

    if (!teacher) {
      return res.status(404).json({
        error: "Teacher not found",
      });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch teacher",
    });
  }
});

//eleverne//
app.get("/students", async (req, res) => {
  try {
    const students = await studentsRepository.getAllStudents();

    res.status(200).json(students);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch students",
    });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

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
});

//kurser eller fag eller hvad man nu kalder dem//
app.get("/courses", async (req, res) => {
  try {
    const courses = await coursesRepository.getAllCourses();

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch courses",
    });
  }
});

app.get("/courses/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const course = await coursesRepository.getCourseById(id);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch course",
    });
  }
});

//opdater//
app.post("/courses", async (req, res) => {
  try {
    const { name, teacher_id } = req.body;

    if (!name || !teacher_id) {
      return res.status(400).json({
        error: "Name and teacher_id are required",
      });
    }

    const course = await coursesRepository.createCourse(name, teacher_id);

    res.status(201).json(course);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create course",
    });
  }
});

//opdater//
app.put("/courses/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, teacher_id } = req.body;

    if (!name || !teacher_id) {
      return res.status(400).json({
        error: "Name and teacher_id are required",
      });
    }

    const course = await coursesRepository.updateCourse(id, name, teacher_id);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update course",
    });
  }
});

//slet kursus//
app.delete("/courses/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const course = await coursesRepository.deleteCourse(id);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete course",
    });
  }
});

//skift lærer på et eksisterende kursus!!!//
app.put("/courses/:id/teacher", async (req, res) => {
  try {
    const id = req.params.id;
    const { teacher_id } = req.body;

    if (!teacher_id) {
      return res.status(400).json({
        error: "teacher_id is required",
      });
    }

    const course = await coursesRepository.changeCourseTeacher(id, teacher_id);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to change course teacher",
    });
  }
});

//tilføj elev til kursus//
app.post("/courses/:id/students", async (req, res) => {
  try {
    const courseId = req.params.id;
    const { student_id } = req.body;

    if (!student_id) {
      return res.status(400).json({
        error: "student_id is required",
      });
    }

    const enrollment = await coursesRepository.addStudentToCourse(student_id, courseId);

    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to add student to course",
    });
  }
});

//Lave, opdatere og slette elev//
app.post("/students", async (req, res) => {
  try {
    const { name, house_id } = req.body;

    if (!name || !house_id) {
      return res.status(400).json({
        error: "Name and house_id are required",
      });
    }

    const student = await studentsRepository.createStudent(name, house_id);

    res.status(201).json(student);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create student",
    });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, house_id } = req.body;

    if (!name || !house_id) {
      return res.status(400).json({
        error: "Name and house_id are required",
      });
    }

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
});

app.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const student = await studentsRepository.deleteStudent(id);

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete student",
    });
  }
});

//fjern elev fra kursus//
app.delete("/courses/:id/students/:studentId", async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.params.studentId;

    const enrollment = await coursesRepository.removeStudentFromCourse(studentId, courseId);

    if (!enrollment) {
      return res.status(404).json({
        error: "Student is not enrolled in this course",
      });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to remove student from course",
    });
  }
});

//oprette, opdatere og slette lærer//
app.post("/teachers", async (req, res) => {
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
});

app.put("/teachers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, subject } = req.body;

    if (!name || !subject) {
      return res.status(400).json({
        error: "Name and subject are required",
      });
    }

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
});

app.delete("/teachers/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const teacher = await teachersRepository.deleteTeacher(id);

    if (!teacher) {
      return res.status(404).json({
        error: "Teacher not found",
      });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete teacher",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
