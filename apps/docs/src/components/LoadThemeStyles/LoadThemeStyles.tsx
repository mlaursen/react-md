"use client";

import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import dynamic from "next/dynamic.js";
import { type ReactElement } from "react";

import { DISABLE_DEFAULT_SYSTEM_THEME } from "@/constants/rmdConfig.jsx";

const LightTheme = dynamic(() => import("./LightTheme.js"));
const DarkTheme = dynamic(() => import("./DarkTheme.js"));
const SystemTheme = dynamic(() => import("./SystemTheme.js"));

export function LoadThemeStyles(): ReactElement | null {
  const { colorScheme } = useColorScheme();
  if (colorScheme === "system" && !DISABLE_DEFAULT_SYSTEM_THEME) {
    return null;
  }

  return (
    <>
      {colorScheme === "light" && <LightTheme />}
      {colorScheme === "dark" && <DarkTheme />}
      {colorScheme === "system" && <SystemTheme />}
    </>
  );
}
