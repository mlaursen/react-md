import { cnb } from "cnbuilder";

import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type TabListProps } from "./TabList.js";
import { tabIndicator } from "./tabIndicatorStyles.js";

const styles = bem("rmd-tab");

declare module "react" {
  interface CSSProperties {
    "--rmd-tab-color"?: string;
    "--rmd-tab-active-color"?: string;
    "--rmd-tab-inactive-color"?: string;
    "--rmd-tab-disabled-color"?: string;
    "--rmd-tab-indicator-background"?: string;
    "--rmd-tab-min-height"?: string;
    "--rmd-tab-min-width"?: string;
    "--rmd-tab-max-width"?: string;
    "--rmd-tab-stacked-height"?: string;
    "--rmd-tab-stacked-width"?: string;
    "--rmd-tab-padding"?: string | number;
    "--rmd-tab-stacked-padding"?: string | number;
  }
}

/**
 * @since 6.3.1
 */
export interface BaseTabClassNameOptions {
  className?: string;

  /**
   * Set this to `true` if the {@link TabListProps.disableTransition} prop has
   * also been set to `true` to disable an active indicator below the tab when
   * {@link active} is `true`.
   *
   * @defaultValue `false`
   */
  activeIndicator?: boolean;

  /**
   * Set this to `true` when rendering the tabs vertically and
   * {@link activeIndicator} has been enabled.
   *
   * @defaultValue !false
   */
  verticalActiveIndicator?: boolean;

  /**
   * Set this to `true` to render the {@link icon} and {@link children} stacked
   * instead of horizontally.
   *
   * @defaultValue `false`
   */
  stacked?: boolean;
}

/**
 * @since 6.0.0
 * @since 6.3.1 Extends BaseTabClassNameOptions
 */
export interface TabClassNameOptions extends BaseTabClassNameOptions {
  active?: boolean;
  isLink?: boolean;
  reversed?: boolean;
  disabled?: boolean;
}

/**
 * @since 6.0.0
 */
export function tab(options: TabClassNameOptions = {}): string {
  const {
    className,
    active,
    isLink,
    stacked,
    reversed,
    disabled,
    activeIndicator,
    verticalActiveIndicator,
  } = options;

  return cnb(
    styles({
      active,
      reversed: reversed && !stacked,
      stacked,
      "stacked-reversed": stacked && reversed,
      disabled,
    }),
    active &&
      activeIndicator &&
      tabIndicator({ vertical: verticalActiveIndicator }),
    cssUtils({ surface: true, textDecoration: isLink ? "none" : undefined }),
    className
  );
}
