import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const getInitialDark = () => {
  try {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  } catch (e) {
    // ignore localStorage errors
  }
  return false;
};

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // use DOM as source of truth if script already set it
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") || getInitialDark();
    }
    return getInitialDark();
  });

  // keep DOM and localStorage in sync
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((s) => !s);

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        // visible everywhere, positioned bottom-right on mobile, top-right on desktop
        "fixed z-50 rounded-full transition-all duration-200 focus:outline-none",
        "p-3 sm:p-2",
        // mobile: bottom-right; desktop: top-right
        "bottom-4 right-4 sm:top-5 sm:right-5 sm:bottom-auto",
        // adaptive background and subtle blur for readability
        "bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm shadow-md hover:scale-105"
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-400" />
      ) : (
        <Moon className="h-6 w-6 text-slate-900 dark:text-slate-100" />
      )}
    </button>
  );
};
