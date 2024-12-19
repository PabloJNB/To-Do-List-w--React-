import express from "express";
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

// Definir rutas para las operaciones CRUD
router.post("/create", createTodo); // Ruta para crear una nueva tarea
router.get("/getAll", getAllTodos); // Ruta para obtener todas las tareas
router.patch("/update/:id", updateTodo); // Ruta para actualizar una tarea por ID
router.delete("/delete/:id", deleteTodo); // Ruta para eliminar una tarea por ID

export default router;
