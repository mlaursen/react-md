import { type ReactElement } from "react";

import {
  type CustomTypographyComponent,
  Typography,
  type TypographyProps,
} from "../typography/Typography.js";
import { type TypographyType } from "../typography/typographyStyles.js";
import { sliderMarkLabel } from "./sliderStyles.js";

/**
 * @since 6.0.0
 */
export interface CustomizableSliderMarkLabelProps extends TypographyProps {
  /** @defaultValue `"span"` */
  as?: CustomTypographyComponent;

  /** @defaultValue `"body-2"` */
  type?: TypographyType;
}

/**
 * @internal
 * @since 6.0.0
 */
export interface SliderMarkLabelProps extends CustomizableSliderMarkLabelProps {
  offset: string;
  vertical: boolean;
}

/**
 * @internal
 * @since 6.0.0
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
      className={sliderMarkLabel({ className, vertical })}
    >
      {children}
    </Typography>
  );
}
