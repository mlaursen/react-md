"use client";

import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CODE_THEME_KEY } from "@/constants/cookies.js";
import { type PrismTheme } from "@/constants/prismThemes.js";
import { setCookie } from "@/utils/clientCookies.js";
import { PRISM_THEMES_ID, getPrismThemeHref } from "@/utils/prismThemes.js";

export interface PrismThemeContext {
  prismTheme: PrismTheme;
  setPrismTheme: (theme: PrismTheme) => void;
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

    // make the prism theme transition nicer by preventing layout shifts by
    // preserving the current theme styles until the next stylesheet has been
    // loaded. so:
    // - update the current stylesheet's id to have `-fallback` suffix
    // - create the next stylesheet link
    // - add a load event that removes the previous stylesheet from the dom so
    //   only the latest stylesheet is active
    // - insert the next stylesheet after the current stylesheet to begin the
    //   transition
    //
    // Note: I used to do create a clone of the current stylesheet to use as a
    // fallback until the new stylesheet was loaded, but it doesn't look like
    // chrome fires the onload event again when the href changes
    let loaded = false;
    const nextStylesheet = document.createElement("link");
    nextStylesheet.id = PRISM_THEMES_ID;
    nextStylesheet.rel = "stylesheet";
    nextStylesheet.href = nextHref;
    nextStylesheet.onload = () => {
      loaded = true;
      stylesheet.remove();
    };
    stylesheet.id = `${PRISM_THEMES_ID}-fallback`;
    stylesheet.after(nextStylesheet);

    return () => {
      if (!loaded) {
        stylesheet.remove();
      }
    };
  }, [prismTheme]);

  return <Provider value={value}>{children}</Provider>;
}
