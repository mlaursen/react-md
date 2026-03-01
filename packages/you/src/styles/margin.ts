import { cnb } from "cnbuilder";

import { type OverridableStringUnion } from "../types.js";

export type DefaultMargin =
  | "none"
  | "top"
  | "bottom"
  | "centered"
  | "force-end";
export interface MarginOverrides {}
export type Margin = OverridableStringUnion<DefaultMargin, MarginOverrides>;

export interface MarginClassNameOptions {
  className?: string;

  margin?: Margin;
}

export function margin(options: MarginClassNameOptions = {}): string {
  const { className, margin } = options;

  return cnb(margin && `rmd-margin-${margin}`, className);
}
