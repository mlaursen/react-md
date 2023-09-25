"use client";
import { CODE_THEME_KEY } from "@/constants/cookies.js";
import { type PrismTheme } from "@/prism-themes/themes.js";
import { setCookie } from "@/utils/clientCookies.js";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

export interface PrismThemeContext {
  prismTheme: PrismTheme;
  setPrismTheme(theme: PrismTheme): void;
}

const context = createContext<PrismThemeContext | null>(null);
context.displayName = "Prism";
const { Provider } = context;

export function usePrismThemeContext(): PrismThemeContext {
  const value = useContext(context);
  if (!value) {
    throw new Error();
  }

  return value;
}

export interface PrismThemeProviderProps {
  children: ReactNode;
  defaultPrismTheme: PrismTheme;
}

export function PrismThemeProvider(
  props: PrismThemeProviderProps
): ReactElement {
  const { defaultPrismTheme: defaultTheme, children } = props;
  const [prismTheme, setPrismTheme] = useState(defaultTheme);
  const value = useMemo<PrismThemeContext>(
    () => ({
      prismTheme,
      setPrismTheme(nextTheme) {
        setCookie(CODE_THEME_KEY, nextTheme);
        setPrismTheme(nextTheme);
      },
    }),
    [prismTheme]
  );

  return <Provider value={value}>{children}</Provider>;
}
