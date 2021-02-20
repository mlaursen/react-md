import React, { ReactElement, ReactNode } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export interface ListItemTextProps {
  /**
   * An optional `className` to apply to the `<span>` surrounding the `children`.
   */
  className?: string;

  /**
   * An optional `className` to apply to the `<span>` surrounding the
   * `secondaryText` if it was provided.
   */
  secondaryTextClassName?: string;

  /**
   * The main text children to display. This will be stacked above the
   * `secondaryText` if it was provided.
   */
  children?: ReactNode;

  /**
   * Optional secondary text to display that will be stacked below the
   * `children`. This also applies some styles to make the text less prominent
   * than the `children`.
   */
  secondaryText?: ReactNode;
}

const block = bem("rmd-list-item");

/**
 * This component us used to create the one to three lines of text within a
 * `ListItem` or `SimpleListItem`.
 */
export function ListItemText({
  className,
  secondaryTextClassName,
  secondaryText,
  children,
}: ListItemTextProps): ReactElement {
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
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ListItemText.propTypes = {
      className: PropTypes.string,
      secondaryTextClassName: PropTypes.string,
      secondaryText: PropTypes.node,
      children: PropTypes.node,
    };
  } catch (e) {}
}
