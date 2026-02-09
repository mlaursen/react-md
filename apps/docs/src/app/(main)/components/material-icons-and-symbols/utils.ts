import {
  type MaterialIconFamily,
  type MaterialSymbolName,
} from "@react-md/core/icon/material";
import { type MaterialSymbolConfiguration } from "@react-md/core/icon/materialConfig";

import { pascalCase, upperFirst } from "@/utils/strings.js";

import {
  ICON_NAME_FIXES,
  type IconsByCategory,
  MATERIAL_ICONS,
  MATERIAL_SYMBOLS,
  type MaterialIconAndSymbolName,
} from "./metadata.js";
import { isMaterialIconType } from "./searchParams.js";
import { type IconCategoryFilter, type IconType } from "./types.js";

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
  iconType: IconType
): iconName is MaterialSymbolName {
  return iconType === "symbol";
}

export interface IconsByCategoryOptions {
  iconType: IconType;
  iconFamily: MaterialIconFamily;
  iconCategory: IconCategoryFilter;
}

export function getIconsByCategory(
  options: IconsByCategoryOptions
): IconsByCategory {
  const { iconType, iconFamily, iconCategory } = options;

  const icon = MATERIAL_ICONS[iconFamily];
  const symbol = MATERIAL_SYMBOLS[iconFamily];
  let iconsByCategory = isMaterialIconType(iconType) ? icon : symbol;
  // TODO: Revert this (?) once the swc minifier no longer considers this
  // "dead code" for the `MATERIAL_SYMBOLS` and `MATERIAL_ICONS` constants.
  // let iconsByCategory = (
  //   iconType === "icon" ? MATERIAL_ICONS : MATERIAL_SYMBOLS
  // )[iconFamily];

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

interface FontStylesheetOptions {
  iconType: IconType;
  iconFamily: MaterialIconFamily;
}

export function getFontStylesheet(options: FontStylesheetOptions): string {
  const { iconType, iconFamily } = options;

  let familyName = iconFamily
    .split("-")
    .map((part) => upperFirst(part))
    .join("+");

  if (familyName === "Rounded") {
    familyName = "Round";
  } else if (familyName === "Filled") {
    familyName = "";
  }

  const name = upperFirst(iconType.split("-")[0]);
  const suffix = `${name}s${familyName ? `+${familyName}` : ""}`;

  return `https://fonts.googleapis.com/css2?family=Material+${suffix}`;
}
