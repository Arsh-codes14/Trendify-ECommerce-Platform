import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem, { productGrid } from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const bestSellers = products.filter((item) => item.bestSeller).slice(0, 5);

  if (bestSellers.length === 0) return null;

  return (
    <section id="bestsellers" className="py-14 scroll-mt-28">
      <Title
        text1="Crowd"
        text2="favourites"
        color="lemon"
        note="everyone's obsessed"
        subtitle="Our most-loved pieces, picked again and again by shoppers."
      />
      <div className={productGrid}>
        {bestSellers.map((item) => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
