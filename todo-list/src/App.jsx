import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { useState, useEffect } from 'react';
import { useModal } from './context/ModalContext';
import CompleteList from "./components/CompleteList"


function App() {
  // *** Estados principales de la aplicación ***
  const [listaToDo, setListaToDo] = useState([]); // Estado que almacena la lista de tareas
  const { openModal } = useModal(); // Función del contexto que abre un modal

  // *** Efecto para cargar las tareas al iniciar la aplicación ***
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch("http://localhost:5000/todos/getAll");
        const data = await response.json();
        console.log("Tareas obtenidas:", data); // Aquí verifica si los datos tienen el campo `_id`
        setListaToDo(data);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };
    fetchList();
  }, []);
  ; // [] indica que el efecto solo se ejecuta una vez

  // *** Función para agregar una nueva tarea ***
  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:5000/todos/create", {
        method: 'POST', // Método HTTP para agregar datos
        headers: {
          'Content-Type': 'application/json', // Indica que enviamos datos en formato JSON
        },
        body: JSON.stringify(task), // Convierte la tarea en un string JSON
      });

      if (response.ok) {
        const newTask = await response.json(); // Obtiene la tarea recién creada
        openModal("Tarea agregada!"); // Muestra un modal de confirmación
        setListaToDo((prevTasks) => [...prevTasks, newTask]); // Actualiza la lista de tareas
      }
    } catch (error) {
      console.error("Error adding task", error); // Muestra errores si ocurren
    }
  };

  // *** Función para borrar una tarea ***
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(`Error al borrar la tarea con id: ${id}`);
        return;
      }

      // Verifica qué se devuelve desde el backend
      const result = await response.json();
      console.log("Tarea eliminada:", result);

      // Filtra las tareas y actualiza el estado
      setListaToDo((prevLista) => prevLista.filter((tarea) => tarea._id !== id));
      openModal("Tarea borrada!");
    } catch (error) {
      console.error("Error en deleteTask:", error);
    }
  };

  // *** Función para completar una tarea ***
  const completeTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/complete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: true }),
      });

      if (!response.ok) {
        console.error(`Error al completar la tarea con id: ${id}`);
        return;
      }

      const updatedTask = await response.json(); // Tarea actualizada devuelta por el backend
      console.log("Tarea actualizada:", updatedTask);

      // Actualiza el estado local
      setListaToDo((prevLista) =>
        prevLista.map((tarea) =>
          tarea._id === id ? { ...tarea, ...updatedTask } : tarea
        )
      );

      openModal("Tarea completada!");
    } catch (error) {
      console.error("Error en completeTask:", error);
    }
  };



  return (
    <div className="App">
      <header>TO DO LIST</header> {/* Encabezado principal de la aplicación */}
      <main>
        {/* Componente para mostrar la lista de tareas pendientes */}
        <TodoList
          listaToDo={listaToDo} // Pasa la lista de tareas como prop
          deleteTask={deleteTask} // Pasa la función para borrar tareas
          completeTask={completeTask} // Pasa la función para completar tareas
        />
        <div className='wrapper'>
          {/* Componente para agregar nuevas tareas */}
          <AddTodoForm
            onAddTask={addTask} // Pasa la función para agregar tareas como prop
          />
          {/* Componente para mostrar tareas completadas */}
          <CompleteList
            listaToDo={listaToDo} // Lista de tareas
            deleteTask={deleteTask} // Reutiliza la función para borrar tareas
          />
        </div>
      </main>
    </div>
  );
}

export default App;