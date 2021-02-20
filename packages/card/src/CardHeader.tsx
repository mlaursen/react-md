import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import { bem } from "@react-md/utils";

import { CardHeaderAddon } from "./CardHeaderAddon";

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * This is how to align the items within the header component. It's really
   * just a simple pass-through to `align-items`.
   */
  align?: "top" | "center" | "bottom" | "none";

  /**
   * Optional children to render before the main `children` in the component.
   * This is a good place to add `Avatar`s or additional `Media` to display with
   * the card.
   *
   * This using the `TextIconSpacing` component behind the scenes, so some
   * additional margin will be added to separate the content.
   */
  beforeChildren?: ReactNode;

  /**
   * Optional children to render after the main `children` in the component.
   * This is a good place to add expander buttons or overflow menus.
   *
   * This using the `TextIconSpacing` component behind the scenes, so some
   * additional margin will be added to separate the content.
   */
  afterChildren?: ReactNode;

  /**
   * Since it's possible to add content before or after the main children, the
   * main content gets wrapped in a small `<span>` to help stack the `CardTitle`
   * and `CardSubtitle` components while still allowing content to be centered
   * vertically. If you need to add additional styles to this element for some
   * reason, you can use this class name to do so.
   */
  contentClassName?: string;
}

const block = bem("rmd-card");

/**
 * The header for a `Card`. There should only be up to 1 `CardHeader` within a
 * card and normally contains the `CardTitle` and optionally `CardSubtitle`
 * components. There is also additional functionality built in to render items
 * before or after the main children with some additional spacing.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(
    {
      align = "center",
      className,
      contentClassName,
      children,
      beforeChildren,
      afterChildren,
      ...props
    },
    ref
  ) {
    return (
      <header
        {...props}
        ref={ref}
        className={cn(
          block("header", {
            [align]: align !== "none",
          }),
          className
        )}
      >
        <TextIconSpacing
          icon={<CardHeaderAddon>{beforeChildren}</CardHeaderAddon>}
        >
          <TextIconSpacing
            icon={<CardHeaderAddon>{afterChildren}</CardHeaderAddon>}
            iconAfter
          >
            <span className={cn(block("header-content"), contentClassName)}>
              {children}
            </span>
          </TextIconSpacing>
        </TextIconSpacing>
      </header>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    CardHeader.propTypes = {
      align: PropTypes.oneOf(["top", "center", "bottom", "none"]),
      className: PropTypes.string,
      beforeChildren: PropTypes.node,
      afterChildren: PropTypes.node,
      contentClassName: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}
