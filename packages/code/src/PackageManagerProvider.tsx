"use client";
import { type UseStateInitializer } from "@react-md/core/types";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

const noop = (): void => {
  // do nothing
};

export type PackageManager = "npm" | "yarn" | "pnpm" | (string & {});

export const DEFAULT_PACKAGE_MANAGERS: readonly PackageManager[] = [
  "npm",
  "pnpm",
  "yarn",
];

export interface PackageManagerContext {
  packageManager: PackageManager;
  packageManagers: readonly PackageManager[];
  setPackageManager(packageManager: PackageManager): void;
}

const context = createContext<PackageManagerContext | null>(null);
context.displayName = "PackageManager";
const { Provider } = context;

export function usePackageManagerContext(): PackageManagerContext {
  const value = useContext(context);
  if (!value) {
    throw new Error("PackageManagerProvider is not mounted");
  }

  return value;
}

export interface PackageManagerProviderProps {
  children: ReactNode;
  defaultValue?: UseStateInitializer<PackageManager>;
  packageManagers?: readonly PackageManager[];
  onPackageManagerChange?(nextPackageManager: PackageManager): void;
}

export function PackageManagerProvider(
  props: PackageManagerProviderProps
): ReactElement {
  const {
    children,
    defaultValue = "npm",
    packageManagers = DEFAULT_PACKAGE_MANAGERS,
    onPackageManagerChange = noop,
  } = props;

  const [packageManager, setPackageManager] = useState(defaultValue);
  const value = useMemo<PackageManagerContext>(
    () => ({
      packageManager,
      packageManagers,
      setPackageManager(nextPackageManager) {
        onPackageManagerChange(nextPackageManager);
        setPackageManager(nextPackageManager);
      },
    }),
    [onPackageManagerChange, packageManager, packageManagers]
  );

  return <Provider value={value}>{children}</Provider>;
}
