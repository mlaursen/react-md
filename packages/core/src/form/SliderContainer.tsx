import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { sliderContainer } from "./sliderStyles.js";

/**
 * @since 2.5.0
 * @since 6.0.0 Renamed from `SliderAddons` to `SliderContainerAddonProps`
 */
export interface SliderAddonProps {
  /**
   * An optional addon to render before the slider's track. This can be anything
   * and will be wrapped in the `TextIconSpacing` component.
   *
   * When the `vertical` prop is enabled, the addon will appear underneath the
   * track.
   */
  beforeAddon?: ReactNode;

  /**
   * An optional addon to render after the slider's track. This can be anything
   * and will be wrapped in the `TextIconSpacing` component.
   *
   * When the `vertical` prop is enabled, the addon will appear above the track.
   */
  afterAddon?: ReactNode;
}

/**
 * @internal
 * @since 2.5.0
 * @since 6.0.0 Removed the `label` support since you'll generally want to use
 * a `Fieldset` instead.
 */
export interface SliderContainerProps
  extends HTMLAttributes<HTMLDivElement>, SliderAddonProps {
  ref?: Ref<HTMLDivElement>;

  vertical: boolean;
}

/**
 * The `SliderContainer` component is mostly an internal component that is
 * built-in to the `Slider` and `RangeSlider` components to add addons to the
 * left or right of the `SliderTrack`. When vertical, it will add addons to the
 * bottom or top instead.
 *
 * @internal
 * @since 2.5.0
 * @since 6.0.0 Removed the `label` support since you'll generally want to use
 * a `Fieldset` instead.
 */
export function SliderContainer(props: SliderContainerProps): ReactElement {
  const {
    ref,
    className,
    children,
    beforeAddon,
    afterAddon,
    vertical,
    ...remaining
  } = props;

  return (
    <div
      {...remaining}
      ref={ref}
      className={sliderContainer({
        className,
        vertical,
        beforeAddon: !!beforeAddon,
        afterAddon: !!afterAddon,
      })}
    >
      {beforeAddon}
      {children}
      {afterAddon}
    </div>
  );
}
