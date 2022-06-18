import { cnb } from "cnbuilder";
import { bem } from "@react-md/core";

const listStyles = bem("rmd-list");
const itemStyles = bem("rmd-list-item");

export interface ListClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * @defaultValue `false`
   */
  horizontal?: boolean;
}

export function getListClassName(options: ListClassNameOptions = {}): string {
  const { dense = false, horizontal = false, className } = options;

  return cnb(
    listStyles({
      dense,
      horizontal,
    }),
    className
  );
}

export interface ListItemTextClassNameOptions {
  className?: string;
  secondary?: boolean;
}

export function getListItemTextClassName(
  options: ListItemTextClassNameOptions = {}
): string {
  const { className, secondary } = options;

  return cnb(itemStyles("text", { secondary }), className);
}
