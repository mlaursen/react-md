import { type StorageOptions } from "@react-md/core/storage/types";
import { getItemFromStorage } from "@react-md/core/storage/utils";

export type ColorScheme = "light" | "dark" | "light-dark" | "system";

export const COLOR_SCHEMES = [
  "light",
  "dark",
  "light-dark",
  "system",
] satisfies readonly ColorScheme[];

export const COLOR_SCHEME_STORAGE_CONFIG = {
  key: "colorScheme-you",
  defaultValue: "light-dark",
  deserializer: (item) =>
    item === "light" ||
    item === "dark" ||
    item === "light-dark" ||
    item === "system"
      ? item
      : "light-dark",
} satisfies StorageOptions<ColorScheme>;

export function setRootColorScheme(value: ColorScheme): void {
  let colorScheme = "light";
  switch (value) {
    case "dark": {
      colorScheme = "dark";
      break;
    }
    case "light-dark": {
      colorScheme = "light dark";
      break;
    }
    case "system": {
      colorScheme = "initial";
      break;
    }
  }

  document.documentElement.style.colorScheme = colorScheme;
}

export function setInitialColorScheme(): void {
  const value = getItemFromStorage({
    ...COLOR_SCHEME_STORAGE_CONFIG,
    fallback: COLOR_SCHEME_STORAGE_CONFIG.defaultValue,
  });

  setRootColorScheme(value);
}
