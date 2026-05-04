import { useState } from "react";

/*
* useModal: Un hook personalizado para manejar el estado de un modal (abierto/cerrado).
* Proporciona funciones para abrir, cerrar y alternar el estado del modal.
*/

export const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const toggleModal = () => setIsOpen(!isOpen);

    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal
    };
};
