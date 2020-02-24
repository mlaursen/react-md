import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Boolean if the title should be smaller than normal. You should usually
   * enable this prop when using the `CardSubtitle` with this component in the
   * `CardHeader`.
   */
  small?: boolean;

  /**
   * Boolean if the title should not be able to line-wrap and will ellipsis long
   * text.
   */
  noWrap?: boolean;
}

const block = bem("rmd-card");

function CardTitle(
  {
    className,
    children,
    small = false,
    noWrap = false,
    ...props
  }: CardTitleProps,
  ref?: Ref<HTMLHeadingElement>
): ReactElement {
  return (
    <h5
      {...props}
      ref={ref}
      className={cnb(
        block("title", { small }),
        {
          "rmd-card--no-wrap": noWrap,
        },
        className
      )}
    >
      {children}
    </h5>
  );
}

const ForwardedCardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  CardTitle
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedCardTitle.propTypes = {
      small: PropTypes.bool,
      noWrap: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedCardTitle;
