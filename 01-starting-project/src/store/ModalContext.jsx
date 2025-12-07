// contexts/ModalContext.jsx
import { createContext, useContext, useState } from "react";


export const ModalContext = createContext({
  activeModal: null,
  addItem: (item) => {},
  openCartModal: () => {},
  openCheckoutModal: () => {},
  closeModal: () => {},
  isCartModalOpen: () => {},
  isCheckoutModalOpen: () => {},
});

export function ModalContextProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null); // null | 'cart' | 'checkout'

  const openCartModal = () => setActiveModal("cart");
  const openCheckoutModal = () => setActiveModal("checkout");
  const closeModal = () => setActiveModal(null);

  function isCartModalOpen()
  {
    return activeModal === 'cart';
  }

  function isCheckoutModalOpen()
  {
    return activeModal === 'checkout';
  }

  const modalContext = {
        activeModal: activeModal, 
        openCartModal: openCartModal, 
        openCheckoutModal: openCheckoutModal, 
        closeModal: closeModal,
        isCartModalOpen: isCartModalOpen,
        isCheckoutModalOpen: isCheckoutModalOpen,
  };

  return (
    <ModalContext.Provider
      value={modalContext}
    >
      {children}
    </ModalContext.Provider>
  );
}
