import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

export const backendUrl = (
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
).replace(/\/$/, "");

// INFO: Must match the backend (controllers/orderController.js)
export const DELIVERY_FEE = 99;
export const FREE_SHIPPING_THRESHOLD = 1999;

// INFO: Seeded products store relative image paths served by the backend;
// admin uploads are absolute Supabase Storage URLs.
const resolveImage = (src) =>
  typeof src === "string" && src.startsWith("/") ? `${backendUrl}${src}` : src;

const normalizeProduct = (product) => ({
  ...product,
  image: (product.image || []).map(resolveImage),
});

const loadFromStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => loadFromStorage("cartItems", {}));
  const [wishlist, setWishlist] = useState(() => loadFromStorage("wishlist", []));
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const navigate = useNavigate();

  const currency = "₹";

  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);

  const getProductsData = useCallback(async () => {
    setProductsLoading(true);
    setProductsError("");
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products.map(normalizeProduct));
      } else {
        setProductsError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setProductsError("We couldn't load products. Please check your connection and try again.");
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  // INFO: Persist cart and wishlist in the browser
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    // INFO: Drop cart and wishlist entries for products that no longer exist
    if (productsLoading || productsError) return;
    const validIds = new Set(products.map((product) => product._id));
    setCartItems((prev) =>
      Object.fromEntries(Object.entries(prev).filter(([id]) => validIds.has(id)))
    );
    setWishlist((prev) => prev.filter((id) => validIds.has(id)));
  }, [products, productsLoading, productsError]);

  // ---------- Cart ----------

  const addToCart = (itemId, size, quantity = 1) => {
    if (!size) {
      toast.error("Please select a size");
      return false;
    }

    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      cartData[itemId] = cartData[itemId] || {};
      cartData[itemId][size] = (cartData[itemId][size] || 0) + quantity;
      return cartData;
    });
    toast.success("Added to your bag");
    return true;
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      if (quantity <= 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
      } else {
        cartData[itemId][size] = quantity;
      }
      return cartData;
    });
  };

  const clearCart = () => setCartItems({});

  // INFO: Flat list of cart lines joined with product details
  const getCartLines = () => {
    const lines = [];
    for (const productId in cartItems) {
      const product = products.find((item) => item._id === productId);
      if (!product) continue;
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) lines.push({ product, size, quantity });
      }
    }
    return lines;
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce(
      (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
      0
    );

  const getCartAmount = () =>
    getCartLines().reduce((total, line) => total + line.product.price * line.quantity, 0);

  const getDeliveryFee = () => {
    const subtotal = getCartAmount();
    if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    return DELIVERY_FEE;
  };

  // ---------- Wishlist ----------

  const isInWishlist = (productId) => wishlist.includes(productId);

  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      toast.info("Removed from wishlist");
    } else {
      setWishlist((prev) => [...prev, productId]);
      toast.success("Saved to wishlist");
    }
  };

  const value = {
    products,
    productsLoading,
    productsError,
    getProductsData,
    backendUrl,
    resolveImage,
    currency,
    formatINR,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    clearCart,
    getCartLines,
    getCartCount,
    getCartAmount,
    getDeliveryFee,
    wishlist,
    isInWishlist,
    toggleWishlist,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
