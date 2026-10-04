import { useEffect } from "react";

// INFO: Sets the browser tab title, e.g. usePageTitle("Cart") -> "Cart | Trendify"
const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | Trendify` : "Trendify | Find What Moves You";
  }, [title]);
};

export default usePageTitle;
