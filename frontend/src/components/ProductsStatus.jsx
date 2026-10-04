import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { productGrid } from "./ProductItem";

// INFO: Renders a skeleton grid while products load, or an error with retry.
// Returns null once products are available so callers can render normally.
const ProductsStatus = ({ count = 10 }) => {
  const { productsLoading, productsError, getProductsData } = useContext(ShopContext);

  if (productsLoading) {
    return (
      <div className={productGrid}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="p-2 border-2 border-ink/20 rounded-3xl bg-lilac-light">
              <div className="w-full bg-white rounded-2xl aspect-[13/15]" />
            </div>
            <div className="w-1/3 h-2.5 mt-4 rounded-full bg-ink/10" />
            <div className="w-3/4 h-3 mt-2 rounded-full bg-ink/10" />
            <div className="w-1/4 h-3 mt-2 rounded-full bg-ink/10" />
          </div>
        ))}
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-5xl">😵‍💫</p>
        <p className="font-semibold">{productsError}</p>
        <button onClick={getProductsData} className="btn-primary">
          Try again
        </button>
      </div>
    );
  }

  return null;
};

export default ProductsStatus;
