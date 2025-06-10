"use client";
import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "@/app/context/ThemeContext";

function ToggleSwitch({ label = "Alternar" }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="flex items-center gap-2 mt-1">
      {theme === "dark" ? <FaMoon className="text-[14px]" /> : <FaSun className="text-[14px]" />}
    </button>
  );
}

export default ToggleSwitch;
