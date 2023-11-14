import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-tfoot");

/**
 * @remarks \@since 6.0.0
 */
export interface TableFooterClassNameOptions {
  className?: string;
  sticky?: boolean;
  stickyActive?: boolean;
  stickyActiveClassName?: string;
}

export function tableFooter(options: TableFooterClassNameOptions = {}): string {
  const { className, sticky, stickyActive, stickyActiveClassName } = options;

  return cnb(
    styles({
      sticky,
      "sticky-active": !stickyActiveClassName && stickyActive,
    }),
    stickyActive && stickyActiveClassName,
    className
  );
}
