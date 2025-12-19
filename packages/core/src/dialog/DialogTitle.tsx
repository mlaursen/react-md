import { cnb } from "cnbuilder";
import { type ReactElement, type Ref } from "react";

import { type Margin } from "../cssUtils.js";
import {
  type CustomTypographyComponent,
  Typography,
  type TypographyProps,
} from "../typography/Typography.js";
import { type TypographyType } from "../typography/typographyStyles.js";

/**
 * @since 6.0.0 Inherits the `TypographyProps` instead of
 * `HTMLAttributes<HTMLHeadingElement>`.
 */
export interface DialogTitleProps extends TypographyProps {
  ref?: Ref<HTMLHeadingElement>;

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
 *
 * @see {@link https://react-md.dev/components/dialog | Dialog Demos}
 */
export function DialogTitle(props: DialogTitleProps): ReactElement {
  const {
    ref,
    as = "h2",
    type = "headline-4",
    margin = "none",
    children,
    className,
    ...remaining
  } = props;

  return (
    <Typography
      {...remaining}
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
