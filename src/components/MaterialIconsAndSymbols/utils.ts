import type { MaterialIconFamily, MaterialSymbolName } from "@react-md/core";
import { upperFirst } from "lodash";
import { pascalCase } from "src/utils/string";

import type {
  IconsByCategory,
  MaterialIconAndSymbolName,
  MaterialIconType,
} from "./metadata";
import { ICON_NAME_FIXES, MATERIAL_ICONS, MATERIAL_SYMBOLS } from "./metadata";
import type { IconCategoryFilter } from "./useMaterialState";

export function getCategoryName(category: string): string {
  if (category.includes("&")) {
    return category
      .split("&")
      .map((part) => upperFirst(part))
      .join(" & ");
  }

  if (category.includes(" ")) {
    return category
      .split(" ")
      .map((part) => (part === "ui" ? part.toUpperCase() : upperFirst(part)))
      .join(" ");
  }

  return upperFirst(category);
}

export function isMaterialSymbol(
  iconName: MaterialIconAndSymbolName,
  iconType: MaterialIconType
): iconName is MaterialSymbolName {
  return iconType === "symbol";
}

export interface IconsByCategoryOptions {
  iconType: MaterialIconType;
  iconFamily: MaterialIconFamily;
  iconCategory: IconCategoryFilter;
}

export function getIconsByCategory(
  options: IconsByCategoryOptions
): IconsByCategory {
  const { iconType, iconFamily, iconCategory } = options;

  let iconsByCategory = (
    iconType === "icon" ? MATERIAL_ICONS : MATERIAL_SYMBOLS
  )[iconFamily];

  if (iconCategory) {
    iconsByCategory = {
      [iconCategory]: iconsByCategory[iconCategory],
    };
  }

  return iconsByCategory;
}

export function getSymbolFontHref(type: string): string {
  const name = upperFirst(type);

  return `https://fonts.googleapis.com/css2?family=Material+Symbols+${name}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`;
}

export function getIconFontName(type: MaterialIconFamily): string {
  switch (type) {
    case "two-tone":
      return "Two Tone";
    case "rounded":
      return "Round";
    case "filled":
      return "";
    default:
      return upperFirst(type);
  }
}

export function getIconFontHref(type: MaterialIconFamily): string {
  const name = getIconFontName(type).replace(/ /, "+");
  const suffix = name ? `+${name}` : "";

  return `https://fonts.googleapis.com/icon?family=Material+Icons${suffix}`;
}

export interface MaterialIconComponentNameOptions {
  // use string instead of giant type union to improve performance. I also don't _need_
  // to know it is a MaterialIconAndSymbolName for this ti work
  iconName: string;
  iconFamily: MaterialIconFamily;
}

export function getMaterialIconComponentName(
  options: MaterialIconComponentNameOptions
): string {
  const { iconFamily } = options;

  const iconName = ICON_NAME_FIXES[options.iconName] || options.iconName;
  const suffix = `${iconFamily === "filled" ? "" : `_${iconFamily}`}_icon`;

  return pascalCase(`${iconName}${suffix}`);
}
