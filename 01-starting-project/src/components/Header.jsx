import logo from "../assets/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "./CartModal";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { ModalContext} from "../store/ModalContext";
import CheckoutModal from "./CheckOutModal";


export default function Header() {

  const { activeModal,openCartModal,closeModal, isCartModalOpen, isCheckoutModalOpen } = useContext(ModalContext);
  const { items } = useContext(CartContext);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  function handleModalOpen() {
    openCartModal();
  }
  return (
    <header className="flex justify-between">
      <div className="flex w-20 gap-4 pt-4 items-center">
        <img src={logo} alt="logo" className="rounded-full" />
        <h1>Foodio</h1>
      </div>
      <button
        className="relative flex items-center gap-1 text-yellow-500 hover:text-yellow-400 mr-6"
        onClick={handleModalOpen}
      >
        <h2 className="hidden md:block">Cart</h2>
        <FaShoppingCart className="w-6 h-6" />

        {totalItems > 0 && (
          <span className="absolute top-5 -right-4 bg-yellow-700 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
      {isCartModalOpen() && (
        <CartModal isOpen={isCartModalOpen()} onClose={() => closeModal()}/>
      )}

      {isCheckoutModalOpen() && (
        <CheckoutModal isOpen={isCheckoutModalOpen()} onClose={() => closeModal()}/>
      )}
    </header>
  );
}
