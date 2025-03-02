import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const sliderContainerStyles = bem("rmd-slider-container");
const sliderMarkStyles = bem("rmd-slider-mark");
const sliderMarkLabelStyles = bem("rmd-slider-mark-label");
const sliderThumbStyles = bem("rmd-slider-thumb");
const sliderTrackStyles = bem("rmd-slider-track");
const sliderValueTooltipStyles = bem("rmd-slider-tooltip");

/**
 * @since 6.0.0
 */
export interface SliderContainerClassNameOptions {
  className?: string;
  vertical?: boolean;
  beforeAddon?: boolean;
  afterAddon?: boolean;
}

/**
 * @since 6.0.0
 */
export function sliderContainer(
  options: SliderContainerClassNameOptions = {}
): string {
  const { className, vertical, beforeAddon, afterAddon } = options;

  return cnb(
    sliderContainerStyles({
      h: !vertical,
      "pad-left": !vertical && !beforeAddon,
      "pad-right": !vertical && !afterAddon,
      v: vertical,
      "pad-bottom": vertical && !beforeAddon,
      "pad-top": vertical && !afterAddon,
    }),
    className
  );
}

/**
 * @since 6.0.0
 */
export interface SliderMarkClassNameOptions {
  className?: string;
  active: boolean;
  vertical: boolean;
}

/**
 * @since 6.0.0
 */
export function sliderMark(options: SliderMarkClassNameOptions): string {
  const { className, active, vertical } = options;

  return cnb(
    sliderMarkStyles({
      active,
      inactive: !active,
      h: !vertical,
      v: vertical,
    }),
    className
  );
}

/**
 * @since 6.0.0
 */
export interface SliderMarkLabelClassNameOptions {
  className?: string;
  vertical: boolean;
}

/**
 * @since 6.0.0
 */
export function sliderMarkLabel(
  options: SliderMarkLabelClassNameOptions
): string {
  const { className, vertical } = options;

  return cnb(sliderMarkLabelStyles({ h: !vertical, v: vertical }), className);
}

/**
 * @since 6.0.0
 */
export interface SliderThumbClassNameOptions {
  className?: string;

  mask?: boolean;
  index: 1 | 2;
  active: boolean;
  animate: boolean;
  vertical: boolean;
  disabled: boolean;
}

/**
 * @since 6.0.0
 */
export function sliderThumb(options: SliderThumbClassNameOptions): string {
  const { className, mask, index, active, animate, disabled, vertical } =
    options;

  const isSecondThumb = index === 2;
  return cnb(
    sliderThumbStyles({
      h: !vertical,
      h1: !vertical && !isSecondThumb,
      h2: !vertical && isSecondThumb,
      v: vertical,
      v1: vertical && !isSecondThumb,
      v2: vertical && isSecondThumb,
      mask,
      "mask-h": mask && !vertical,
      "mask-v": mask && vertical,
      active,
      animate,
      disabled,
      "disabled-h": disabled && !vertical && !mask,
      "disabled-v": disabled && vertical && !mask,
    }),
    className
  );
}
/**
 * @since 6.0.0
 */
export interface SliderThumbInputClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function sliderThumbInput(
  options: SliderThumbInputClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(sliderThumbStyles("input"), className);
}

/**
 * @since 6.0.0
 */
export interface SliderTrackClassNameOptions {
  className?: string;
  animate?: boolean;
  disabled?: boolean;
  vertical: boolean;
  isRangeSlider: boolean;
}

/**
 * @since 6.0.0
 */
export function sliderTrack(options: SliderTrackClassNameOptions): string {
  const { className, animate, disabled, vertical, isRangeSlider } = options;
  return cnb(
    sliderTrackStyles({
      animate,
      disabled,
      hoverable: !disabled,
      h: !vertical,
      h1: !vertical && !isRangeSlider,
      h2: !vertical && isRangeSlider,
      v: vertical,
      v1: vertical && !isRangeSlider,
      v2: vertical && isRangeSlider,
    }),
    className
  );
}

/**
 * @since 6.0.0
 */
export interface SliderValueTooltipClassNameOptions {
  className?: string;
  index: 1 | 2;
  animate?: boolean;
  vertical: boolean;
}

/**
 * @since 6.0.0
 */
export function sliderValueTooltip(
  options: SliderValueTooltipClassNameOptions
): string {
  const { className, index, animate, vertical } = options;

  return cnb(
    sliderValueTooltipStyles({ h: !vertical, v: vertical }),
    animate && "rmd-slider-thumb--animate",
    `rmd-slider-thumb--${vertical ? "v" : "h"}${index}`,
    className
  );
}
