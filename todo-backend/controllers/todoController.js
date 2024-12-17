import Todo from "../models/todoModel.js";

export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      name: req.body.name,
      description: req.body.description,
      creator: req.body.creator,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve la tarea actualizada
    });
    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json(todo); // Devuelve la tarea actualizada al frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json({ message: "Tarea eliminada" }); // Confirmar eliminación
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
