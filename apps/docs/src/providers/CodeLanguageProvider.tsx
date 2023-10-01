"use client";
import { CODE_LANGUAGE_KEY } from "@/constants/cookies.js";
import { setCookie } from "@/utils/clientCookies.js";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

export type CodeLanguage = "ts" | "js";

// I'm "Typescript First" (ha) for this
export const CODE_LANGUAGES: readonly CodeLanguage[] = ["ts", "js"];

export interface CodeLanguageContext {
  codeLanguage: CodeLanguage;
  setCodeLanguage(codeLanguage: CodeLanguage): void;
}

const context = createContext<CodeLanguageContext | null>(null);
context.displayName = "CodeLanguage";
const { Provider } = context;

export function useCodeLanguageContext(): CodeLanguageContext {
  const value = useContext(context);
  if (!value) {
    throw new Error();
  }

  return value;
}

export interface CodeLanguageProviderProps {
  children: ReactNode;
  defaultCodeLanguage: CodeLanguage;
}

export function CodeLanguageProvider(
  props: CodeLanguageProviderProps
): ReactElement {
  const { defaultCodeLanguage: defaultTheme, children } = props;
  const [codeLanguage, setCodeLanguage] = useState(defaultTheme);
  const value = useMemo<CodeLanguageContext>(
    () => ({
      codeLanguage,
      setCodeLanguage(nextCodeLanguage) {
        setCookie(CODE_LANGUAGE_KEY, nextCodeLanguage);
        setCodeLanguage(nextCodeLanguage);
      },
    }),
    [codeLanguage]
  );

  return <Provider value={value}>{children}</Provider>;
}