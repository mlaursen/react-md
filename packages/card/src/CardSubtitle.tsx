import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

const block = bem("rmd-card");

export interface CardSubtitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Boolean if the subtitle should no longer use the secondary text color
   * within cards.
   */
  disableSecondaryColor?: boolean;
}

/**
 * A subtitle for the `Card`. This is usually used with the `CardHeader`
 * component after the `CardTitle`.
 */
function CardSubtitle(
  {
    className,
    children,
    disableSecondaryColor = false,
    ...props
  }: CardSubtitleProps,
  ref?: Ref<HTMLHeadingElement>
): ReactElement {
  return (
    <h6
      {...props}
      ref={ref}
      className={cn(
        block("subtitle", { secondary: !disableSecondaryColor }),
        className
      )}
    >
      {children}
    </h6>
  );
}

const ForwardedCardSubtitle = forwardRef<HTMLHeadingElement, CardSubtitleProps>(
  CardSubtitle
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedCardSubtitle.propTypes = {
      className: PropTypes.string,
      disableSecondaryColor: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedCardSubtitle;
