import React from 'react'
import "./CompleteList.css"
import CompleteItem from './CompleteItem';

// Componente que muestra la lista de tareas completadas
function CompleteList({ listaToDo, deleteTask }) {
    // Filtrar y mapear las tareas completadas para crear una lista de componentes `CompleteItem`
    const completeList = listaToDo
        .filter(tarea => tarea.isCompleted) // Filtra solo las tareas completadas
        .map((tarea) => ( // Mapea cada tarea completada en un componente CompleteItem
            <CompleteItem
                key={tarea._id} // Identificador único para React
                tarea={tarea} // Pasa la tarea completa como prop
                onClick={() => deleteTask(tarea._id)} // Llama a la función deleteTask con el ID de la tarea
            />
        ));

    return (
        <div className='completeList'> {/* Contenedor principal con clase para estilos */}
            <h2>Tareas Completadas</h2> {/* Título de la sección */}
            <div className='itemsComplete'>
                {completeList} {/* Renderiza la lista de tareas completadas */}
            </div>
        </div>
    );
}

export default CompleteList;
