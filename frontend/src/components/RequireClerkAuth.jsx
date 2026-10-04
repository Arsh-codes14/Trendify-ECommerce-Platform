import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

/**
 * Protects a route using Clerk auth.
 * - Signed out: redirects to /login and preserves original route in state
 * - Signed in: renders children
 */
const RequireClerkAuth = ({ children }) => {
  const location = useLocation();
  const { isLoaded, isSignedIn } = useAuth();

  // Preserve exact requested path so /login can redirect back after auth.
  const from = location.pathname + location.search;

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/login" replace state={{ from }} />;
  }

  return children;
};

export default RequireClerkAuth;
