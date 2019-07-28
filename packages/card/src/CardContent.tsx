import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the padding should be removed from the content. This is really only
   * useful if your child elements have their own padding.
   */
  disablePadding?: boolean;

  /**
   * Boolean if the extra `padding-bottom` that gets applied when the `CardContent`
   * is the last component within the `Card`. If the `disablePadding` prop is enabled,
   * this prop will be ignored and the extra padding will not be applied.
   */
  disableExtraPadding?: boolean;

  /**
   * Boolean if the current secondary text color should be disabled from the content.
   */
  disableSecondaryColor?: boolean;

  /**
   * Boolean if any `<p>` tags that appear as children of this component should no longer
   * have their `margin-top` and `margin-bottom` removed. The default behavior is to
   * remove all `margin-top` and remove the `margin-bottom` if the `<p>` is the last child.
   */
  disableParagraphMargin?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<
    CardContentProps,
    | "disablePadding"
    | "disableExtraPadding"
    | "disableSecondaryColor"
    | "disableParagraphMargin"
  >
>;
type WithDefaultProps = CardContentProps & DefaultProps & WithRef;

const block = bem("rmd-card");

/**
 * The main content for the `Card`. This adds some additional padding and removes
 * margin from `<p>` tags by default.
 */
const CardContent: FC<CardContentProps & WithRef> = providedProps => {
  const {
    disablePadding,
    disableExtraPadding,
    disableSecondaryColor,
    disableParagraphMargin,
    className,
    forwardedRef,
    children,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <div
      {...props}
      className={cn(
        block("content", {
          padded: !disablePadding,
          "extra-padding": !disablePadding && !disableExtraPadding,
          "remove-margin": !disableParagraphMargin,
          secondary: !disableSecondaryColor,
        }),
        className
      )}
    >
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
  disablePadding: false,
  disableExtraPadding: false,
  disableSecondaryColor: false,
  disableParagraphMargin: false,
};

CardContent.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  CardContent.displayName = "CardContent";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    CardContent.propTypes = {
      disablePadding: PropTypes.bool,
      disableExtraPadding: PropTypes.bool,
      disableParagraphMargin: PropTypes.bool,
      disableSecondaryColor: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}

export default CardContent;
