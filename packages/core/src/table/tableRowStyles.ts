import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-tr");

/** @since 6.0.0 */
export interface TableRowClassNameOptions {
  className?: string;
  disableHover?: boolean;
  disableBorders?: boolean;
  selected?: boolean;
  clickable?: boolean;
}

/** @since 6.0.0 */
export function tableRow(options: TableRowClassNameOptions = {}): string {
  const { disableHover, disableBorders, selected, clickable, className } =
    options;
  return cnb(
    styles({
      bordered: !disableBorders,
      hoverable: !disableHover,
      clickable,
      selected,
    }),
    className
  );
}
