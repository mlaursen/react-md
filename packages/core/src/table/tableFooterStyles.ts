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
}

export function tableFooter(options: TableFooterClassNameOptions = {}): string {
  const { className, sticky, stickyActive } = options;
  return cnb(
    styles({
      sticky,
      "sticky-active": stickyActive,
    }),
    className
  );
}
