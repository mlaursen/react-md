import React, { CSSProperties, forwardRef, ReactNode } from "react";
import cn from "classnames";
import { UnstyledButton } from "@react-md/button";
import {
  IconRotator,
  TextIconSpacing,
  TextIconSpacingProps,
} from "@react-md/icon";
import { bem } from "@react-md/utils";

export type SortOrder = "ascending" | "descending" | "none" | "other";

export interface TableCellContentProps extends TextIconSpacingProps {
  /**
   * An optional id for the sort order button.
   */
  id?: string;

  /**
   * An optional style for the sort order button.
   */
  style?: CSSProperties;

  /**
   * The current sort order for this cell. Setting this to `null` will prevent
   * the button from being rendered.
   */
  sortOrder?: SortOrder;

  /**
   * Boolean if the icon should be rotated.
   */
  rotated?: boolean;
}

const block = bem("rmd-table-cell");

/**
 * This is mostly an internal component since it is automatically used within
 * the `TableCell` component but this will conditionally wrap the `children`
 * within an `UnstyledButton` to make a clickable cell. This is really to help
 * with sort behavior within headers.
 */
export const TableCellContent = forwardRef<
  HTMLButtonElement,
  TableCellContentProps
>(function TableCellContent(
  {
    id,
    icon: propIcon,
    style,
    className,
    sortOrder,
    children,
    rotated: propRotated,
    ...props
  },
  ref
) {
  if (!sortOrder || propIcon === null) {
    return <>{children}</>;
  }

  let icon: ReactNode = null;
  if (sortOrder !== "none") {
    const rotated = propRotated ?? sortOrder === "descending";

    icon = <IconRotator rotated={rotated}>{propIcon}</IconRotator>;
  }

  return (
    <UnstyledButton
      id={id}
      ref={ref}
      style={style}
      className={cn(block("child"), className)}
    >
      <TextIconSpacing {...props} icon={icon}>
        {children}
      </TextIconSpacing>
    </UnstyledButton>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TableCellContent.propTypes = {
      id: PropTypes.string,
      style: PropTypes.object,
      className: PropTypes.string,
      icon: PropTypes.node,
      sortOrder: PropTypes.oneOf(["ascending", "descending", "none", "other"]),
      rotated: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}
