import Header from "./components/Header";
import Products from "./components/Products";
import { CartContextProvider } from "./store/CartContext";
import { ModalContextProvider } from "./store/ModalContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ModalContextProvider>
      <CartContextProvider>
        <Toaster position="bottom-right"/>
        <Header />
        <Products />
      </CartContextProvider>
    </ModalContextProvider>
  );
}

export default App;
