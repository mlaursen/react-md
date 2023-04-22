import { useColorScheme } from "@react-md/core";
import dynamic from "next/dynamic";
import type { ReactElement } from "react";
import {
  defaultColorSchemeMode,
  disableDefaultSystemTheme,
} from "src/constants/rmdConfig";

const LightTheme = dynamic(() => import("./LightTheme"));
const DarkTheme = dynamic(() => import("./DarkTheme"));
const SystemTheme = dynamic(() => import("./SystemTheme"));

export function LoadThemeStyles(): ReactElement | null {
  const { colorSchemeMode } = useColorScheme();
  if (
    colorSchemeMode === defaultColorSchemeMode &&
    (colorSchemeMode !== "system" || !disableDefaultSystemTheme)
  ) {
    return null;
  }

  return (
    <>
      {colorSchemeMode === "light" && <LightTheme />}
      {colorSchemeMode === "dark" && <DarkTheme />}
      {colorSchemeMode === "system" && <SystemTheme />}
    </>
  );
}
