import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import type {
  CustomTypographyComponent,
  TypographyProps,
  TypographyType,
} from "../typography/Typography";
import { Typography } from "../typography/Typography";
import { bem } from "../utils/bem";

const styles = bem("rmd-slider-mark-label");

/**
 * @remarks \@since 6.0.0
 */
export interface CustomizableSliderMarkLabelProps extends TypographyProps {
  /** @defaultValue `"span"` */
  as?: CustomTypographyComponent;

  /** @defaultValue `"body-2"` */
  type?: TypographyType;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface SliderMarkLabelProps extends CustomizableSliderMarkLabelProps {
  offset: string;
  vertical: boolean;
}

/**
 * **Server Component**
 *
 * @internal
 * @remarks \@since 6.0.0
 */
export function SliderMarkLabel(props: SliderMarkLabelProps): ReactElement {
  const {
    as = "span",
    type = "body-2",
    offset,
    vertical,
    style,
    className,
    children,
    ...remaining
  } = props;

  return (
    <Typography
      {...remaining}
      as={as}
      type={type}
      style={{ ...style, "--rmd-slider-mark-offset": offset }}
      className={cnb(styles({ h: !vertical, v: vertical }), className)}
    >
      {children}
    </Typography>
  );
}
