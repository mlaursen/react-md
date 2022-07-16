import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type {
  ListItemAddonPosition,
  ListItemAddonType,
  ListItemHeight,
} from "./types";

const listStyles = bem("rmd-list");
const itemStyles = bem("rmd-list-item");
const subheaderStyles = bem("rmd-list-subheader");

/** @remarks \@since 6.0.0 */
export interface ListClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * @defaultValue `false`
   */
  horizontal?: boolean;
}

export function list(options: ListClassNameOptions = {}): string {
  const { dense = false, horizontal = false, className } = options;

  return cnb(
    listStyles({
      dense,
      horizontal,
    }),
    className
  );
}

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
}

/** @remarks \@since 6.0.0 */
export interface InternalListItemClassNameOptions
  extends ListItemClassNameOptions {
  /**
   * This is prop is used internally when integrating with the
   * {@link useElementInteraction} hook.
   */
  pressedClassName?: string;
}

export function listItem(
  options: InternalListItemClassNameOptions = {}
): string {
  const {
    className,
    height = "auto",
    threeLines = false,
    disabled = false,
    disabledOpacity = false,
    pressedClassName,
  } = options;

  return cnb(
    itemStyles({
      [height]: height !== "auto",
      "three-lines": threeLines,
      disabled,
      "disabled-color": disabled && !disabledOpacity,
      "disabled-opacity": disabled && disabledOpacity,
    }),
    pressedClassName,
    className
  );
}

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

export function listItemTExt(
  options: ListItemTextClassNameOptions = {}
): string {
  const { className, secondary = false, clamped = false } = options;

  return cnb(
    itemStyles("text", {
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
    itemStyles("addon", {
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

/** @remarks \@since 6.0.0 */
export interface ListSubheaderClassNameOptions {
  className?: string;

  /**
   * Boolean if the subheader should be inset to match the `ListItem` text
   * keyline.
   *
   * @defaultValue `false`
   */
  inset?: boolean;
}

export function listSubheader(options: ListSubheaderClassNameOptions): string {
  const { inset = false, className } = options;

  return cnb(
    subheaderStyles({
      inset,
    }),
    className
  );
}
