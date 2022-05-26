import { useColorScheme } from "@react-md/core";
import dynamic from "next/dynamic";
import type { ReactElement } from "react";
import { defaultColorSchemeMode } from "src/constants";

const LightTheme = dynamic(() => import("./LightTheme"));
const DarkTheme = dynamic(() => import("./DarkTheme"));
const SystemTheme = dynamic(() => import("./SystemTheme"));

export function LoadThemeStyles(): ReactElement | null {
  const { colorSchemeMode } = useColorScheme();
  return (
    <>
      {colorSchemeMode !== defaultColorSchemeMode &&
        colorSchemeMode === "light" && <LightTheme />}
      {colorSchemeMode !== defaultColorSchemeMode &&
        colorSchemeMode === "dark" && <DarkTheme />}
      {colorSchemeMode !== defaultColorSchemeMode &&
        colorSchemeMode === "system" && <SystemTheme />}
    </>
  );
}
