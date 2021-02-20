import React, { forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { Text, TextElement, TextProps } from "./Text";

export interface SrOnlyProps extends TextProps {
  /**
   * Boolean if the text should become visible when focused. If this prop is
   * enabled and the `tabIndex` prop is `undefined`, the `tabIndex` will be
   * updated to be `0`.
   */
  focusable?: boolean;
}

const block = bem("rmd-sr-only");

/**
 * This component is used to create text that is only visible to screen readers.
 * If you enable the `focusable` prop, the text will become visible to all users
 * while focused.
 */
export const SrOnly = forwardRef<TextElement, SrOnlyProps>(function SrOnly(
  {
    className,
    children,
    focusable = false,
    tabIndex: propTabIndex,
    component = "span",
    ...props
  },
  ref
) {
  let tabIndex = propTabIndex;
  if (focusable && typeof tabIndex === "undefined") {
    tabIndex = 0;
  }

  return (
    <Text
      {...props}
      ref={ref}
      tabIndex={tabIndex}
      component={component}
      className={cn(block({ focusable }), className)}
    >
      {children}
    </Text>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    SrOnly.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      tabIndex: PropTypes.number,
      focusable: PropTypes.bool,
      component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
    };
  } catch (e) {}
}
