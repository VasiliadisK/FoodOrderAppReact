import { CartContext } from "../store/CartContext";
import { useContext, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";
import "../styling/modalStyle.css";
import { ModalContext } from "../store/ModalContext";

export default function CartModal({ onClose }) {
  const { items, removeItem, clearCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const { activeModal, openCheckoutModal } = useContext(ModalContext);
  function handleRemoveItem(item) {
    removeItem(item.id);
  }

  function handleClearCart() {
    clearCart();
  }

  function handleIncreaseQuantity(item) {
    increaseQuantity(item.id);
  }

  function handleDecreaseQuantity(item) {
    decreaseQuantity(item.id);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const total = items.reduce(
    (sum, cartItem) => sum + Number(cartItem.item.price) * cartItem.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center cart-modal-overlay">
      <div
        className="fixed inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      ></div>

      <div className="relative bg-stone-800 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col z-10 border border-stone-700 cart-modal-content">
        <div className="p-6 border-b border-stone-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-yellow-500 text-2xl transition-colors"
          >
            ✕
          </button>
          <h1 className="text-3xl font-bold text-yellow-500 text-center">
            YOUR CART
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Your cart is empty</p>
              <p className="text-gray-500 text-sm mt-2">
                Add some delicious items to get started!
              </p>
            </div>
          )}

          {items.length > 0 && (
            <div className="space-y-4">
              {items.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="bg-stone-900 rounded-lg p-4 border border-stone-700 hover:border-stone-600 transition-colors"
                >
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {cartItem.item.name}
                      </h3>
                      <p className="text-yellow-500 font-bold">
                        ${Number(cartItem.item.price).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-col md:flex-row">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleIncreaseQuantity(cartItem.item)}
                          className="bg-stone-700 hover:bg-stone-600 text-yellow-500 font-bold w-8 h-8 rounded-lg transition-colors flex items-center justify-center btn-press btn-press-stone"
                        >
                          +
                        </button>
                        <input
                          type="number"
                          value={cartItem.quantity}
                          readOnly
                          disabled
                          className="bg-stone-700 text-white text-center w-16 h-10 rounded-lg border border-stone-600 focus:outline-none focus:border-yellow-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min={1}
                        />
                        <button
                          disabled={cartItem.quantity <= 1}
                          onClick={() => handleDecreaseQuantity(cartItem.item)}
                          className={`bg-stone-700 text-yellow-500 font-bold w-8 h-8 rounded-lg flex items-center justify-center btn-press btn-press-stone ${
                            cartItem.quantity > 1
                              ? " hover:bg-stone-600 transition-colors"
                              : ""
                          }`}
                        >
                          -
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(cartItem.item)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium btn-press btn-press-red"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-stone-700 bg-stone-900">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-300">
                Total:
              </span>
              <span className="text-2xl font-bold text-yellow-500">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleClearCart}
                className="flex-1 flex items-center justify-center gap-2 bg-stone-700 hover:bg-stone-600 text-white py-3 rounded-lg transition-colors font-medium btn-press btn-press-stone"
              >
                <FaTrashCan />
                <p className="text-2xl">Clear Cart</p>
              </button>
              <button
                onClick={openCheckoutModal}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-stone-900 py-3 rounded-lg transition-colors font-bold flex items-center justify-center gap-2 btn-press btn-press-yellow"
              >
                <p className="text-2xl">Checkout</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
