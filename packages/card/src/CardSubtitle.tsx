import React, { forwardRef, FC, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

const block = bem("rmd-card");

export interface CardSubtitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Boolean if the subtitle should no longer use the secondary text color within
   * cards.
   */
  disableSecondaryColor?: boolean;
}

type WithRef = WithForwardedRef<HTMLHeadingElement>;
type DefaultProps = Required<Pick<CardSubtitleProps, "disableSecondaryColor">>;

/**
 * A subtitle for the `Card`. This is usually used with the `CardHeader` component
 * after the `CardTitle`.
 */
const CardSubtitle: FC<CardSubtitleProps & WithRef> = ({
  className,
  forwardedRef,
  children,
  disableSecondaryColor,
  ...props
}) => (
  <h6
    {...props}
    className={cn(
      block("subtitle", { secondary: !disableSecondaryColor }),
      className
    )}
    ref={forwardedRef}
  >
    {children}
  </h6>
);

const defaultProps: DefaultProps = {
  disableSecondaryColor: false,
};

CardSubtitle.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  CardSubtitle.displayName = "CardSubtitle";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    CardSubtitle.propTypes = {
      disableSecondaryColor: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLHeadingElement, CardSubtitleProps>(
  (props, ref) => <CardSubtitle {...props} forwardedRef={ref} />
);
