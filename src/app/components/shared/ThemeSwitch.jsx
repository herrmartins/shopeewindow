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
      <button onClick={toggleTheme} className="flex items-center gap-2 mt-1">
        {theme === "dark" ? (
          <FaMoon className="text-[14px]" />
        ) : (
          <FaSun className="text-[14px]" />
        )}
      </button>
    </>
  );
};

export default ThemeSwitch;
