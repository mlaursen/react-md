/* eslint-disable react/prop-types */
import React, { ReactElement, ReactNode } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

export interface ListItemTextProps {
  className?: string;
  secondaryTextClassName?: string;
  children?: ReactNode;
  secondaryText?: ReactNode;
}

const block = bem("rmd-list-item");

function ListItemText({
  className,
  secondaryTextClassName,
  secondaryText,
  children,
}: ListItemTextProps): ReactElement {
  let secondaryContent: ReactNode;
  if (secondaryText) {
    secondaryContent = (
      <span
        className={cnb(
          block("text", { secondary: true }),
          secondaryTextClassName
        )}
      >
        {secondaryText}
      </span>
    );
  }

  return (
    <span className={cnb(block("text"), className)}>
      {children}
      {secondaryContent}
    </span>
  );
}

export default ListItemText;
