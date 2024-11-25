import { createContext, useContext, useState } from "react";
import "./modal.css"

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content); // Establecer el contenido del modal
    setIsModalOpen(true); // Abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setModalContent(""); // Limpia el contenido
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>{modalContent}</h3>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
