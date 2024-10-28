import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-option");

/**
 * @since 6.0.0
 */
export interface OptionClassNameOptions {
  className?: string;
  icon: boolean;
  selected: boolean;
  selectedClassName?: string;
}

/**
 * @since 6.0.0
 */
export function option(options: OptionClassNameOptions): string {
  const { className, icon, selected, selectedClassName } = options;

  return cnb(
    styles({ icon, selected }),
    selected && selectedClassName,
    className
  );
}
