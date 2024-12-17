import express from "express";
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

// Definir rutas
router.post("/create", createTodo);
router.get("/getAll", getAllTodos);
router.patch("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
