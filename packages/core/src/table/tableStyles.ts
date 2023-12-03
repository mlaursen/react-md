import { cnb } from "cnbuilder";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-table");

/** @remarks \@since 6.0.0 */
export interface TableClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  dense?: boolean;

  /** @defaultValue `false` */
  fullWidth?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function table(options: TableClassNameOptions = {}): string {
  const { dense, fullWidth, className } = options;

  return cnb(styles({ dense }), cssUtils({ fullWidth }), className);
}
