import Header from "./components/Header";
import Products from "./components/Products";
import { CartContextProvider } from "./store/CartContext";
import { ModalContextProvider } from "./store/ModalContext";

function App() {
  return (
    <ModalContextProvider>
      <CartContextProvider>
          <Header />
          <Products />
      </CartContextProvider>
    </ModalContextProvider>
  );
}

export default App;
