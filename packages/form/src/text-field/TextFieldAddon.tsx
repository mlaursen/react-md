import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface TextFieldAddonProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Boolean if the addon should be presentational only and prevent pointer events.
   */
  presentational?: boolean;
}

type WithRef = WithForwardedRef<HTMLSpanElement>;
type DefaultProps = Required<Pick<TextFieldAddonProps, "presentational">>;
type WithDefaultProps = TextFieldAddonProps & DefaultProps & WithRef;

const block = bem("rmd-text-field-addon");

/**
 * This component is used to add an an icon before or after
 * the text field with correct styling.
 */
const TextFieldAddon: FC<TextFieldAddonProps & WithRef> = providedProps => {
  const {
    children,
    className,
    forwardedRef,
    presentational,
    ...props
  } = providedProps as WithDefaultProps;
  if (!children) {
    return null;
  }

  return (
    <span
      {...props}
      ref={forwardedRef}
      className={cn(block({ presentational }), className)}
    >
      {children}
    </span>
  );
};

const defaultProps: DefaultProps = {
  presentational: true,
};

TextFieldAddon.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TextFieldAddon.displayName = "TextFieldAddon";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}
  if (PropTypes) {
    TextFieldAddon.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      presentational: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLSpanElement, TextFieldAddonProps>(
  (props, ref) => <TextFieldAddon {...props} forwardedRef={ref} />
);
