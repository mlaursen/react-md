import { useColorScheme } from "@react-md/core";
import dynamic from "next/dynamic";
import { ReactElement } from "react";

const DarkTheme = dynamic(() => import("./DarkTheme"));
const LightTheme = dynamic(() => import("./LightTheme"));

export function LoadThemeStyles(): ReactElement | null {
  const { colorSchemeMode } = useColorScheme();
  return (
    <>
      {colorSchemeMode === "light" && <LightTheme />}
      {colorSchemeMode === "dark" && <DarkTheme />}
    </>
  );
}
