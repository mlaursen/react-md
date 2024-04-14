import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-thead");

/** @since 6.0.0 */
export interface TableHeaderClassNameOptions {
  className?: string;
  dense?: boolean;
  sticky?: boolean;
  stickyActive?: boolean;
  stickyActiveClassName?: string;
}

/** @since 6.0.0 */
export function tableHeader(options: TableHeaderClassNameOptions = {}): string {
  const { dense, sticky, stickyActive, stickyActiveClassName, className } =
    options;

  return cnb(
    styles({
      dense,
      sticky,
      "sticky-active": stickyActive,
    }),
    stickyActive && stickyActiveClassName,
    className
  );
}
