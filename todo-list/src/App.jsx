import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { useState, useEffect } from 'react';
import { useModal } from './context/ModalContext';
import CompleteList from "./components/CompleteList"

function App() {
  // Estados principales:
  const [listaToDo, setListaToDo] = useState([]); // Lista de tareas (estado central de la app)
  const { openModal } = useModal();

  // Carga inicial de las tareas desde el servidor
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch("http://localhost:3001/todos"); // Petición GET para obtener las tareas
        const data = await response.json(); // Convierte la respuesta en JSON
        setListaToDo(data); // Actualiza el estado con la lista obtenida
      } catch (error) {
        console.error("Error fetching items", error); // Maneja errores de la petición
      }
    };
    fetchList();
  }, []); // Este efecto solo se ejecuta al cargar el componente por primera vez

  // Agregar una nueva tarea
  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:3001/todos", {
        method: 'POST', // Indica que es una petición para crear datos
        headers: {
          'Content-Type': 'application/json', // Define que el cuerpo de la petición será JSON
        },
        body: JSON.stringify(task), // Convierte la tarea en un string JSON
      });

      if (response.ok) { // Verifica si la respuesta es exitosa
        const newTask = await response.json(); // Obtiene la nueva tarea creada
        openModal("Tarea agregada!")
        setListaToDo((prevTasks) => [...prevTasks, newTask]); // Agrega la nueva tarea al estado actual
      }
    } catch (error) {
      console.error("Error adding task", error); // Maneja errores al agregar la tarea
    }
  };


  // Función para borrar una tarea del servidor y actualizar la lista local
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE", // Método HTTP para eliminar
      });

      if (!response.ok) {
        console.error("Error al intentar borrar la tarea");
        return; // Detener la ejecución si hay un error
      }

      // Actualizar la lista local eliminando la tarea borrada
      const cleanList = listaToDo.filter((tarea) => tarea.id !== id);
      setListaToDo(cleanList); // Actualiza el estado con la lista limpia

      // Configurar el mensaje del modal y abrirlo
      openModal("Tarea borrada!")

    } catch (error) {
      console.error("Error en deleteTask:", error);
    }
  };

  const completeTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: true }),
      });

      if (!response.ok) {
        console.error("Error al intentar completar la tarea");
        return; // Detener la ejecución si hay un error
      }

      // Actualizar el estado local correctamente
      setListaToDo((prevLista) =>
        prevLista.map((tarea) =>
          tarea.id === id ? { ...tarea, isCompleted: true } : tarea
        )
      );

      // Configurar el mensaje del modal y abrirlo
      openModal("Tarea completada!")

    } catch (error) {
      console.error("Error en completeTask:", error);
    }
  };




  return (
    <div className="App">
      <header>TO DO LIST</header> {/* Encabezado principal de la aplicación */}
      <main>
        {/* Componente que muestra la lista de tareas */}
        <TodoList
          listaToDo={listaToDo} // Lista de tareas que se pasa como prop
          deleteTask={deleteTask} // funcion borrar tarea
          completeTask={completeTask}
        />
        <div className='wrapper'>

          {/* Componente para agregar nuevas tareas */}
          <AddTodoForm
            onAddTask={addTask} // Pasa la función para agregar tareas como prop
          />
          <CompleteList
            listaToDo={listaToDo} // Lista de tareas que se pasa como prop
            deleteTask={deleteTask} // funcion borrar tarea

          />
        </div>
      </main>
    </div>
  );
}

export default App;
