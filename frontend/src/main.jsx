import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const publishableKey = (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "").trim();
const signInUrl = import.meta.env.VITE_CLERK_SIGN_IN_URL || "/login";

const root = createRoot(document.getElementById("root"));

// INFO: Style Clerk sign-in / profile widgets to match the store
const clerkAppearance = {
  variables: {
    colorPrimary: "#2D1B3D",
    colorText: "#2D1B3D",
    fontFamily: "Nunito, sans-serif",
    borderRadius: "1rem",
  },
  elements: {
    card: "border-2 border-ink shadow-pop rounded-3xl",
    headerTitle: "font-display",
  },
};

// INFO: Clerk components and hooks are used across the app (navbar, login,
// protected routes), so the app can't render without a valid key.
if (!publishableKey.startsWith("pk_")) {
  root.render(
    <div style={{ fontFamily: "sans-serif", maxWidth: 560, margin: "15vh auto", padding: 16 }}>
      <h1>Configuration required</h1>
      <p>
        Set <code>VITE_CLERK_PUBLISHABLE_KEY</code> in <code>frontend/.env</code> and restart
        the dev server.
      </p>
    </div>
  );
} else {
  root.render(
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl={signInUrl}
      afterSignOutUrl="/"
      appearance={clerkAppearance}
    >
      <BrowserRouter>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </BrowserRouter>
    </ClerkProvider>
  );
}
