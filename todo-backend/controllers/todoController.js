import Todo from "../models/todoModel.js";

// Crear una nueva tarea y guardarla en la base de datos
export const createTodo = async (req, res) => {
  try {
    // Crear una instancia de tarea con los datos recibidos del cuerpo de la solicitud
    const todo = new Todo({
      name: req.body.name, // Nombre de la tarea
      description: req.body.description, // Descripción de la tarea
      creator: req.body.creator, // Creador de la tarea
    });

    // Guardar la tarea en la base de datos
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo); // Enviar la tarea creada al cliente con estado 201
  } catch (error) {
    // Manejar errores y enviar mensaje al cliente
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las tareas de la base de datos
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find(); // Recuperar todas las tareas
    res.status(200).json(todos); // Enviar la lista de tareas al cliente con estado 200
  } catch (error) {
    // Manejar errores y enviar mensaje al cliente
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una tarea existente
export const updateTodo = async (req, res) => {
  try {
    // Buscar y actualizar la tarea por su ID
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve la tarea actualizada en lugar de la antigua
    });

    // Si no se encuentra la tarea, devolver un error 404
    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json(todo); // Enviar la tarea actualizada al cliente
  } catch (error) {
    // Manejar errores y enviar mensaje al cliente
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una tarea existente
export const deleteTodo = async (req, res) => {
  try {
    // Buscar y eliminar la tarea por su ID
    const todo = await Todo.findByIdAndDelete(req.params.id);

    // Si no se encuentra la tarea, devolver un error 404
    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json({ message: "Tarea eliminada" }); // Confirmar eliminación al cliente
  } catch (error) {
    // Manejar errores y enviar mensaje al cliente
    res.status(500).json({ message: error.message });
  }
};
