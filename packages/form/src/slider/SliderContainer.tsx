import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import { bem } from "@react-md/utils";

import { SliderAddons, SliderLabelProps, SliderPresentation } from "./types";
import { labelStyles } from "../label";

const styles = bem("rmd-slider-container");

/**
 * @remarks \@since 2.5.0
 */
export interface SliderContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    SliderLabelProps,
    SliderAddons,
    Pick<SliderPresentation, "vertical"> {
  /**
   * This is _really_ only required when the `label` prop is also provided, but
   * since this component is only really used internally for the `Slider` and
   * `RangeSlider`, it is required since they always pass one in.
   */
  labelId: string;

  /**
   * Boolean if the `Slider` or `RangeSlider` are disabled so that the `label`
   * can also be `disabled`.
   */
  disabled?: boolean;
}

/**
 * The `SliderContainer` component is mostly an interal component that is
 * built-in to the `Slider` and `RangeSlider` components to add addons to the
 * left or right of the `SliderTrack`. When vertical, it will add addons to the
 * bottom or top instead.
 *
 * @remarks \@since 2.5.0
 */
export const SliderContainer = forwardRef<HTMLDivElement, SliderContainerProps>(
  function SliderContainer(
    {
      className,
      beforeAddon,
      afterAddon,
      children,
      vertical = false,
      label,
      labelId,
      labelProps,
      disabled = false,
      ...props
    },
    ref
  ) {
    return (
      <>
        {label && (
          <span
            {...labelProps}
            id={labelId}
            className={cn(labelStyles({ disabled }), labelProps?.className)}
          >
            {label}
          </span>
        )}
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
          <TextIconSpacing
            icon={beforeAddon}
            stacked={vertical}
            flexReverse={vertical}
          >
            <TextIconSpacing
              icon={afterAddon}
              iconAfter
              stacked={vertical}
              flexReverse={vertical}
            >
              {children}
            </TextIconSpacing>
          </TextIconSpacing>
        </div>
      </>
    );
  }
);

/* istanbul ignore next */
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
