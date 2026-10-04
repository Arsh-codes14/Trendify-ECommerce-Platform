import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { categoryStyles } from "../theme";
import Title from "../components/Title";
import ProductItem, { productGrid } from "../components/ProductItem";
import ProductsStatus from "../components/ProductsStatus";
import usePageTitle from "../hooks/usePageTitle";

const TYPES = [
  { value: "Topwear", emoji: "👚" },
  { value: "Bottomwear", emoji: "👖" },
  { value: "Winterwear", emoji: "🧥" },
];

// A chunky toggle pill used for filters
const FilterPill = ({ active, activeColor, onClick, children }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`px-4 py-2 rounded-full border-2 border-ink font-display font-semibold text-sm transition-all ${
      active ? `${activeColor} shadow-pop-sm -translate-y-0.5` : "bg-white hover:bg-lemon-light"
    }`}
  >
    {children}
  </button>
);

const Collection = () => {
  usePageTitle("Shop");
  const { products, productsLoading, productsError, search, showSearch, setSearch } =
    useContext(ShopContext);

  // INFO: Filters live in the URL (e.g. ?category=Men&type=Topwear&sort=low-high),
  // so links like "Shop Men" open pre-filtered and the back button works.
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = searchParams.getAll("category");
  const types = searchParams.getAll("type");
  const sort = searchParams.get("sort") || "relevant";

  const toggleParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    const current = next.getAll(key);
    next.delete(key);
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    updated.forEach((item) => next.append(key, item));
    setSearchParams(next, { replace: true });
  };

  const setSort = (value) => {
    const next = new URLSearchParams(searchParams);
    value === "relevant" ? next.delete("sort") : next.set("sort", value);
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
    setSearch("");
  };

  // INFO: Apply search, filters and sorting
  const searchText = showSearch ? search.trim().toLowerCase() : "";
  const filteredProducts = products
    .filter((item) => !searchText || item.name.toLowerCase().includes(searchText))
    .filter((item) => categories.length === 0 || categories.includes(item.category))
    .filter((item) => types.length === 0 || types.includes(item.subCategory));

  if (sort === "low-high") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "high-low") filteredProducts.sort((a, b) => b.price - a.price);
  if (sort === "newest") filteredProducts.sort((a, b) => b.date - a.date);

  const hasFilters = categories.length > 0 || types.length > 0 || searchText;

  return (
    <div className="pt-12">
      <Title
        text1="The"
        text2="shop"
        color="lilac"
        note="go on, treat yourself ♡"
        subtitle={searchText ? `Results for "${search.trim()}"` : "Every style in one place. Filter by vibe and find your new favourite."}
      />

      {/* Filter bar */}
      <div className="flex flex-col gap-4 p-4 mb-10 border-2 sm:p-5 bg-white/70 border-ink rounded-3xl shadow-pop">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-20 text-xs font-extrabold tracking-wider uppercase text-ink/60">Who</span>
          {Object.entries(categoryStyles).map(([category, style]) => (
            <FilterPill
              key={category}
              active={categories.includes(category)}
              activeColor={style.solid}
              onClick={() => toggleParam("category", category)}
            >
              {style.emoji} {category}
            </FilterPill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-20 text-xs font-extrabold tracking-wider uppercase text-ink/60">What</span>
          {TYPES.map((type) => (
            <FilterPill
              key={type.value}
              active={types.includes(type.value)}
              activeColor="bg-mint"
              onClick={() => toggleParam("type", type.value)}
            >
              {type.emoji} {type.value}
            </FilterPill>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-dashed border-ink/20">
          <div className="flex items-center gap-3">
            {!productsLoading && (
              <span className="text-sm sticker bg-lemon normal-case">{filteredProducts.length} goodies</span>
            )}
            {hasFilters && (
              <button onClick={clearFilters} className="inline-flex items-center gap-1 text-sm font-bold underline hover:text-bubble-dark">
                <X size={14} /> Clear all
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 text-sm font-bold bg-white border-2 rounded-full outline-none cursor-pointer border-ink font-display focus:ring-4 focus:ring-bubble/40"
            aria-label="Sort products"
          >
            <option value="relevant">✨ Featured</option>
            <option value="newest">🆕 Newest</option>
            <option value="low-high">💰 Price: low to high</option>
            <option value="high-low">💎 Price: high to low</option>
          </select>
        </div>
      </div>

      <ProductsStatus count={10} />

      {!productsLoading && !productsError && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-6xl">🔍</p>
          <p className="text-2xl font-bold font-display">Nothing here… yet!</p>
          <p className="text-ink/70">Try removing a filter or searching for something else.</p>
          <button onClick={clearFilters} className="btn-outline">Clear filters</button>
        </div>
      )}

      <div className={productGrid}>
        {filteredProducts.map((item) => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
