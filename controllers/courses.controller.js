import * as coursesRepository from "../repositories/courses.repository.js";

//hent alle kurser//
export async function getAllCourses(req, res) {
  try {
    const courses = await coursesRepository.getAllCourses();

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch courses",
    });
  }
}

//hent et bestemt kursus//
export async function getCourseById(req, res) {
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
}

//opdater et kursus//
export async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const { name, teacher_id } = req.body;

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
}

//slet et kursus//
export async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    const course = await coursesRepository.deleteCourse(id);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete course",
    });
  }
}

//skift lærer på et kursus//
export async function updateCourseTeacher(req, res) {
  try {
    const { id } = req.params;
    const { teacher_id } = req.body;

    const course = await coursesRepository.updateCourseTeacher(id, teacher_id);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update course teacher",
    });
  }
}

//tilføj en elev til et kursus//
export async function addStudentToCourse(req, res) {
  try {
    const { id } = req.params;
    const { student_id } = req.body;

    const result = await coursesRepository.addStudentToCourse(id, student_id);

    if (!result) {
      return res.status(404).json({
        error: "Course or student not found",
      });
    }

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add student to course",
    });
  }
}

//fjern en elev fra et kursus//
export async function removeStudentFromCourse(req, res) {
  try {
    const { id, studentId } = req.params;

    const result = await coursesRepository.removeStudentFromCourse(id, studentId);

    if (!result) {
      return res.status(404).json({
        error: "Student is not enrolled in this course",
      });
    }

    res.status(200).json({
      message: "Student removed from course successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to remove student from course",
    });
  }
}

//opret et nyt kursus//
export async function createCourse(req, res) {
  try {
    const { name, teacher_id } = req.body;

    const course = await coursesRepository.createCourse(name, teacher_id);

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create course",
    });
  }
}
