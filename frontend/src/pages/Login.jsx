import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { Sparkle } from "../components/Decor";
import usePageTitle from "../hooks/usePageTitle";

const benefits = [
  { emoji: "📦", text: "Track your orders step by step", color: "bg-sky" },
  { emoji: "💖", text: "Save favourites to your wishlist", color: "bg-bubble" },
  { emoji: "⚡", text: "Speedy checkout with saved details", color: "bg-mint" },
];

const Login = () => {
  usePageTitle("Sign in");
  const location = useLocation();
  const redirectUrl = location?.state?.from || "/";

  return (
    <div className="grid items-center gap-12 py-12 lg:grid-cols-2">
      {/* Welcome panel */}
      <div className="relative hidden p-10 border-2 lg:block bg-lemon border-ink rounded-[2rem] shadow-pop-lg">
        <Sparkle className="absolute w-10 h-10 -top-5 right-12 text-bubble animate-float" />
        <p className="text-3xl font-hand -rotate-2">hey there, gorgeous!</p>
        <h1 className="mt-2 text-5xl font-bold leading-tight">Welcome to the Trendify club ✨</h1>
        <ul className="flex flex-col gap-4 mt-10">
          {benefits.map(({ emoji, text, color }) => (
            <li key={text} className="flex items-center gap-4 font-bold">
              <span className={`flex items-center justify-center w-12 h-12 text-xl border-2 rounded-full border-ink ${color}`}>{emoji}</span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <SignIn routing="hash" forceRedirectUrl={redirectUrl} signUpForceRedirectUrl={redirectUrl} />
      </div>
    </div>
  );
};

export default Login;
