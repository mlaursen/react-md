import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import { bem } from "@react-md/utils";

import { SliderAddons, SliderPresentation } from "./types";

const styles = bem("rmd-slider-container");

export interface SliderContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    SliderAddons,
    Pick<SliderPresentation, "vertical"> {}

/**
 * The `SliderContainer` component is mostly an interal component that is
 * built-in to the `SimpleSlider` and `RangeSlider` components to add addons
 * to the left or right of the `SliderTrack`. When vertical, it will add
 * addons to the bottom or top instead.
 */
export const SliderContainer = forwardRef<HTMLDivElement, SliderContainerProps>(
  function SliderContainer(
    {
      className,
      beforeAddon,
      afterAddon,
      children,
      vertical = false,
      ...props
    },
    ref
  ) {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          styles({
            h: !vertical,
            "pad-left": !vertical && !beforeAddon,
            "pad-right": !vertical && !afterAddon,
            "pad-bottom": vertical && !beforeAddon,
            "pad-top": vertical && !afterAddon,
            v: vertical,
          }),
          className
        )}
      >
        <TextIconSpacing icon={beforeAddon}>
          <TextIconSpacing icon={afterAddon} iconAfter>
            {children}
          </TextIconSpacing>
        </TextIconSpacing>
      </div>
    );
  }
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    SliderContainer.propTypes = {
      className: PropTypes.string,
      beforeAddon: PropTypes.node,
      afterAddon: PropTypes.node,
      children: PropTypes.node,
      vertical: PropTypes.bool,
    };
  } catch (e) {}
}
