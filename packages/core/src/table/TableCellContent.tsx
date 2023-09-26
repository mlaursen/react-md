import { cnb } from "cnbuilder";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ButtonUnstyled } from "../button/ButtonUnstyled.js";
import { IconRotator } from "../icon/IconRotator.js";
import { bem } from "../utils/bem.js";
import { type TableCellHorizontalAlignment } from "./TableConfigurationProvider.js";

export type SortOrder = "ascending" | "descending" | "none" | "other";

/**
 * @remarks \@since 6.0.0 Extends the `ButtonHTMLAttributes` so the extra props
 * can be passed to the `ButtonUnstyled`
 * @internal
 */
export interface TableCellContentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The current sort order for this cell. Setting this to `null` will prevent
   * the button from being rendered.
   */
  sortOrder?: SortOrder;

  /**
   * This should normally be the `getIcon("sort")`
   */
  icon?: ReactNode;

  /** @defaultValue `false` */
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
 * **Server Component**
 * This might actually be a client component.
 *
 * This is mostly an internal component since it is automatically used within
 * the `TableCell` component but this will conditionally wrap the `children`
 * within an `UnstyledButton` to make a clickable cell. This is really to help
 * with sort behavior within headers.
 *
 * @internal
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
    <ButtonUnstyled
      {...remaining}
      ref={ref}
      style={style}
      className={cnb(
        styles("content", {
          [hAlign]: hAlign !== "left",
        }),
        className
      )}
    >
      {!iconAfter && icon}
      {children}
      {iconAfter && icon}
    </ButtonUnstyled>
  );
});
