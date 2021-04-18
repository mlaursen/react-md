import React, { ReactElement } from "react";
import cn from "classnames";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { Tooltip, TooltipProps } from "@react-md/tooltip";
import { bem } from "@react-md/utils";

import { ThumbIndex } from "./types";

const styles = bem("rmd-slider-value");

const HORIZONTAL_CLASS_NAMES: CSSTransitionClassNames = {
  enter: "rmd-slider-value--h-off",
  enterActive: "rmd-slider-value--h-on rmd-slider-value--animate",
  exit: "rmd-slider-value--animate",
  exitActive: "rmd-slider-value--h-off",
};

const VERTICAL_CLASS_NAMES: CSSTransitionClassNames = {
  enter: "rmd-slider-value--v-off",
  enterActive: "rmd-slider-value--v-on rmd-slider-value--animate",
  exit: "rmd-slider-value--animate",
  exitActive: "rmd-slider-value--v-off",
};

/**
 * @remarks \@since 2.5.0
 * @internal
 */
export interface SliderValueProps extends TooltipProps {
  index: ThumbIndex;
  animate: boolean;
  discrete: boolean;
  vertical: boolean;
}

/**
 * This component creates the "discrete" slider thumb value by rendering a
 * tooltip when needed.
 *
 * @remarks \@since 2.5.0
 * @internal
 */
export function SliderValue({
  index,
  animate,
  discrete,
  vertical,
  children,
  className,
  portal = false,
  ...props
}: SliderValueProps): ReactElement | null {
  if (!discrete) {
    return null;
  }

  return (
    <Tooltip
      {...props}
      portal={portal}
      className={cn(
        styles({
          h: !vertical,
          v: vertical,
        }),
        {
          "rmd-slider-thumb--animate": animate,
          [`rmd-slider-thumb--h${index + 1}`]: !vertical,
          [`rmd-slider-thumb--v${index + 1}`]: vertical,
        },
        className
      )}
      classNames={vertical ? VERTICAL_CLASS_NAMES : HORIZONTAL_CLASS_NAMES}
      position={vertical ? "left" : "above"}
      dense
    >
      {children}
    </Tooltip>
  );
}
