import React from 'react'
import "./CompleteItem.css"

function CompleteItem({ tarea, onClick }) {


    return (
        <div className='completeTask'>
            <h3>{tarea.name}</h3>
            <h6>Creator: {tarea.creator}</h6>
            <button className='deleteButton' onClick={onClick}>Borrar</button>
        </div>
    )
}

export default CompleteItem