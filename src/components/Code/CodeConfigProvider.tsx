import { useLocalStorage } from "@react-md/core";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { LoadPrismTheme } from "./LoadPrismTheme";
import type { PrismTheme } from "./themes";
import { PRISM_THEMES } from "./themes";

export type ExampleLanguage = "ts" | "js";
export type PackageManager = "npm" | "pnpm" | "yarn";

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
    key: "prismTheme",
    raw: true,
    defaultValue: "default",
    deserializer(item) {
      const theme = item as PrismTheme;
      return PRISM_THEMES.includes(theme) ? theme : "default";
    },
  });
  const { value: language, setValue: setLanguage } =
    useLocalStorage<ExampleLanguage>({
      key: "codeLanguage",
      raw: true,
      defaultValue: "ts",
      deserializer(item) {
        const lang = item as ExampleLanguage;
        return EXAMPLE_LANGUAGES.includes(lang) ? lang : "ts";
      },
    });
  const { value: packageManager, setValue: setPackageManager } =
    useLocalStorage<PackageManager>({
      key: "packageManager",
      raw: true,
      defaultValue: "npm",
      deserializer(item) {
        const packageManager = item as PackageManager;
        return PACKAGE_MANAGERS.includes(packageManager)
          ? packageManager
          : "npm";
      },
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
