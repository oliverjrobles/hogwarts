import housesRoutes from "../routes/houses.routes.js";
import teachersRoutes from "../routes/teachers.routes.js";
import studentsRoutes from "../routes/students.routes.js";
import coursesRoutes from "../routes/courses.routes.js";
import "dotenv/config";
import express from "express";
import { pool } from "../db.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/houses", housesRoutes);
app.use("/teachers", teachersRoutes);
app.use("/students", studentsRoutes);
app.use("/courses", coursesRoutes);

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
