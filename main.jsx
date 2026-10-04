import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

// 1. Safely read the Clerk key with a fallback to an empty string to prevent TypeError on .includes()
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

// 2. Foolproof validation: ensures ClerkProvider only mounts with a valid-looking key
// We trim it to handle accidental spaces in the .env file
const trimmedKey = CLERK_PUBLISHABLE_KEY.trim();
const isClerkConfigured = 
  trimmedKey.startsWith("pk_") && 
  trimmedKey !== "" &&
  !trimmedKey.includes("YOUR_CLERK_PUBLISHABLE_KEY");

const signInUrl = import.meta.env.VITE_CLERK_SIGN_IN_URL || "/login";

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <BrowserRouter>
        <ShopContextProvider>
          {isClerkConfigured ? (
            <ClerkProvider publishableKey={trimmedKey} signInUrl={signInUrl}>
              <App />
            </ClerkProvider>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
              <h2 style={{ color: '#d32f2f' }}>Configuration Required</h2>
              <p>Clerk Publishable Key is missing or invalid.</p>
              <p>Please update <b>frontend/.env</b> and restart the dev server.</p>
            </div>
          )}
        </ShopContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
