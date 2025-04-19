import * as colors from "@react-md/core/colors";

import {
  type MaterialColorShade,
  type MaterialColorWithShade,
} from "@/constants/theme.js";

type ReplaceAWithAccent<S extends string> =
  S extends `${infer Prefix}A${infer Suffix}` ? `${Prefix}Accent${Suffix}` : S;

export function getMaterialColorShade<S extends MaterialColorShade>(
  shade: S
): ReplaceAWithAccent<S> {
  return shade.replace("A", "Accent") as ReplaceAWithAccent<S>;
}

export function getMaterialColorValue(
  materialColor: MaterialColorWithShade,
  shade: MaterialColorShade
): string {
  const name = `${materialColor}${getMaterialColorShade(shade)}` as const;

  return colors[name];
}
