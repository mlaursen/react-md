import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-divider");

declare module "react" {
  interface CSSProperties {
    "--rmd-divider-size"?: string | number;
    "--rmd-divider-vertical-size"?: string | number;
    "--rmd-divider-color"?: string;
    "--rmd-divider-spacing"?: string | number;
    "--rmd-divider-vertical-spacing"?: string | number;
    "--rmd-divider-inset"?: string | number;
    "--rmd-divider-max-size"?: string | number;
  }
}

/** @since 6.0.0 */
export interface DividerClassNameOptions {
  className?: string;

  /**
   * Boolean if the divider should appear inset instead of full width. This
   * really just applied a margin-left (or margin-right when dir="rtl").
   *
   * If you want to create a divider that is centered, you most likely want to
   * use the `rmd-divider-theme-update-var` mixin instead to update the
   * `max-size` of the divider.
   *
   * @defaultValue `false`
   */
  inset?: boolean;

  /**
   * Boolean if the divider should be vertical instead of horizontal. This will
   * change the divider to be rendered as a `<div>` instead of an `<hr>`.
   *
   * Note: If your parent element of the divider does not have a static height
   * set, you **must** manually set the height of the divider to a static
   * non-percentage number OR use the `VerticalDivider` component instead to
   * automagically create a valid percentage height.
   *
   * @defaultValue `false`
   */
  vertical?: boolean;
}

/**
 * @since 6.0.0
 */
export function divider(options: DividerClassNameOptions = {}): string {
  const { inset = false, vertical = false, className } = options;

  return cnb(
    styles({
      inset: inset && !vertical,
      vertical,
    }),
    className
  );
}
