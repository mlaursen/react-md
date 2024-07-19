import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import { type Margin } from "../cssUtils.js";
import {
  Typography,
  type CustomTypographyComponent,
  type TypographyProps,
} from "../typography/Typography.js";
import { type TypographyType } from "../typography/typographyStyles.js";

/**
 * @since 6.0.0 Inherits the `TypographyProps` instead of
 * `HTMLAttributes<HTMLHeadingElement>`.
 */
export interface DialogTitleProps extends TypographyProps {
  /** @defaultValue `"h2"` */
  as?: CustomTypographyComponent;

  /** @defaultValue `"headline-4"` */
  type?: TypographyType;

  /** @defaultValue `"none"` */
  margin?: Margin;
}

/**
 * The `DialogTitle` component is a simple `Typography` component wrapper with
 * sensible defaults to be rendered within a `Dialog`. Look at the `Dialog` or
 * `FixedDialog` components for example usage.
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
