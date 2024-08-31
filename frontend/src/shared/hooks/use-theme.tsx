import { useLayoutEffect, useMemo } from "react";
import { ThemeColor, useAppStore } from "../stores/app-store";

interface UseThemeResponse {
  theme: string;
  setTheme: (theme: ThemeColor) => void;
}

export function useTheme(): UseThemeResponse {
  const { theme, setTheme } = useAppStore();

  useLayoutEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  function toggleTheme(theme: ThemeColor) {
    localStorage.setItem("aba-system-app:theme", theme);
    setTheme(theme);
  }

  const value = useMemo(
    () => ({
      theme,
      setTheme: toggleTheme,
    }),
    [theme]
  );

  return value;
}
