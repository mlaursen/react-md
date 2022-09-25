import { useLocalStorage } from "@react-md/core";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { LoadPrismTheme } from "./LoadPrismTheme";
import type { PrismTheme } from "./themes";
import { PRISM_THEMES } from "./themes";

export type ExampleLanguage = "ts" | "js";
export type PackageManager = "npm" | "pnpm" | "yarn";

export const PRISM_THEME_KEY = "prismTheme";
export const CODE_LANGUAGE_KEY = "codeLanguage";
export const PACKAGE_MANAGER_KEY = "packageManager";

export const EXAMPLE_LANGUAGES: readonly ExampleLanguage[] = ["ts", "js"];
export const PACKAGE_MANAGERS: readonly PackageManager[] = [
  "npm",
  "pnpm",
  "yarn",
];

export interface CodeConfig {
  theme: PrismTheme;
  language: ExampleLanguage;
  packageManager: PackageManager;
}

export interface CodeConfigContext extends CodeConfig {
  setTheme(theme: PrismTheme): void;
  setLanguage(language: ExampleLanguage): void;
  setPackageManager(packageManager: PackageManager): void;
}

const context = createContext<CodeConfigContext | undefined>(undefined);
const { Provider } = context;
context.displayName = "CodeConfig";

export function useCodeConfig(): Readonly<CodeConfigContext> {
  const config = useContext(context);
  if (!config) {
    throw new Error();
  }

  return config;
}

export interface CodeConfigProviderProps {
  children: ReactNode;
}

export function deserializePrismTheme(item: unknown): PrismTheme {
  const theme = item as PrismTheme;
  return PRISM_THEMES.includes(theme) ? theme : "default";
}

export function deserializeCodeLanguage(item: unknown): ExampleLanguage {
  const lang = item as ExampleLanguage;
  return EXAMPLE_LANGUAGES.includes(lang) ? lang : "ts";
}

export function deserializePackageManager(item: unknown): PackageManager {
  const packageManager = item as PackageManager;
  return PACKAGE_MANAGERS.includes(packageManager) ? packageManager : "npm";
}

export function CodeConfigProvider({
  children,
}: CodeConfigProviderProps): ReactElement {
  // Ideally....
  // const { value: theme, setValue: setTheme } = useCookieOrLocalStorage<PrismTheme>({
  //   key: "prismTheme",
  //   defaultValue: "default",
  //   deserializer(item) {
  //     const theme = item as PrismTheme;
  //     return PRISM_THEMES.includes(theme) ? theme : "default";
  //   },
  // });
  //
  // ...etc

  const { value: theme, setValue: setTheme } = useLocalStorage<PrismTheme>({
    key: PRISM_THEME_KEY,
    raw: true,
    defaultValue: "default",
    deserializer: deserializePrismTheme,
  });
  const { value: language, setValue: setLanguage } =
    useLocalStorage<ExampleLanguage>({
      key: CODE_LANGUAGE_KEY,
      raw: true,
      defaultValue: "ts",
      deserializer: deserializeCodeLanguage,
    });
  const { value: packageManager, setValue: setPackageManager } =
    useLocalStorage<PackageManager>({
      key: PACKAGE_MANAGER_KEY,
      raw: true,
      defaultValue: "npm",
      deserializer: deserializePackageManager,
    });

  const value = useMemo<CodeConfigContext>(() => {
    return {
      theme,
      language,
      packageManager,
      setTheme,
      setLanguage,
      setPackageManager,
    };
  }, [
    language,
    packageManager,
    setLanguage,
    setPackageManager,
    setTheme,
    theme,
  ]);

  return (
    <Provider value={value}>
      {children}
      <LoadPrismTheme />
    </Provider>
  );
}
