import React, { FunctionComponent, ReactNode } from "react";
import cn from "classnames";

export interface ListItemTextProps {
  className?: string;
  secondaryTextClassName?: string;
  children?: ReactNode;
  secondaryText?: ReactNode;
}

const ListItemText: FunctionComponent<ListItemTextProps> = ({
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
          "rmd-list-item__text rmd-list-item__text--secondary",
          secondaryTextClassName
        )}
      >
        {secondaryText}
      </span>
    );
  }
  return (
    <span className={cn("rmd-list-item__text", className)}>
      {children}
      {secondaryContent}
    </span>
  );
};

export default ListItemText;
