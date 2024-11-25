import React from 'react'
import "./CompleteList.css"
import CompleteItem from './CompleteItem';

function CompleteList({ listaToDo, deleteTask }) {

    const completeList = listaToDo.filter(tarea => tarea.isCompleted).map((tarea) => (
        <CompleteItem
            key={tarea.id} // Identificador único para React
            tarea={tarea} // Pasar los datos de cada tarea
            onClick={() => deleteTask(tarea.id)}
        />
    ));

    return (
        <div className='completeList'>
            <h2>Tareas Completadas</h2>
            <div className='itemsComplete'>
                {completeList}
            </div>
        </div>
    )
}

export default CompleteList
