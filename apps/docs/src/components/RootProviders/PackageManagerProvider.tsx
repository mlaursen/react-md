"use client";
import { PACKAGE_MANAGER_KEY } from "@/constants/cookies.js";
import { setCookie } from "@/utils/clientCookies.js";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export type PackageManager = "npm" | "yarn" | "pnpm";

export const PACKAGE_MANAGERS: readonly PackageManager[] = [
  "npm",
  "pnpm",
  "yarn",
];

export interface PackageManagerContext {
  packageManager: PackageManager;
  setPackageManager(packageManager: PackageManager): void;
}

const context = createContext<PackageManagerContext | null>(null);
const { Provider } = context;

export function usePackageManagerContext(): PackageManagerContext {
  const value = useContext(context);
  if (!value) {
    throw new Error();
  }

  return value;
}

export interface PackageManagerProviderProps {
  children: ReactNode;
  defaultPackageManager: PackageManager;
}

export function PackageManagerProvider(
  props: PackageManagerProviderProps
): ReactElement {
  const { defaultPackageManager: defaultTheme, children } = props;
  const [packageManager, setPackageManager] = useState(defaultTheme);
  const value = useMemo<PackageManagerContext>(
    () => ({
      packageManager,
      setPackageManager(nextPackageManager) {
        setCookie(PACKAGE_MANAGER_KEY, nextPackageManager);
        setPackageManager(nextPackageManager);
      },
    }),
    [packageManager]
  );

  return <Provider value={value}>{children}</Provider>;
}
