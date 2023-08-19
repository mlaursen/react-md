"use client";
import { cnb } from "cnbuilder";
import type { ReactElement, ReactNode } from "react";
import type { TooltipProps } from "../tooltip/Tooltip.js";
import { Tooltip } from "../tooltip/Tooltip.js";
import type { CSSTransitionClassNames } from "../transition/types.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-slider-tooltip");

const HORIZONTAL_CLASS_NAMES: CSSTransitionClassNames = {
  enter: "rmd-slider-tooltip--h-off",
  enterActive: "rmd-slider-tooltip--h-on rmd-slider-tooltip--animate",
  exit: "rmd-slider-tooltip--animate",
  exitActive: "rmd-slider-tooltip--h-off",
};

const VERTICAL_CLASS_NAMES: CSSTransitionClassNames = {
  enter: "rmd-slider-tooltip--v-off",
  enterActive: "rmd-slider-tooltip--v-on rmd-slider-tooltip--animate",
  exit: "rmd-slider-tooltip--animate",
  exitActive: "rmd-slider-tooltip--v-off",
};

/**
 * @internal
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Renamed from `SliderValueProps` to `SliderValueTooltipProps`.
 */
export interface SliderValueTooltipProps extends TooltipProps {
  index: 1 | 2;
  animate: boolean;
  vertical: boolean;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * This component creates the "discrete" slider thumb value by rendering a
 * tooltip when needed.
 *
 * @internal
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Renamed from `SliderValue` to `SliderValueTooltip`.
 */
export function SliderValueTooltip(
  props: SliderValueTooltipProps
): ReactElement {
  const {
    index,
    animate,
    vertical,
    className,
    children,
    classNames = vertical ? VERTICAL_CLASS_NAMES : HORIZONTAL_CLASS_NAMES,
    ...remaining
  } = props;

  return (
    <Tooltip
      dense
      disablePortal
      disableLineWrap
      className={cnb(
        styles({ h: !vertical, v: vertical }),
        animate && "rmd-slider-thumb--animate",
        `rmd-slider-thumb--${vertical ? "v" : "h"}${index}`,
        className
      )}
      classNames={classNames}
      {...remaining}
    >
      {children}
    </Tooltip>
  );
}
