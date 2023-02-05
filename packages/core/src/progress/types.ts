declare module "react" {
  interface CSSProperties {
    "--rmd-progress-background-color"?: string;
    "--rmd-progress-color"?: string;
    "--rmd-progress-circular-size"?: string | number;
    "--rmd-progress-circular-stroke-width"?: number;
    "--rmd-progress-linear-size"?: string | number;
  }
}

/**
 * The base progress props for both the linear and circular progress components.
 */
export interface ProgressProps {
  /**
   * The id for the progress component. This is required for accessibility since
   * the progress will 99% of the time be describing the progress of something
   * else within the page. The element that is loading or tracking progress
   * should also be updated to have `aria-busy="true"` and
   * `aria-describedby="THIS_ID"`.
   *
   * @defaultValue `"circular-progress-" useId() || "linear-progress-" + useId()`
   * @remarks \@since 6.0.0 This prop is now optional.
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
   * @remarks \@since 6.0.0 This was renamed from `animate` to
   * `disableTransition`.
   */
  disableTransition?: boolean;
}
