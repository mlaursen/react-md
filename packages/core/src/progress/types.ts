import { type Ref } from "react";

import { type ThemeColor } from "../cssUtils.js";

/**
 * @since 6.0.0
 */
export type ProgressTheme = ThemeColor | "current-color";

/**
 * The base progress props for both the linear and circular progress components.
 *
 * @since 6.0.0 Added the `theme` prop.
 */
export interface ProgressProps {
  ref?: Ref<HTMLSpanElement>;

  /**
   * The id for the progress component. This is required for accessibility since
   * the progress will 99% of the time be describing the progress of something
   * else within the page. The element that is loading or tracking progress
   * should also be updated to have `aria-busy="true"` and
   * `aria-describedby="THIS_ID"`.
   *
   * @defaultValue `"circular-progress-" + useId() || "linear-progress-" + useId()`
   * @since 6.0.0 This prop is now optional.
   */
  id?: string;

  /**
   * The min value for the progress component. This is used to determine the
   * current progress percentage for screen readers and styles.
   *
   * @defaultValue `0`
   */
  min?: number;

  /**
   * The max value for the progress component. This is used to determine the
   * current progress percentage for screen readers and styles.
   *
   * @defaultValue `100`
   */
  max?: number;

  /**
   * The current value for the progress component. If this prop is omitted, the
   * progress component will be put in an "indeterminate" state which will just
   * infinitely loop an animation until it is unmounted.
   *
   * This value will be passed down as a percentage based on the `min` and `max`
   * props so that screen readers can be notified of changes.
   */
  value?: number;

  /**
   * Boolean if the determinate progress versions should animate when the value
   * changes. This should really only be enabled if you aren't getting quick
   * progress updates or the updates happen in chunks.
   *
   * @defaultValue `false`
   * @since 6.0.0 This was renamed from `animate` to
   * `disableTransition`.
   */
  disableTransition?: boolean;

  /**
   * @defaultValue `"primary"`
   * @since 6.0.0
   */
  theme?: ProgressTheme;
}
