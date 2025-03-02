import { type HTMLAttributes, type ReactElement } from "react";

import { sliderMark } from "./sliderStyles.js";

/**
 * @internal
 * @since 6.0.0
 */
export interface SliderMarkProps extends HTMLAttributes<HTMLSpanElement> {
  active: boolean;
  offset: string;
  vertical: boolean;
}

/**
 * @internal
 * @since 6.0.0
 */
export function SliderMark(props: SliderMarkProps): ReactElement {
  const { active, offset, vertical, style, className, ...remaining } = props;

  return (
    <span
      {...remaining}
      style={{ ...style, "--rmd-slider-mark-offset": offset }}
      className={sliderMark({ className, active, vertical })}
    />
  );
}
