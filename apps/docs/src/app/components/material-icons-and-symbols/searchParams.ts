import {
  type MaterialIconFamily,
  type MaterialSymbolFill,
  type MaterialSymbolGrade,
  type MaterialSymbolOpticalSize,
  type MaterialSymbolWeight,
} from "@react-md/core";
import { INITIAL_STATE } from "./constants.js";
import {
  MATERIAL_ICONS,
  MATERIAL_SYMBOLS,
  type MaterialIconAndSymbolName,
} from "./metadata.js";
import {
  type IconCategoryFilter,
  type IconType,
  type MaterialIconsAndSymbolsRef,
  type MaterialIconsAndSymbolsState,
} from "./types.js";

export const ICON_TYPE = "icon.type";
export const ICON_FAMILY = "icon.family";
export const ICON_CATEGORY = "icon.category";
export const SELECTED_ICON = "icon";
export const ICON_QUERY = "icon.query";
export const SYMBOL_FILL = "FILL";
export const SYMBOL_GRADE = "GRAD";
export const SYMBOL_WEIGHT = "wght";
export const SYMBOL_OPTICAL_SIZE = "opsz";

type NumberToString<N> = N extends number ? `${N}` : never;

export function isMaterialIconType(
  iconType: unknown
): iconType is "icon" | "icon-font" {
  return iconType === "icon" || iconType === "icon-font";
}

export function isValidIconType(iconType: unknown): iconType is IconType {
  return isMaterialIconType(iconType) || iconType === "symbol";
}

export function isValidIconFamily(
  iconFamily: unknown,
  iconType: IconType
): iconFamily is MaterialIconFamily {
  return (
    typeof iconFamily === "string" &&
    ((isMaterialIconType(iconType) &&
      ["two-tone", "filled"].includes(iconFamily)) ||
      ["outlined", "rounded", "sharp"].includes(iconFamily))
  );
}

export function isValidIconCategory(
  iconCategory: unknown,
  iconType: IconType,
  iconFamily: MaterialIconFamily
): iconCategory is IconCategoryFilter {
  if (typeof iconCategory !== "string" || !iconCategory) {
    return false;
  }

  const icons = isMaterialIconType(iconType)
    ? MATERIAL_ICONS
    : MATERIAL_SYMBOLS;
  const categories = icons[iconFamily];
  return Object.keys(categories).includes(iconCategory);
}

export function isValidSelectedIconName(
  name: unknown,
  iconType: IconType
): name is MaterialIconAndSymbolName {
  if (typeof name !== "string" || !name) {
    return false;
  }

  const namesRecord = isMaterialIconType(iconType)
    ? MATERIAL_ICONS
    : MATERIAL_SYMBOLS;
  const names = Object.values(namesRecord);
  for (const iconFamilyNamesRecord of names) {
    const iconFamilyNames = Object.values(iconFamilyNamesRecord);
    for (const icons of iconFamilyNames) {
      for (const icon of icons) {
        if (name === icon) {
          return true;
        }
      }
    }
  }

  return false;
}

export function isValidSymbolGrade(
  grade: unknown
): grade is NumberToString<MaterialSymbolGrade> {
  return (
    typeof grade === "string" && !grade && ["-25", "0", "200"].includes(grade)
  );
}

export function isValidSymbolFill(
  fill: unknown
): fill is NumberToString<MaterialSymbolFill> {
  return fill === "0" || fill === "1";
}

export function isValidSymbolWeight(
  weight: unknown
): weight is NumberToString<MaterialSymbolWeight> {
  return (
    typeof weight === "string" &&
    !!weight &&
    ["100", "200", "300", "400", "500", "600", "700", "800", "900"].includes(
      weight
    )
  );
}

export function isValidSymbolOpticalSize(
  opticalSize: unknown
): opticalSize is NumberToString<MaterialSymbolOpticalSize> {
  return (
    typeof opticalSize === "string" &&
    !!opticalSize &&
    ["20", "24", "40", "48"].includes(opticalSize)
  );
}

export function getInitialState(
  state: MaterialIconsAndSymbolsState,
  searchParams: URLSearchParams
): MaterialIconsAndSymbolsState {
  const searchQuery = searchParams.get(ICON_QUERY);
  const searchIconType = searchParams.get(ICON_TYPE);
  const searchIconFamily = searchParams.get(ICON_FAMILY);
  const searchIconCategory = searchParams.get(ICON_CATEGORY);
  const searchSelectedIcon = searchParams.get(SELECTED_ICON);
  const searchSymbolFill = searchParams.get(SYMBOL_FILL);
  const searchSymbolGrade = searchParams.get(SYMBOL_GRADE);
  const searchSymbolWeight = searchParams.get(SYMBOL_WEIGHT);
  const searchSymbolOpticalSize = searchParams.get(SYMBOL_OPTICAL_SIZE);
  let {
    search,
    iconType,
    iconFamily,
    iconCategory,
    selectedIconName,
    symbolFill,
    symbolGrade,
    symbolWeight,
    symbolOpticalSize,
  } = state;
  if (searchQuery) {
    search = searchQuery;
  }
  if (isValidIconType(searchIconType)) {
    iconType = searchIconType;
  }

  if (isValidIconFamily(searchIconFamily, iconType)) {
    iconFamily = searchIconFamily;
  }

  if (isValidIconCategory(searchIconCategory, iconType, iconFamily)) {
    iconCategory = searchIconCategory;
  }

  if (isValidSelectedIconName(searchSelectedIcon, iconType)) {
    selectedIconName = searchSelectedIcon;
  }

  if (iconType === "symbol") {
    if (isValidSymbolGrade(searchSymbolGrade)) {
      symbolGrade = parseInt(searchSymbolGrade, 10);
    }
    if (isValidSymbolFill(searchSymbolFill)) {
      symbolFill = parseInt(searchSymbolFill, 10);
    }
    if (isValidSymbolWeight(searchSymbolWeight)) {
      symbolWeight = parseInt(searchSymbolWeight, 10);
    }
    if (isValidSymbolOpticalSize(searchSymbolOpticalSize)) {
      symbolOpticalSize = parseInt(searchSymbolOpticalSize, 10);
    }
  }

  return {
    search,
    iconType,
    iconFamily,
    iconCategory,
    selectedIconName,
    symbolFill,
    symbolGrade,
    symbolWeight,
    symbolOpticalSize,
    filtersVisible: false,
  };
}

export interface IconUrlOptions extends MaterialIconsAndSymbolsRef {
  pathname: string;
}

export function getIconUrl(options: IconUrlOptions): string {
  const {
    pathname,
    search,
    iconCategory,
    iconType,
    iconFamily,
    selectedIconName,
    symbolFill,
    symbolGrade,
    symbolWeight,
    symbolOpticalSize,
  } = options;

  const params = new URLSearchParams();
  if (selectedIconName) {
    params.set(SELECTED_ICON, selectedIconName);
  }
  if (iconType !== INITIAL_STATE.iconType) {
    params.set(ICON_TYPE, iconType);
  }

  if (iconFamily !== INITIAL_STATE.iconFamily) {
    params.set(ICON_FAMILY, iconFamily);
  }

  if (iconCategory !== INITIAL_STATE.iconCategory) {
    params.set(ICON_CATEGORY, iconCategory);
  }

  if (search) {
    params.set(ICON_QUERY, search);
  }

  if (iconType === "symbol" && selectedIconName) {
    if (symbolFill !== INITIAL_STATE.symbolFill) {
      params.set(SYMBOL_FILL, `${symbolFill}`);
    }

    if (symbolGrade !== INITIAL_STATE.symbolGrade) {
      params.set(SYMBOL_GRADE, `${symbolGrade}`);
    }

    if (symbolWeight !== INITIAL_STATE.symbolWeight) {
      params.set(SYMBOL_WEIGHT, `${symbolWeight}`);
    }

    if (symbolOpticalSize !== INITIAL_STATE.symbolOpticalSize) {
      params.set(SYMBOL_OPTICAL_SIZE, `${symbolOpticalSize}`);
    }
  }

  const q = params.toString();
  return pathname + q ? `?${q}` : "";
}
