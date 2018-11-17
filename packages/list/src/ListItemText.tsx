import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface IListItemTextProps {
  className?: string;
  secondaryTextClassName?: string;
  children: React.ReactNode;
  secondaryText?: React.ReactNode;
}

/**
 *
 * @sfc IListItemTextProps
 */
const ListItemText: React.SFC<IListItemTextProps> = ({
  className,
  secondaryTextClassName,
  children,
  secondaryText,
}) => {
  let content;
  if (secondaryText) {
    content = (
      <span className={cn("rmd-list-item__secondary-text", secondaryTextClassName)}>
        {secondaryText}
      </span>
    );
  }

  return (
    <span className={cn("rmd-list-item__text", className)}>
      {children}
      {content}
    </span>
  );
};

export default ListItemText;
