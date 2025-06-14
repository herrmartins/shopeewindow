"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={toggleTheme}
        className="mt-1 inline-flex items-center justify-center w-8 h-8 rounded-full
               text-neutral-700 dark:text-neutral-300
               hover:bg-neutral-200 dark:hover:bg-neutral-700
               transition-colors duration-200"
        aria-label="Alternar tema"
        title="Alternar tema"
      >
        {theme === "dark" ? (
          <FaMoon className="w-4 h-4" />
        ) : (
          <FaSun className="w-4 h-4" />
        )}
      </button>
    </>
  );
};

export default ThemeSwitch;
