import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// INFO: React Router keeps the scroll position between pages; start each page at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
