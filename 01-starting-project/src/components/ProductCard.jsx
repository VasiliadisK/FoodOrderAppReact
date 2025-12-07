import { CartContext } from "../store/CartContext";
import { useContext } from "react";

export default function ProductCard({ product }) {

  const {addItem} = useContext(CartContext);

  function handleAddItem(item)
  {
    addItem({item, quantity: 1});
  }
  return (
    <li
      key={product.id}
      className="text-white rounded-lg border border-none overflow-hidden transition-colors duration-200 flex flex-col h-full"
    >
      {product.image && (
        <div className="w-full h-72 bg-gray-100 flex-shrink-0">
          <img
            src={`/api/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 bg-stone-700 flex-grow flex flex-col">
        {product.name && (
          <h3 className="text-lg font-semibold mb-2 text-center">
            {product.name}
          </h3>
        )}
        {product.price ? (
          <div className="flex justify-center my-3">
            <h3 className="inline-block px-4 py-2 border-2 border-none bg-stone-900 text-yellow-500 rounded">
              {product.price} $
            </h3>
          </div>
        ) : (
          <h3>Sold out</h3>
        )}
        {product.description && (
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
            {product.description}
          </p>
        )}

        <button onClick={() => handleAddItem(product)} className="btn-press btn-press-yellow w-full mt-auto px-4 py-3 bg-yellow-500 text-stone-900 font-semibold rounded hover:bg-yellow-400 transition-colors duration-200">
          Add to cart
        </button>
      </div>
    </li>
  );
}
