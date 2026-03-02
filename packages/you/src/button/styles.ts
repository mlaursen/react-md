import { cnb } from "cnbuilder";

import { interaction } from "../styles/interaction.js";
import { type DefaultComponentExtraSize } from "../styles/size.js";
import { type OverridableStringUnion } from "../types.js";
import { bem } from "../utils/bem.js";

export interface ButtonSizeOverrides {}
export type DefaultButtonSize = DefaultComponentExtraSize;
export type ButtonSize = OverridableStringUnion<
  DefaultButtonSize,
  ButtonSizeOverrides
>;

export interface ButtonVariantOverrides {}
export type DefaultButtonVariant =
  | "text"
  | "outlined"
  | "tonal"
  | "filled"
  | "elevated";
export type ButtonVariant = OverridableStringUnion<
  DefaultButtonVariant,
  ButtonVariantOverrides
>;

export interface ButtonShapeOverrides {}
export type DefaultButtonShape = "round" | "square";
export type ButtonShape = OverridableStringUnion<
  DefaultButtonShape,
  ButtonShapeOverrides
>;

const styles = bem("rmd-button");

export interface ButtonClassNameOptions {
  className?: string;

  size?: ButtonSize;
  shape?: ButtonShape;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export function button(options: ButtonClassNameOptions = {}): string {
  const {
    className,
    size = "small",
    shape = "round",
    variant = "filled",
    disabled,
  } = options;

  return cnb(
    styles({
      [size]: true,
      [shape]: true,
      [variant]: true,
    }),
    interaction({ focus: "inward" }),
    className
  );
}
