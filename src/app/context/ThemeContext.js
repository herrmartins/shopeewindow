"use client"
import { createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(true);
  return <ThemeContext.Provider  value={theme}>{children}</ThemeContext.Provider>;
};
