"use client";
import { COLOR_SCHEME_KEY } from "@/constants/cookies.js";
import { setCookie } from "@/utils/clientCookies.js";
import { type ColorSchemeMode } from "@react-md/core/theme/types";
import { ColorSchemeProvider } from "@react-md/core/theme/useColorScheme";
import { useColorSchemeProvider } from "@react-md/core/theme/useColorSchemeProvider";
import { type UseStateSetter } from "@react-md/core/types";
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
    setColorSchemeMode: useCallback<UseStateSetter<ColorSchemeMode>>(
      (nextOrFn) => {
        setColorSchemeMode((prev) => {
          const next =
            typeof nextOrFn === "function" ? nextOrFn(prev) : nextOrFn;

          setCookie(COLOR_SCHEME_KEY, next);

          return next;
        });
      },
      []
    ),
  });

  return <ColorSchemeProvider value={value}>{children}</ColorSchemeProvider>;
}
