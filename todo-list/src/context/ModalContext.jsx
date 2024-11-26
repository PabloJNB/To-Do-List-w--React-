import { createContext, useContext, useState } from "react";
import "./modal.css";

// Crea un contexto para el modal
const ModalContext = createContext();

// Proveedor del contexto del modal
export const ModalProvider = ({ children }) => {
  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para almacenar el contenido del modal
  const [modalContent, setModalContent] = useState("");

  // Función para abrir el modal con contenido personalizado
  const openModal = (content) => {
    setModalContent(content); // Establece el mensaje o contenido a mostrar en el modal
    setIsModalOpen(true); // Cambia el estado para abrir el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false); // Cambia el estado para cerrar el modal
    setModalContent(""); // Limpia el contenido del modal
  };

  // Renderiza el proveedor del contexto
  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children} {/* Permite envolver cualquier componente que necesite acceso al contexto */}
      {isModalOpen && ( // Solo muestra el modal si `isModalOpen` es verdadero
        <div className="modal"> {/* Contenedor principal del modal */}
          <div className="modalContent"> {/* Contenedor del contenido */}
            <span className="close" onClick={closeModal}> {/* Botón para cerrar el modal */}
              &times; {/* Icono de "cerrar" */}
            </span>
            <h3>{modalContent}</h3> {/* Muestra el contenido del modal */}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del modal
export const useModal = () => useContext(ModalContext);
