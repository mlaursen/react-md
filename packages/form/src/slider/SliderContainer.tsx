import { TextIconSpacing } from "@react-md/icon";
import { bem } from "@react-md/utils";
import cn from "classnames";
import React, { forwardRef, HTMLAttributes } from "react";
import { SliderAddons, SliderPresentation } from "./types";

const styles = bem("rmd-slider-container");

export interface SliderContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    SliderAddons,
    Pick<SliderPresentation, "vertical"> {}

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
