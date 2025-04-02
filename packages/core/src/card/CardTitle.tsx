import { forwardRef } from "react";

import {
  Typography,
  type TypographyHTMLElement,
  type TypographyProps,
} from "../typography/Typography.js";
import { cardTitle } from "./styles.js";

/**
 * @since 6.0.0 Extends the {@link TypographyProps} and removed the
 * `small`/`noWrap` props.
 */
export interface CardTitleProps extends TypographyProps {
  /** @defaultValue `"h5"` */
  as?: TypographyProps["as"];

  /** @defaultValue `"headline-5"` */
  type?: TypographyProps["type"];

  /** @defaultValue "none" */
  margin?: TypographyProps["margin"];
}

/**
 * @see {@link https://next.react-md.dev/components/card | Card Demos}
 * @since 6.0.0 Extends the {@link Typography} component and removed
 * the `small`/`noWrap` props.
 */
export const CardTitle = forwardRef<TypographyHTMLElement, CardTitleProps>(
  function CardTitle(props, ref) {
    const {
      children,
      as = "h5",
      type = "headline-5",
      margin = "none",
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
        className={cardTitle({ className })}
      >
        {children}
      </Typography>
    );
  }
);
