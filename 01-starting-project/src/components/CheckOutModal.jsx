import { CartContext } from "../store/CartContext";
import { useContext, useEffect, useState } from "react";
import "../styling/modalStyle.css";
import { useForm, FormProvider } from "react-hook-form";
import FormTextInput from "./FormTextInput";
import { StoreOrderToBackend } from "../http/StoreOrderToBackend";
import toast from "react-hot-toast";

export default function CheckoutModal({ onClose }) {
  const { items, clearCart } = useContext(CartContext);
  const [errors, setErrors] = useState();

  const methods = useForm();

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  async function onSubmit(data) {
    const orderData = {
      customer: {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        street: data.address,
        "postal-code": data.postalCode,
        city: data.city,
      },
      items: items.map((cartItem) => ({
        id: cartItem.item.id,
        name: cartItem.item.name,
        price: cartItem.item.price,
        quantity: cartItem.quantity,
      })),
    };
    
    try {
      const status = await StoreOrderToBackend(orderData);
      onClose();
      clearCart();
      toast.success("Your order was submitted successfully");
    } catch (e) {
      onClose();
      toast.error("Something went wrong while processing your order, please try again later");
      clearCart();
    }
  }

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

      <div className="relative bg-stone-800 rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col z-10 border border-stone-700 cart-modal-content">
        <div className="p-6 border-b border-stone-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-yellow-500 text-2xl transition-colors"
          >
            ✕
          </button>
          <h1 className="text-3xl font-bold text-yellow-500 text-center">
            CHECKOUT
          </h1>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-yellow-500 mb-4">
                    YOUR INFORMATION
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormTextInput
                        inputLabel="First Name"
                        inputKey="firstName"
                        inputMaxLength={20}
                        inputMinLength={5}
                        pattern={/^[A-Za-z]+$/i}
                        patternMessage="Only Characters are allowed"
                      />

                      <FormTextInput
                        inputLabel="Last Name"
                        inputKey="lastName"
                        inputMaxLength={20}
                        inputMinLength={5}
                        pattern={/^[A-Za-z]+$/i}
                        patternMessage="Only Characters are allowed"
                      />
                    </div>

                    <FormTextInput
                      inputLabel="Email"
                      inputKey="email"
                      pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                      patternMessage="Invalid email address"
                      placeholder="your.email@example.com"
                    />

                    <FormTextInput
                      inputLabel="Phone"
                      inputKey="phone"
                      pattern={/^[0-9\s\-\+\(\)]+$/}
                      patternMessage="Invalid phone number"
                      placeholder="6923109218"
                    />

                    <FormTextInput
                      inputLabel="Street Address"
                      inputKey="address"
                      placeholder="123 Main Street"
                    />

                    <FormTextInput
                      inputLabel="City"
                      inputKey="city"
                      placeholder="Thessaloniki"
                    />

                    <FormTextInput
                      inputLabel="Postal Code"
                      inputKey="postalCode"
                      placeholder="10001"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-yellow-500 mb-4">
                    ORDER SUMMARY
                  </h2>
                  <div className="bg-stone-700 rounded-lg p-4 space-y-3">
                    {items.map((cartItem) => (
                      <div
                        key={cartItem.item.id}
                        className="flex justify-between items-center text-gray-300 pb-2 border-b border-stone-600"
                      >
                        <div>
                          <p className="font-medium">{cartItem.item.name}</p>
                          <p className="text-sm text-gray-400">
                            Qty: {cartItem.quantity} × $
                            {Number(cartItem.item.price).toFixed(2)}
                          </p>
                        </div>
                        <p className="font-semibold">
                          $
                          {(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}

                    <div className="pt-3 border-t-2 border-yellow-500">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-yellow-500">Total:</span>
                        <span className="text-yellow-500">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-stone-700 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-stone-700 text-white rounded-lg hover:bg-stone-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-yellow-500 text-stone-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Place Order
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
      {errors && (
        <div className="flex justify-center items-center py-20 px-4">
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 max-w-2xl">
            <h1 className="text-xl text-red-400 font-semibold text-center">
              Something went wrong1
            </h1>
            <p className="text-red-300 text-center mt-2">{errors}</p>
          </div>
        </div>
      )}
    </div>
  );
}
