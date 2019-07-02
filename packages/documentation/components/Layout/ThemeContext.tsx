import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
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

const THEME_TRANSITION_DURATION = 150;
function useThemeTransition(isLight: boolean) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    const root = document.documentElement as HTMLElement;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    root.classList.add("toggle-theme-transition");
    // force dom repaint
    root.scrollTop;
    if (isLight) {
      root.classList.add("light-theme");
    } else {
      root.classList.remove("light-theme");
    }

    const timeout = window.setTimeout(() => {
      root.classList.remove("toggle-theme-transition");
    }, THEME_TRANSITION_DURATION);

    return () => {
      window.clearTimeout(timeout);
      root.classList.remove("toggle-theme-transition");
    };
  }, [isLight]);
}

interface ThemeContextProviderProps {
  defaultTheme?: "light" | "dark";
}

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
  defaultTheme,
}) => {
  const [theme, setTheme] = useState(defaultTheme || "dark");
  const toggleTheme = useCallback(
    () => setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark")),
    []
  );

  useEffect(() => {
    Cookie.set("theme", theme);
  }, [theme]);
  useThemeTransition(theme === "light");

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeToggle.Provider value={toggleTheme}>
        {children}
      </ThemeToggle.Provider>
    </ThemeContext.Provider>
  );
};
