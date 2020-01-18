/* eslint-disable react/prop-types */
import React, { FC, Fragment, CSSProperties, ReactNode } from "react";
import cn from "classnames";
import { UnstyledButton } from "@react-md/button";
import {
  TextIconSpacing,
  TextIconSpacingProps,
  IconRotator,
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
const TableCellSortButton: FC<TableCellSortButtonProps> = ({
  id,
  icon: propIcon,
  style,
  className,
  sortOrder,
  children,
  rotated: propRotated,
  ...props
}) => {
  if (!sortOrder || propIcon === null) {
    return <Fragment>{children}</Fragment>;
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
};

export default TableCellSortButton;
