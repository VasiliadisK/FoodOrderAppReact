import { useState, createContext } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  increaseQuantity: (id) => {},
  decreaseQuantity: (id) => {},
});

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAddItem({ item, quantity }) {
    var itemExists = false;

    const completeItem = {
      item: item,
      quantity: quantity,
    };

    if (cartItems.length > 0) {
      itemExists = cartItems.find((cartItem) => {
        return cartItem.item.id === item.id;
      });
    }

    if (itemExists) {
      const foundItem = cartItems.map((cartItm) => {
        if (cartItm.item.id === item.id)
          return { ...cartItm, quantity: cartItm.quantity + 1 };
        else return cartItm;
      });

      setCartItems(foundItem);
      itemExists = false;
    } else setCartItems([...cartItems, completeItem]);
  }

  function handleRemoveItem(id) {
    const newCart = cartItems.filter((cartItem) => cartItem.item.id !== id);
    setCartItems(newCart);
  }

  function handleClearCart() {
    setCartItems([]);
  }

  function handleIncreaseQuantity(id) {
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.item.id === id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      } else return cartItem;
    });
    setCartItems(updatedItems);
  }

  function handleDecreaseQuantity(id) {
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.item.id === id) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      } else return cartItem;
    });
    setCartItems(updatedItems);
  }

  const cartContext = {
    items: cartItems,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
    increaseQuantity: handleIncreaseQuantity,
    decreaseQuantity: handleDecreaseQuantity,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
