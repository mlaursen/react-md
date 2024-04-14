import { cnb } from "cnbuilder";

/**
 * @since 6.0.0
 */
export interface TableContainerClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function tableContainer(
  options: TableContainerClassNameOptions = {}
): string {
  const { className } = options;

  return cnb("rmd-table-container", className);
}
