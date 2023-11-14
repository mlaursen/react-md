import { cnb } from "cnbuilder";

/**
 * @remarks \@since 6.0.0
 */
export interface TableContainerClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function tableContainer(
  options: TableContainerClassNameOptions = {}
): string {
  const { className } = options;

  return cnb("rmd-table-container", className);
}
