import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem, { productGrid } from "./ProductItem";
import ProductsStatus from "./ProductsStatus";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  // INFO: Newest first, so products added from the admin panel show up here
  const latestProducts = [...products].sort((a, b) => b.date - a.date).slice(0, 10);

  return (
    <section className="py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Title text1="Fresh" text2="drops" color="mint" note="just landed ✿" subtitle="The newest styles in the store, hot off the rack." />
        <Link to="/collection" className="mb-10 btn-outline !py-2 text-sm">
          View all <ArrowRight size={16} />
        </Link>
      </div>

      <ProductsStatus />

      <div className={productGrid}>
        {latestProducts.map((item) => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
