import TodoItem from './TodoItem';
import './ToDoList.css';

// Componente que muestra la lista de tareas pendientes
function TodoList({ listaToDo, deleteTask, completeTask }) {
    // Filtrar y mapear las tareas pendientes para crear una lista de componentes `TodoItem`
    const itemsList = listaToDo
        .filter(tarea => !tarea.isCompleted) // Filtra solo las tareas no completadas
        .map((tarea) => ( // Mapea cada tarea en un componente TodoItem
            <TodoItem
                key={tarea.id} // Identificador único necesario para listas en React
                tarea={tarea} // Pasa la tarea completa como prop
                onDeleteClick={() => deleteTask(tarea.id)} // Llama a la función deleteTask con el ID de la tarea
                onCompleteClick={() => completeTask(tarea.id)} // Llama a la función completeTask con el ID de la tarea
            />
        ));

    return (
        <div className='To-Do-List'> {/* Contenedor principal con clase para estilos */}
            <h2>Tareas Pendientes</h2> {/* Título del listado */}
            <div className='itemsList'>
                {itemsList} {/* Renderiza la lista de tareas */}
            </div>
        </div>
    );
}

export default TodoList;