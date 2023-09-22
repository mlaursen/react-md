"use client";
import { COLOR_SCHEME_KEY } from "@/constants/cookies.js";
import { setCookie } from "@/utils/clientCookies.js";
import {
  ColorSchemeProvider,
  useColorSchemeProvider,
  type ColorSchemeMode,
} from "@react-md/core";
import {
  useCallback,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

export interface CookieColorSchemeProviderProps {
  children: ReactNode;
  defaultColorSchemeMode: ColorSchemeMode;
}

export function CookieColorSchemeProvider(
  props: CookieColorSchemeProviderProps
): ReactElement {
  const { children, defaultColorSchemeMode } = props;

  const [colorSchemeMode, setColorSchemeMode] = useState(
    defaultColorSchemeMode
  );
  const value = useColorSchemeProvider({
    colorSchemeMode,
    setColorSchemeMode: useCallback((nextOrFn) => {
      setColorSchemeMode((prev) => {
        const next = typeof nextOrFn === "function" ? nextOrFn(prev) : nextOrFn;

        setCookie(COLOR_SCHEME_KEY, next);

        return next;
      });
    }, []),
  });

  return <ColorSchemeProvider value={value}>{children}</ColorSchemeProvider>;
}
