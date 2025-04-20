import * as colors from "@react-md/core/colors";

import {
  type MaterialColorShade,
  type MaterialColorWithShade,
} from "@/constants/theme.js";

type ReplaceAWithAccent<S extends string> =
  S extends `${infer Prefix}A${infer Suffix}` ? `${Prefix}Accent${Suffix}` : S;

export function getMaterialColorShadeShorthand<S extends MaterialColorShade>(
  shade: S
): ReplaceAWithAccent<S> {
  return shade.replace("A", "Accent") as ReplaceAWithAccent<S>;
}

export function getMaterialColorValue(
  materialColor: MaterialColorWithShade,
  shade: MaterialColorShade
): string {
  const name =
    `${materialColor}${getMaterialColorShadeShorthand(shade)}` as const;

  return colors[name];
}

export const CSS_COLOR_REGEX =
  /^(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})|rgba?\(\s*(\d{1,3}%?\s*,\s*){2}\d{1,3}%?\s*(,\s*(0|1|0?\.\d+))?\s*\)|hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0|1|0?\.\d+))?\s*\)|transparent)$/i;

export function isValidColor(color: string): boolean {
  return CSS_COLOR_REGEX.test(color);
}

let colorNameCache: ReadonlyMap<string, string>;
let colorValuesCache: ReadonlyMap<string, string>;
const createCache = (): {
  [name in "colorNameCache" | "colorValuesCache"]: ReadonlyMap<string, string>;
} => {
  const colorNameCache = new Map<string, string>();
  const colorValuesCache = new Map<string, string>();
  Object.entries(colors).forEach(([name, color]) => {
    colorNameCache.set(color, name);
    colorValuesCache.set(name, color);
  });

  return {
    colorNameCache,
    colorValuesCache,
  };
};

export function getMaterialColorName(color: string): string | undefined {
  if (!colorValuesCache) {
    ({ colorValuesCache, colorNameCache } = createCache());
  }

  return colorNameCache.get(color);
}

export function isMaterialColorValue(colorValue: string): boolean {
  if (!colorNameCache) {
    ({ colorNameCache, colorValuesCache } = createCache());
  }

  return colorNameCache.has(colorValue);
}
