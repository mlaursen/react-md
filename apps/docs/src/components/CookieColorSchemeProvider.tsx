"use client";

import { type ColorScheme } from "@react-md/core/theme/types";
import { ColorSchemeProvider } from "@react-md/core/theme/useColorScheme";
import { useColorSchemeProvider } from "@react-md/core/theme/useColorSchemeProvider";
import { type UseStateSetter } from "@react-md/core/types";
import {
  type ReactElement,
  type ReactNode,
  useCallback,
  useState,
} from "react";

import { COLOR_SCHEME_KEY } from "@/constants/cookies.js";
import { setCookie } from "@/utils/clientCookies.js";

export interface CookieColorSchemeProviderProps {
  children: ReactNode;
  defaultColorScheme: ColorScheme;
}

export function CookieColorSchemeProvider(
  props: CookieColorSchemeProviderProps
): ReactElement {
  const { children, defaultColorScheme } = props;

  const [colorScheme, setColorScheme] = useState(defaultColorScheme);
  const value = useColorSchemeProvider({
    colorScheme,
    setColorScheme: useCallback<UseStateSetter<ColorScheme>>((nextOrFn) => {
      setColorScheme((prev) => {
        const next = typeof nextOrFn === "function" ? nextOrFn(prev) : nextOrFn;

        setCookie(COLOR_SCHEME_KEY, next);

        return next;
      });
    }, []),
  });

  return <ColorSchemeProvider value={value}>{children}</ColorSchemeProvider>;
}
