import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";
import { type FormTheme } from "./types.js";

const styles = bem("rmd-select");

/**
 * @remarks \@since 6.0.0
 */
export interface SelectClassNameOptions {
  className?: string;
  /**
   * @defaultValue `"outline"`
   */
  theme?: FormTheme;
}

/**
 * @remarks \@since 6.0.0
 */
export function select(options: SelectClassNameOptions = {}): string {
  const { className, theme = "outline" } = options;

  return cnb(
    styles({
      filled: theme === "filled",
      outline: theme === "outline",
      underline: theme === "underline",
    }),
    className
  );
}
