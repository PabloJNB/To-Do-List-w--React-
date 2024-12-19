import mongoose from "mongoose";

// Definición del esquema para las tareas
const todoSchema = new mongoose.Schema({
  name: String, // Nombre de la tarea
  description: String, // Descripción de la tarea
  creator: String, // Nombre o identificador del creador
  isCompleted: { type: Boolean, default: false }, // Estado de la tarea (completada o no)
});

// Exportar el modelo para interactuar con la colección "todos" en la base de datos
export default mongoose.model("todos", todoSchema);
