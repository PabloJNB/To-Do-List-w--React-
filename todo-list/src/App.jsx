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
        // Petición para obtener las tareas desde el servidor (API local)
        const response = await fetch("http://localhost:3001/todos");
        const data = await response.json(); // Convierte la respuesta en un objeto JSON
        setListaToDo(data); // Guarda las tareas obtenidas en el estado
      } catch (error) {
        console.error("Error fetching items", error); // Muestra errores si ocurren
      }
    };
    fetchList(); // Llama a la función al cargar el componente
  }, []); // [] indica que el efecto solo se ejecuta una vez

  // *** Función para agregar una nueva tarea ***
  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:3001/todos", {
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
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE", // Método HTTP para eliminar
      });

      if (!response.ok) {
        console.error("Error al intentar borrar la tarea");
        return; // Detener si hay un error
      }

      // Actualiza la lista local quitando la tarea eliminada
      const cleanList = listaToDo.filter((tarea) => tarea.id !== id);
      setListaToDo(cleanList); // Actualiza el estado con la lista filtrada

      openModal("Tarea borrada!"); // Muestra un modal de confirmación
    } catch (error) {
      console.error("Error en deleteTask:", error); // Muestra errores si ocurren
    }
  };

  // *** Función para completar una tarea ***
  const completeTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PATCH", // Método para modificar datos
        headers: {
          "Content-Type": "application/json", // Formato de los datos enviados
        },
        body: JSON.stringify({ isCompleted: true }), // Cambia el estado de la tarea a "completada"
      });

      if (!response.ok) {
        console.error("Error al intentar completar la tarea");
        return; // Detener si hay un error
      }

      // Actualiza el estado local para marcar la tarea como completada
      setListaToDo((prevLista) =>
        prevLista.map((tarea) =>
          tarea.id === id ? { ...tarea, isCompleted: true } : tarea
        )
      );

      openModal("Tarea completada!"); // Muestra un modal de confirmación
    } catch (error) {
      console.error("Error en completeTask:", error); // Muestra errores si ocurren
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