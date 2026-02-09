import { alphaNumericSort } from "../utils/alphaNumericSort.js";
import { getMaterialSymbolOption } from "./getMaterialSymbolOption.js";
import {
  type MaterialSymbolFamily,
  type MaterialSymbolName,
} from "./material.js";
import {
  MATERIAL_CONFIG,
  type MaterialSymbolFill,
  type MaterialSymbolGrade,
  type MaterialSymbolOpticalSize,
  type MaterialSymbolWeight,
} from "./materialConfig.js";
import { DEFAULT_MATERIAL_SYMBOL_NAMES } from "./symbols.js";

/**
 * @since 7.1.0
 */
export type GoogleFontsAPIValueOrRange<T extends number> =
  | T
  | { min: T; max: T };

/**
 * @since 7.1.0
 */
export interface MaterialSymbolsGoogleFontUrlOptions {
  /**
   * Provide this value if the `MATERIAL_CONFIG.family` is not the default.
   *
   * @defaultValue `"outlined"`
   */
  family?: MaterialSymbolFamily | readonly MaterialSymbolFamily[];

  /**
   * Provide this value if the `MATERIAL_CONFIG.fill` is not the default.
   *
   * @defaultValue `0`
   */
  fill?: GoogleFontsAPIValueOrRange<MaterialSymbolFill>;

  /**
   * Provide this value if the `MATERIAL_CONFIG.grade` is not the default.
   *
   * @defaultValue `0`
   */
  grade?: GoogleFontsAPIValueOrRange<MaterialSymbolGrade>;

  /**
   * Provide this value if the `MATERIAL_CONFIG.weight` is not the default.
   *
   * @defaultValue `400`
   */
  weight?: GoogleFontsAPIValueOrRange<MaterialSymbolWeight>;

  /**
   * Provide this value if the `MATERIAL_CONFIG.opticalSize` is not the default.
   *
   * @defaultValue `48`
   */
  opticalSize?: GoogleFontsAPIValueOrRange<MaterialSymbolOpticalSize>;
}

/**
 * @since 7.1.0
 */
export interface MaterialSymbolsUrlOptions extends MaterialSymbolsGoogleFontUrlOptions {
  /**
   * @see {@link DEFAULT_MATERIAL_SYMBOL_NAMES}
   * @defaultValue `DEFAULT_MATERIAL_SYMBOL_NAMES`
   */
  names?: readonly MaterialSymbolName[];
}

/**
 * @since 7.1.0
 */
export function getMaterialSymbolsUrl(
  options: MaterialSymbolsUrlOptions = {}
): string {
  // the names have to be sorted for the google fonts api
  const names = alphaNumericSort([
    ...new Set(options.names ?? DEFAULT_MATERIAL_SYMBOL_NAMES),
  ]);
  const fill = getMaterialSymbolOption(options.fill, MATERIAL_CONFIG.fill);
  const grade = getMaterialSymbolOption(options.grade, MATERIAL_CONFIG.grade);
  const weight = getMaterialSymbolOption(
    options.weight,
    MATERIAL_CONFIG.weight
  );
  const opticalSize = getMaterialSymbolOption(
    options.opticalSize,
    MATERIAL_CONFIG.opticalSize
  );
  const specs = `:opsz,wght,FILL,GRAD@${opticalSize},${weight},${fill},${grade}`;

  const families =
    typeof options.family === "string" || options.family === undefined
      ? [options.family ?? MATERIAL_CONFIG.family]
      : options.family;
  let familiesQs = "";
  for (const [i, family] of families.entries()) {
    const variant = family.charAt(0).toUpperCase() + family.slice(1);
    familiesQs += (i === 0 ? "" : "&") + "family=Material+Symbols+" + variant;
  }

  let iconNames = "";
  if (names.length > 0) {
    iconNames = `&icon_names=${names.join(",")}`;
  }

  return `https://fonts.googleapis.com/css2?${familiesQs}${specs}${iconNames}`;
}
