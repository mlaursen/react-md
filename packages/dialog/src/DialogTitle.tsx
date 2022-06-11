import type {
  CustomTypographyComponent,
  TypographyMargin,
  TypographyProps,
  TypographyType,
} from "@react-md/core";
import { Typography } from "@react-md/core";
import { cnb } from "cnbuilder";
import { forwardRef } from "react";

/**
 * @remarks \@since 6.0.0 Inherits the `TypographyProps` instead of
 * `HTMLAttributes<HTMLHeadingElement>`.
 */
export interface DialogTitleProps extends TypographyProps {
  /** @defaultValue `"h2"` */
  as?: CustomTypographyComponent;

  /** @defaultValue `"headline-4"` */
  type?: TypographyType;

  /** @defaultValue `"none"` */
  margin?: TypographyMargin;
}

/**
 * This component adds some base styles to an `<h2>` element for a title within
 * a `Dialog`.
 */
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle(
    {
      as = "h2",
      type = "headline-4",
      margin = "none",
      children,
      className,
      ...props
    },
    ref
  ) {
    return (
      <Typography
        {...props}
        ref={ref}
        as={as}
        type={type}
        margin={margin}
        // Note: This class applies no styles at this time
        className={cnb("rmd-dialog__title", className)}
      >
        {children}
      </Typography>
    );
  }
);
