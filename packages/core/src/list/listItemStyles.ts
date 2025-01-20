import { cnb } from "cnbuilder";

import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import {
  type ListItemAddonPosition,
  type ListItemAddonType,
  type ListItemHeight,
} from "./types.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-list-item-keyline"?: string | number;
    "--rmd-list-item-padding-h"?: string | number;
    "--rmd-list-item-padding-v"?: string | number;
    "--rmd-list-item-height"?: string | number;
    "--rmd-list-item-medium-height"?: string | number;
    "--rmd-list-item-large-height"?: string | number;
    "--rmd-list-item-extra-large-height"?: string | number;
    "--rmd-list-item-multiline-clamp"?: string | number;
    "--rmd-list-item-multiline-height"?: string | number;
    "--rmd-list-item-media-size"?: string | number;
    "--rmd-list-item-media-spacing"?: string | number;
    "--rmd-list-item-text-multiline-height"?: string | number;
  }
}

const styles = bem("rmd-list-item");

/** @since 6.0.0 */
export interface ListItemClassNameOptions {
  className?: string;
  /**
   * @see {@link ListItemHeight}
   * @defaultValue `"auto"`
   */
  height?: ListItemHeight;

  /**
   * @defaultValue `false`
   */
  multiline?: boolean;

  /**
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Note: This does nothing if the `disabled` prop is not enabled.
   *
   * @defaultValue `false`
   * @since 2.4.3
   */
  disabledOpacity?: boolean;

  /**
   * Set this to `false` if the list item should not gain the interaction
   * states: hover, focus, press, etc. This is kind of like being disabled
   * without the disabled styles being applied.
   *
   * @defaultValue `true`
   */
  clickable?: boolean;
}

/** @since 6.0.0 */
export interface InternalListItemClassNameOptions
  extends ListItemClassNameOptions {
  /**
   * @defaultValue `false`
   */
  link?: boolean;

  /**
   * This is prop is used internally when integrating with the
   * {@link useElementInteraction} hook.
   */
  pressedClassName?: string;
}

/**
 * @since 6.0.0
 */
export function listItem(
  options: InternalListItemClassNameOptions = {}
): string {
  const {
    className,
    link = false,
    height = "auto",
    clickable = true,
    multiline = false,
    disabled = false,
    disabledOpacity = false,
    pressedClassName,
  } = options;

  return cnb(
    styles({
      link,
      [height]: height !== "auto",
      multiline,
      "disabled-color": disabled && !disabledOpacity,
      "disabled-opacity": disabled && disabledOpacity,
    }),
    cssUtils({ surface: clickable }),
    pressedClassName,
    className
  );
}

/** @since 6.0.0 */
export interface ListItemTextClassNameOptions {
  className?: string;
  /**
   * @defaultValue `false`
   */
  clamped?: boolean;

  /**
   * @defaultValue `false`
   */
  secondary?: boolean;
}

/**
 * @since 6.0.0
 */
export function listItemText(
  options: ListItemTextClassNameOptions = {}
): string {
  const { className, secondary = false, clamped = false } = options;

  return cnb(
    styles("text", {
      clamped: secondary && clamped,
      secondary,
    }),
    className
  );
}

/** @since 6.0.0 */
export interface ListItemAddonClassNameOptions {
  className?: string;

  /**
   * The addon type that is used to adjust the spacing styles.
   *
   * @defaultValue `"icon"`
   */
  type?: ListItemAddonType;

  /**
   * The vertical position to use for the addon.
   *
   * @defaultValue `"middle"`
   */
  position?: ListItemAddonPosition;

  /**
   * Boolean if the addon should appear after the `children`.
   *
   * @defaultValue `false`
   */
  addonAfter?: boolean;

  /**
   * The media items are centered by default using:
   * ```scss
   * align-items: center;
   * display: flex;
   * justify-content: center;
   * ```
   *
   * When this is set to `true`, the flex styles will not be applied.
   *
   * @defaultValue `false`
   * @since 6.0.0
   */
  disableCenteredMedia?: boolean;

  /**
   * Set this to `true` to disable the additional spacing applied to the addons
   * that appear before the `children` and the normal `--rmd-text-icon-spacing`
   * value is used instead.
   *
   * @defaultValue `false`
   */
  disableBeforeSpacing?: boolean;
}

/**
 *
 * @since 6.0.0
 */
export function listItemAddon(
  options: ListItemAddonClassNameOptions = {}
): string {
  const {
    type = "icon",
    position = "middle",
    className,
    addonAfter = false,
    disableCenteredMedia = false,
    disableBeforeSpacing = false,
  } = options;

  const isMedia = type === "media" || type === "large-media";
  const isAvatar = type === "avatar";

  return cnb(
    styles("addon", {
      [position]: position !== "middle",
      before: !disableBeforeSpacing && !addonAfter,
      "avatar-before": !disableBeforeSpacing && !addonAfter && isAvatar,
      media: isMedia,
      "media-large": type === "large-media",
      "media-centered": isMedia && !disableCenteredMedia,
    }),
    className
  );
}
