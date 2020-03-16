/* eslint-disable react/prop-types */
import React, { CSSProperties, ReactElement, ReactNode } from "react";
import cn from "classnames";
import { UnstyledButton } from "@react-md/button";
import {
  IconRotator,
  TextIconSpacing,
  TextIconSpacingProps,
} from "@react-md/icon";
import { bem } from "@react-md/utils";

export type SortOrder = "ascending" | "descending" | "none" | "other";

const block = bem("rmd-table-cell");

interface TableCellSortButtonProps extends TextIconSpacingProps {
  id?: string;
  style?: CSSProperties;
  sortOrder?: SortOrder;
  rotated?: boolean;
}

/**
 * @private
 */
export default function TableCellSortButton({
  id,
  icon: propIcon,
  style,
  className,
  sortOrder,
  children,
  rotated: propRotated,
  ...props
}: TableCellSortButtonProps): ReactElement {
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
      style={style}
      className={cn(block("child"), className)}
    >
      <TextIconSpacing {...props} icon={icon}>
        {children}
      </TextIconSpacing>
    </UnstyledButton>
  );
}
