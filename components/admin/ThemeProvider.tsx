"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AdminTheme = "light" | "dark" | "system";

const ThemeContext = createContext<{ theme: AdminTheme; setTheme: (t: AdminTheme) => void }>({
  theme: "system",
  setTheme: () => {},
});

const STORAGE_KEY = "ff-admin-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>("system");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as AdminTheme | null;
      if (saved === "light" || saved === "dark" || saved === "system") setTheme(saved);
    } catch {
      /* no-op */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const apply = (t: AdminTheme) => {
      root.classList.remove("dark");
      const dark =
        t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      if (dark) root.classList.add("dark");
    };
    apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* no-op */
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") apply("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useAdminTheme() {
  return useContext(ThemeContext);
}