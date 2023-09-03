"use client";
import { createContext, useContext } from "react";
import type { MaterialIconFamily } from "./material.js";

const context = createContext<MaterialIconFamily>("filled");
context.displayName = "MaterialIcons";

/**
 * **Client Component**
 *
 * @remarks \@since 6.0.0
 */
export const { Provider: MaterialIconsProvider } = context;

/**
 * @remarks \@since 6.0.0
 */
export function useMaterialIconsFamily(
  override?: MaterialIconFamily
): MaterialIconFamily {
  const value = useContext(context);
  return override || value;
}