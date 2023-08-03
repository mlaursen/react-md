import { cnb } from "cnbuilder";
import type { HTMLAttributes, ReactElement } from "react";
import { bem } from "../utils/bem";

const styles = bem("rmd-slider-mark");

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface SliderMarkProps extends HTMLAttributes<HTMLSpanElement> {
  active: boolean;
  offset: string;
  vertical: boolean;
}

/**
 * **Server Component**
 *
 * @internal
 * @remarks \@since 6.0.0
 */
export function SliderMark(props: SliderMarkProps): ReactElement {
  const { active, offset, vertical, style, className, ...remaining } = props;

  return (
    <span
      {...remaining}
      style={{ ...style, "--rmd-slider-mark-offset": offset }}
      className={cnb(
        styles({
          active,
          inactive: !active,
          h: !vertical,
          v: vertical,
        }),
        className
      )}
    />
  );
}
