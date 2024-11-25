import TodoItem from './TodoItem';
import './ToDoList.css';

function TodoList({ listaToDo, deleteTask, completeTask }) {
    // Generar la lista de tareas como componentes individuales
    const itemsList = listaToDo.filter(tarea => !tarea.isCompleted).map((tarea) => (
        <TodoItem
            key={tarea.id} // Identificador único para React
            tarea={tarea} // Pasar los datos de cada tarea
            onDeleteClick={() => deleteTask(tarea.id)}
            onCompleteClick={() => completeTask(tarea.id)}
        />
    ));

    return (
        <div className='To-Do-List'>
            <h2>Tareas Pendientes</h2> {/* Título del listado */}
            <div className='itemsList'>
                {itemsList} {/* Renderizar la lista de tareas */}
            </div>
        </div>
    );
}

export default TodoList;