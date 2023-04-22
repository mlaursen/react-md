import type { MaterialIconFamily, MaterialSymbolName } from "@react-md/core";
import { upperFirst } from "lodash";
import { pascalCase } from "src/utils/string";
import type { IconCategoryFilter } from "./MaterialIconsAndSymbolsProvider";
import type {
  IconsByCategory,
  MaterialIconAndSymbolName,
  MaterialIconType,
} from "./metadata";
import { ICON_NAME_FIXES, MATERIAL_ICONS, MATERIAL_SYMBOLS } from "./metadata";

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

export interface MaterialIconComponentNameOptions {
  // use string instead of giant type union to improve performance. I also don't _need_
  // to know it is a MaterialIconAndSymbolName for this to work
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
