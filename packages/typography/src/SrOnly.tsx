import React, { FC, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

import Text, { TextProps, TextElement } from "./Text";

export interface SrOnlyProps extends TextProps {
  /**
   * Boolean if the text should become visible when focused. If this prop is
   * enabled and the `tabIndex` prop is `undefined`, the `tabIndex` will be
   * updated to be `0`.
   */
  focusable?: boolean;
}

type DefaultProps = Required<Pick<SrOnlyProps, "component" | "focusable">>;
type WithRef = WithForwardedRef<TextElement>;
type WithDefaultProps = SrOnlyProps & DefaultProps & WithRef;

const block = bem("rmd-sr-only");

/**
 * This component is used to create text that is only visible to screen readers.
 * If you enable the `focusable` prop, the text will become visible to all users
 * while focused.
 */
const SrOnly: FC<SrOnlyProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    focusable,
    tabIndex: propTabIndex,
    ...props
  } = providedProps as WithDefaultProps;
  let tabIndex = propTabIndex;
  if (focusable && typeof tabIndex === "undefined") {
    tabIndex = 0;
  }

  return (
    <Text
      {...props}
      tabIndex={tabIndex}
      ref={forwardedRef}
      className={cn(block({ focusable }), className)}
    >
      {children}
    </Text>
  );
};

const defaultProps: DefaultProps = {
  component: "span",
  focusable: false,
};

SrOnly.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  SrOnly.displayName = "SrOnly";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    SrOnly.propTypes = {
      focusable: PropTypes.bool,
      component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
    };
  }
}

export default forwardRef<TextElement, SrOnlyProps>((props, ref) => (
  <SrOnly {...props} forwardedRef={ref} />
));
