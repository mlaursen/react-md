import {
  type MaterialSymbolFamily,
  type MaterialSymbolName,
} from "@react-md/core/icon/material";
import {
  type MaterialSymbolFill,
  type MaterialSymbolGrade,
  type MaterialSymbolOpticalSize,
  type MaterialSymbolWeight,
} from "@react-md/core/icon/materialConfig";

export type ValueOrRange<T extends number> = T | { min: T; max: T };

export interface MaterialSymbolPluginOptions {
  /**
   * An optional list of material symbol names to include when the simple regex
   * matcher does not work. For example, if you have a custom component that
   * dynamically sets the `name` for the `MaterialSymbol` use this option for
   * known values since the regex will be unable to determine the used symbol
   * names.
   */
  defaultSymbolNames?: readonly MaterialSymbolName[];

  /**
   * Provide this value if the `MATERIAL_CONFIG.family` is not the default.
   *
   * @defaultValue `"outlined"`
   */
  family?: MaterialSymbolFamily;

  /**
   * Provide this value if the `MATERIAL_CONFIG.fill` is not the default.
   *
   * @defaultValue `0`
   */
  fill?: ValueOrRange<MaterialSymbolFill>;

  /**
   * Provide this value if the `MATERIAL_CONFIG.grade` is not the default.
   *
   * @defaultValue `0`
   */
  grade?: ValueOrRange<MaterialSymbolGrade>;

  /**
   * Provide this value if the `MATERIAL_CONFIG.weight` is not the default.
   *
   * @defaultValue `400`
   */
  weight?: ValueOrRange<MaterialSymbolWeight>;

  /**
   * Provide this value if the `MATERIAL_CONFIG.opticalSize` is not the default.
   *
   * @defaultValue `48`
   */
  opticalSize?: ValueOrRange<MaterialSymbolOpticalSize>;

  /**
   * Use this prop to prevent the google fonts preconnect links from being included
   * in the default html.
   *
   * @defaultValue `false`
   */
  disablePreconnectLinks?: boolean;

  /**
   * The pattern to use to find files referencing material symbols.
   *
   * @defaultValue `"src\/**\/*.{ts,tsx,js,jsx}"`
   */
  pattern?: string;
}
