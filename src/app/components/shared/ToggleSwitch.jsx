"use client";
import React, { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { ThemeContext } from "@/app/context/ThemeContext";

function ToggleSwitch({ label = "Alternar" }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}>
      <FaMoon className="text-[14px]" />
      <span>{theme}</span>
    </button>
  );
}

export default ToggleSwitch;
