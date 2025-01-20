import {
  type MaterialSymbolFill,
  type MaterialSymbolGrade,
  type MaterialSymbolOpticalSize,
  type MaterialSymbolWeight,
} from "@react-md/core/icon/materialConfig";

import { type MaterialIconsAndSymbolsState } from "./types.js";

export const DEFAULT_FILL = 0;
export const DEFAULT_WEIGHT = 3;
export const DEFAULT_GRADE = 1;
export const DEFAULT_OPTICAL_SIZE = 3;
export const FILLS: readonly MaterialSymbolFill[] = [0, 1];
export const GRADES: readonly MaterialSymbolGrade[] = [-25, 0, 200];
export const WEIGHTS: readonly MaterialSymbolWeight[] = [
  100, 200, 300, 400, 500, 600, 700,
];
export const OPTICAL_SIZES: readonly MaterialSymbolOpticalSize[] = [
  20, 24, 40, 48,
];

export const indexToMaterialFill = (index: number): MaterialSymbolFill =>
  FILLS[index];
export const indexToMaterialGrade = (index: number): MaterialSymbolGrade =>
  GRADES[index];
export const indexToMaterialWeight = (index: number): MaterialSymbolWeight =>
  WEIGHTS[index];
export const indexToMaterialOpticalSize = (
  index: number
): MaterialSymbolOpticalSize => OPTICAL_SIZES[index];

export const INITIAL_STATE: MaterialIconsAndSymbolsState = {
  search: "",
  iconType: "symbol",
  iconFamily: "outlined",
  iconCategory: "",
  symbolFill: DEFAULT_FILL,
  symbolWeight: DEFAULT_WEIGHT,
  symbolGrade: DEFAULT_GRADE,
  symbolOpticalSize: DEFAULT_OPTICAL_SIZE,

  filtersVisible: false,
  selectedIconName: null,
};
