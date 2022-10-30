import { bem } from "@react-md/core";
import { IconRotator, TextIconSpacing } from "@react-md/icon";
import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import type { TableCellHorizontalAlignment } from "./TableConfigurationProvider";

export type SortOrder = "ascending" | "descending" | "none" | "other";

export interface TableCellContentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The current sort order for this cell. Setting this to `null` will prevent
   * the button from being rendered.
   */
  sortOrder?: SortOrder;

  icon?: ReactNode;
  iconAfter?: boolean;

  /**
   * Boolean if the icon should be rotated.
   */
  rotated?: boolean;

  /**
   * @remarks \@since 4.0.3
   * @see {@link TableCellHorizontalAlignment}
   */
  hAlign?: TableCellHorizontalAlignment;
}

const styles = bem("rmd-table-cell");

/**
 * This is mostly an internal component since it is automatically used within
 * the `TableCell` component but this will conditionally wrap the `children`
 * within an `UnstyledButton` to make a clickable cell. This is really to help
 * with sort behavior within headers.
 */
export const TableCellContent = forwardRef<
  HTMLButtonElement,
  TableCellContentProps
>(function TableCellContent(props, ref) {
  const {
    icon: propIcon,
    style,
    className,
    sortOrder,
    children,
    rotated: propRotated,
    hAlign = "left",
    iconAfter,
    ...remaining
  } = props;
  if (!sortOrder || propIcon === null) {
    return <>{children}</>;
  }

  let icon: ReactNode = null;
  if (sortOrder !== "none") {
    const rotated = propRotated ?? sortOrder === "descending";

    icon = <IconRotator rotated={rotated}>{propIcon}</IconRotator>;
  }

  return (
    <button
      {...remaining}
      ref={ref}
      type="button"
      style={style}
      className={cnb(
        styles("child", {
          [hAlign]: hAlign !== "left",
        }),
        className
      )}
    >
      <TextIconSpacing icon={icon} iconAfter={iconAfter}>
        {children}
      </TextIconSpacing>
    </button>
  );
});
