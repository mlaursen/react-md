import { type ReactElement, type Ref } from "react";

import {
  Typography,
  type TypographyHTMLElement,
  type TypographyProps,
} from "../typography/Typography.js";
import { cardSubtitle } from "./styles.js";

/**
 * @since 6.0.0 Extends the {@link TypographyProps} and removed the
 * `noWrap`/`disableSecondaryColor` props.
 */
export interface CardSubtitleProps extends TypographyProps {
  ref?: Ref<TypographyHTMLElement>;

  /** @defaultValue `"h6"` */
  as?: TypographyProps["as"];

  /** @defaultValue `"subtitle-2"` */
  type?: TypographyProps["type"];

  /** @defaultValue `"none"` */
  margin?: TypographyProps["margin"];

  /**
   * Set this to `null` to inherit the current color.
   *
   * @defaultValue `"text-secondary"`
   */
  textColor?: TypographyProps["textColor"];
}

/**
 * @see {@link https://react-md.dev/components/card | Card Demos}
 * @since 6.0.0 Extends the {@link Typography} component and removed the
 * `noWrap`/`disableSecondaryColor` props.
 */
export const CardSubtitle = function CardSubtitle(
  props: CardSubtitleProps
): ReactElement {
  const {
    ref,
    children,
    as = "h6",
    type = "subtitle-2",
    margin = "none",
    textColor = "text-secondary",
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
      textColor={textColor}
      className={cardSubtitle({ className })}
    >
      {children}
    </Typography>
  );
};
