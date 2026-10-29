import "dotenv/config";
import express from "express";
import { pool } from "../db.js";
import * as housesRepository from "../repositories/houses.repository.js";
import * as teachersRepository from "../repositories/teachers.repository.js";

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
