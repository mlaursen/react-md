import { type ReactElement, type Ref } from "react";

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
  ref?: Ref<TypographyHTMLElement>;

  /** @defaultValue `"h5"` */
  as?: TypographyProps["as"];

  /** @defaultValue `"headline-5"` */
  type?: TypographyProps["type"];

  /** @defaultValue "none" */
  margin?: TypographyProps["margin"];
}

/**
 * @see {@link https://react-md.dev/components/card | Card Demos}
 * @since 6.0.0 Extends the {@link Typography} component and removed
 * the `small`/`noWrap` props.
 */
export function CardTitle(props: CardTitleProps): ReactElement {
  const {
    ref,
    as = "h5",
    type = "headline-5",
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
      className={cardTitle({ className })}
    >
      {children}
    </Typography>
  );
}
