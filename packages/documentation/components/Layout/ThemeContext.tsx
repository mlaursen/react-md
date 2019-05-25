import {
  createContext,
  useContext,
  FC,
  useState,
  useCallback,
  useRef,
} from "react";
import Cookie from "js-cookie";

const ThemeContext = createContext("dark");
const ThemeToggle = createContext(() => {});

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function useThemeToggle() {
  return useContext(ThemeToggle);
}

interface ThemeContextProviderProps {
  defaultTheme?: "light" | "dark";
}

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
  defaultTheme,
}) => {
  const [theme, setTheme] = useState(defaultTheme || "dark");
  const prevTheme = useRef(theme);
  const toggleTheme = useCallback(
    () => setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark")),
    []
  );

  if (theme !== prevTheme.current) {
    prevTheme.current = theme;
    Cookie.set("theme", theme);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeToggle.Provider value={toggleTheme}>
        {children}
      </ThemeToggle.Provider>
    </ThemeContext.Provider>
  );
};
