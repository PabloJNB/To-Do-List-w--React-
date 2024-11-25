import React, { useState } from 'react';
import "./AddTodoForm.css"
import { useModal } from '../context/ModalContext';

function AddTodoForm({ onAddTask }) {
    const { openModal } = useModal();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        isCompleted: false,
        creator: "",
    });
    //Maneja el cambio en el valor del input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // Maneja el formulario 
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.name && formData.description && formData.creator) {
            onAddTask(formData); // Llamamos a la función para agregar tarea
            setFormData({ name: "", description: "", creator: "" }); // Limpiamos el formulario
        } else {
            openModal("Por favor, completa todos los campos.");
        }
    };

    return (
        <div className='Add-Form'>
            <form onSubmit={handleSubmit}>
                <h2>Agregar tareas</h2>
                <div className='labelContainer'>
                    <label htmlFor="name">
                        Name
                        <input
                            id='name'
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={10}
                        />
                    </label>
                    <label htmlFor="description">
                        Description
                        <input
                            id='description'
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={40}
                        />
                    </label>
                    <label htmlFor="creator">
                        Creator
                        <input
                            id='creator'
                            type="text"
                            name="creator"
                            value={formData.creator}
                            onChange={handleChange}
                            minLength={0}
                            maxLength={10}
                        />
                    </label>
                </div>
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default AddTodoForm;