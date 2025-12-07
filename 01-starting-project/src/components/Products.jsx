import { useEffect, useState } from "react";
import { FetchProductData } from "../http/FetchProductData";
import ProductCard from "./ProductCard";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    async function FetchProducts() {
      setIsFetching(true);
      try {
        const data = await FetchProductData();
        setProducts(data);
      } catch (e) {
        setErrors(
          e.message || "Something went wrong and couldn't fetch products"
        );
      } finally {
        setIsFetching(false);
      }
    }

    FetchProducts();
  }, []);
  return (
    <section className="min-h-screen bg-stone-900 py-8">
      {isFetching && (
        <div className="flex justify-center items-center py-20">
          <h2 className="text-2xl text-yellow-500 font-semibold animate-pulse">
            Fetching meals...
          </h2>
        </div>
      )}

      {products.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}

      {errors && (
        <div className="flex justify-center items-center py-20 px-4">
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 max-w-2xl">
            <h1 className="text-xl text-red-400 font-semibold text-center">
              Something went wrong
            </h1>
            <p className="text-red-300 text-center mt-2">{errors}</p>
          </div>
        </div>
      )}
    </section>
  );
}
