import React, { FC, ReactNode } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";

export interface ListItemTextProps {
  className?: string;
  secondaryTextClassName?: string;
  children?: ReactNode;
  secondaryText?: ReactNode;
}

const block = bem("rmd-list-item");

const ListItemText: FC<ListItemTextProps> = ({
  className,
  secondaryTextClassName,
  secondaryText,
  children,
}) => {
  let secondaryContent: ReactNode;
  if (secondaryText) {
    secondaryContent = (
      <span
        className={cn(
          block("text", { secondary: true }),
          secondaryTextClassName
        )}
      >
        {secondaryText}
      </span>
    );
  }
  return (
    <span className={cn(block("text"), className)}>
      {children}
      {secondaryContent}
    </span>
  );
};

export default ListItemText;
