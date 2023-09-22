"use client";
import { DISABLE_DEFAULT_SYSTEM_THEME } from "@/constants/rmdConfig.jsx";
import { useColorScheme } from "@react-md/core";
import dynamic from "next/dynamic.js";
import { type ReactElement } from "react";

const LightTheme = dynamic(() => import("./LightTheme.js"));
const DarkTheme = dynamic(() => import("./DarkTheme.js"));
const SystemTheme = dynamic(() => import("./SystemTheme.js"));

export function LoadThemeStyles(): ReactElement | null {
  const { colorSchemeMode } = useColorScheme();
  if (colorSchemeMode === "system" && !DISABLE_DEFAULT_SYSTEM_THEME) {
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
