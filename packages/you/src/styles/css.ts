import { cnb } from "cnbuilder";

import { type FontAndTextClassNameOptions, font } from "./font.js";
import {
  type InteractionClassNameOptions,
  interaction,
} from "./interaction.js";
import {
  type MarginClassNameOptions,
  margin as marginStyles,
} from "./margin.js";
import { type PaletteClassNameOptions, palette } from "./palette.js";

/**
 * @since 8.0.0
 */
export interface CssClassNameOptions
  extends
    MarginClassNameOptions,
    FontAndTextClassNameOptions,
    PaletteClassNameOptions,
    InteractionClassNameOptions {}

/**
 * @since 8.0.0
 */
export function css(options: CssClassNameOptions = {}): string {
  const {
    className,
    background,
    textColor,
    margin,
    fontFamily,
    fontStyle,
    fontWeight,
    textAlign,
    textDecoration,
    textTransform,
    textOverflow,
    focus,
  } = options;

  return cnb(
    palette({ background, textColor }),
    font({
      fontFamily,
      fontStyle,
      fontWeight,
      textAlign,
      textDecoration,
      textTransform,
      textOverflow,
    }),
    interaction({ focus }),
    marginStyles({ margin }),
    className
  );
}
