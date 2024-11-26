import React, { useState } from 'react'; // Importa React y useState para manejar el estado local
import "./AddTodoForm.css"; // Estilos específicos del formulario
import { useModal } from '../context/ModalContext'; // Contexto para manejar el modal

// Componente para agregar nuevas tareas
function AddTodoForm({ onAddTask }) {
    const { openModal } = useModal(); // Desestructura la función openModal del contexto ModalContext

    // Estado local para manejar los datos del formulario
    const [formData, setFormData] = useState({
        name: "", // Nombre de la tarea
        description: "", // Descripción de la tarea
        isCompleted: false, // Indica si la tarea está completada (por defecto false)
        creator: "", // Nombre del creador de la tarea
    });

    // Maneja los cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target; // Extrae el nombre y valor del input que disparó el evento
        setFormData((prevData) => ({
            ...prevData, // Copia los valores anteriores
            [name]: value, // Actualiza el campo correspondiente
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita la recarga de la página
        if (formData.name && formData.description && formData.creator) { // Verifica que los campos obligatorios estén completos
            onAddTask(formData); // Llama a la función onAddTask para agregar la tarea
            setFormData({ name: "", description: "", creator: "" }); // Resetea los campos del formulario
        } else {
            openModal("Por favor, completa todos los campos."); // Muestra un mensaje en el modal si faltan campos
        }
    };

    return (
        <div className='Add-Form'> {/* Contenedor principal con clase para estilos */}
            <form onSubmit={handleSubmit}> {/* Formulario controlado */}
                <h2>Agregar tareas</h2> {/* Título del formulario */}
                <div className='labelContainer'> {/* Contenedor para organizar las etiquetas e inputs */}
                    {/* Campo para el nombre */}
                    <label htmlFor="name">
                        Name
                        <input
                            id='name' // Identificador único para el input
                            type="text" // Tipo de input
                            name="name" // Nombre que coincide con la clave en formData
                            value={formData.name} // Valor controlado por el estado
                            onChange={handleChange} // Llama a handleChange cuando cambia el valor
                            maxLength={10} // Limita la longitud máxima del texto
                        />
                    </label>
                    {/* Campo para la descripción */}
                    <label htmlFor="description">
                        Description
                        <input
                            id='description'
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={70}
                        />
                    </label>
                    {/* Campo para el creador */}
                    <label htmlFor="creator">
                        Creator
                        <input
                            id='creator'
                            type="text"
                            name="creator"
                            value={formData.creator}
                            onChange={handleChange}
                            maxLength={10}
                        />
                    </label>
                </div>
                <button type="submit">Agregar</button> {/* Botón para enviar el formulario */}
            </form>
        </div>
    );
}

export default AddTodoForm;
