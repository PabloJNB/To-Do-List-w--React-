import React from 'react';
import './TodoItem.css';

function TodoItem({ tarea, onDeleteClick, onCompleteClick }) {


    return (
        <div className='task'>
            <div className='taskInfo'> {/* Información de la tarea */}
                <h3>{tarea.name}</h3>
                <p>{tarea.description}</p>
                <h6>Creator: {tarea.creator}</h6>
            </div>
            <div className='taskButtons'> {/* Botones para las acciones */}
                <button className='completeButton' onClick={onCompleteClick}>Completar</button>
                {/* Botón para borrar, enlazado a la función deleteTask */}
                <button className='deleteButton' onClick={onDeleteClick}>Borrar</button>
            </div>
        </div>
    );
}

export default TodoItem;