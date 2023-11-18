"use client";
import { CODE_THEME_KEY } from "@/constants/cookies.js";
import { type PrismTheme } from "@/constants/prismThemes.js";
import { setCookie } from "@/utils/clientCookies.js";
import { PRISM_THEMES_ID, getPrismThemeHref } from "@/utils/prismThemes.js";
import {
  createContext,
  useContext,
  useEffect,
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
  useEffect(() => {
    const stylesheet = document.getElementById(PRISM_THEMES_ID);
    if (!(stylesheet instanceof HTMLLinkElement)) {
      return;
    }

    const nextHref = getPrismThemeHref(prismTheme);
    // stylesheet.href includes full domain
    if (stylesheet.getAttribute("href") === nextHref) {
      return;
    }

    // when changing between themes, clone the current stylesheet as a fallback
    // until the new stylesheet has loaded. without this, there will be a few
    // layout changes with theme -> unstyled -> new theme for slower connections
    const cloned = stylesheet.cloneNode() as HTMLLinkElement;
    cloned.id = `${PRISM_THEMES_ID}-fallback`;
    stylesheet.after(cloned);

    let loaded = false;
    stylesheet.href = nextHref;
    stylesheet.onload = () => {
      loaded = true;
      cloned.remove();
    };

    return () => {
      if (!loaded) {
        cloned.remove();
      }
    };
  }, [prismTheme]);

  return <Provider value={value}>{children}</Provider>;
}
