"use client";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};