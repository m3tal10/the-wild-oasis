import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const preferredMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    preferredMode,
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("Darkmode context used outside the provider.");

  return context;
}

export default DarkModeProvider;
