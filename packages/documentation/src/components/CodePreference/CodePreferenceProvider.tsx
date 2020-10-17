import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Cookie from "js-cookie";

import { EventName, sendAnalyticsEvent } from "utils/analytics";

export const CODE_PREFERENCE = "codePref";

/**
 * Should the sandboxes and code preview use TypeScript or Javascript?
 *
 * This should eventually be updated to modify markdown as well. Bit more
 * difficult.
 */
export type CodePreference = "ts" | "js";

export interface CodePreferenceContext {
  pref: CodePreference;
  toggle(): void;
}

const context = createContext<CodePreferenceContext>({
  pref: "ts",
  toggle: () => {
    throw new Error("not implemented");
  },
});

if (process.env.NODE_ENV !== "production") {
  context.displayName = "CodePreferenceContext";
}
const { Provider } = context;

export function useCodePreference(): CodePreferenceContext {
  return useContext(context);
}

export function useJs(): boolean {
  return useCodePreference().pref === "js";
}

export function toCodePreference(pref: string | undefined): CodePreference {
  return pref === "js" ? "js" : "ts";
}

export function getDefaultCodePreference(
  cookies?: Record<string, string | undefined>
): CodePreference {
  if (cookies) {
    return toCodePreference(cookies[CODE_PREFERENCE]);
  }

  if (typeof localStorage !== "undefined") {
    const localPref = localStorage.getItem(CODE_PREFERENCE);
    if (localPref) {
      return toCodePreference(localPref);
    }
  }

  return toCodePreference(Cookie.get(CODE_PREFERENCE));
}

export interface CodePreferenceProviderProps {
  children: ReactNode;
  defaultPreference: CodePreference;
}

export function CodePreferenceProvider({
  children,
  defaultPreference,
}: CodePreferenceProviderProps): ReactElement {
  const [pref, setPref] = useState(defaultPreference);
  const value = useMemo(
    () => ({
      pref,
      toggle() {
        setPref((prev) => (prev === "js" ? "ts" : "js"));
      },
    }),
    [pref]
  );

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const def = getDefaultCodePreference();
      if (def !== pref) {
        Cookie.set(CODE_PREFERENCE, def, { sameSite: "Strict" });
        setPref(def);
      }

      return;
    }

    sendAnalyticsEvent({
      name: EventName.CodePreference,
      lang: pref,
    });
    Cookie.set(CODE_PREFERENCE, pref, { sameSite: "Strict" });
    localStorage.setItem(CODE_PREFERENCE, pref);
  }, [pref]);

  return <Provider value={value}>{children}</Provider>;
}
