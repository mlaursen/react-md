import { cnb } from "cnbuilder";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import type {
  ListItemAddonPosition,
  ListItemAddonType,
  ListItemHeight,
} from "./types.js";

const styles = bem("rmd-list-item");

/** @remarks \@since 6.0.0 */
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
  threeLines?: boolean;

  /**
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Note: This does nothing if the `disabled` prop is not enabled.
   *
   * @defaultValue `false`
   * @remarks \@since 2.4.3
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

/** @remarks \@since 6.0.0 */
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
 * @remarks \@since 6.0.0
 */
export function listItem(
  options: InternalListItemClassNameOptions = {}
): string {
  const {
    className,
    link = false,
    height = "auto",
    clickable = true,
    threeLines = false,
    disabled = false,
    disabledOpacity = false,
    pressedClassName,
  } = options;

  return cnb(
    styles({
      link,
      [height]: height !== "auto",
      "three-lines": threeLines,
      "disabled-color": disabled && !disabledOpacity,
      "disabled-opacity": disabled && disabledOpacity,
    }),
    cssUtils({ surface: clickable }),
    pressedClassName,
    className
  );
}

/** @remarks \@since 6.0.0 */
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
 * @remarks \@since 6.0.0
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

/** @remarks \@since 6.0.0 */
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
   * @remarks \@since 6.0.0
   */
  disableCenteredMedia?: boolean;
}

/**
 *
 * @remarks \@since 6.0.0
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
  } = options;

  const isMedia = type === "media" || type === "large-media";
  const isAvatar = type === "avatar";

  return cnb(
    styles("addon", {
      [position]: position !== "middle",
      before: !addonAfter,
      "avatar-before": !addonAfter && isAvatar,
      media: isMedia,
      "media-large": type === "large-media",
      "media-centered": isMedia && !disableCenteredMedia,
    }),
    className
  );
}
