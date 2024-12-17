import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: String,
  description: String,
  creator: String,
  isCompleted: { type: Boolean, default: false }, // Campo para completar tareas
});

export default mongoose.model("todos", todoSchema);
