import type { ReactNode } from "react";

/**
 * The height to apply to the list item.
 *
 * Conversions:
 *
 * - height !== "auto" -&gt; height
 * - secondaryText or left/right addon is media/media-large  -&gt; "extra-large"
 * - left/right addon is avatar -&gt; "large"
 * - left/right addon is icon -&gt; "medium"
 * - no addons and no secondary text -&gt; "normal"
 */
export type ListItemHeight =
  | "auto"
  | "normal"
  | "medium"
  | "large"
  | "extra-large";

export type ListItemAddonPosition = "top" | "middle" | "bottom";
export type ListItemAddonType = "icon" | "avatar" | "media" | "large-media";

export interface ListItemChildrenProps {
  /**
   * The main content to display. When the `textChildren` prop is enabled and
   * there is child content, it will be treated as primary text and update the
   * styles automatically.
   */
  children?: ReactNode;

  /**
   * An optional className to apply to the `<span>` that surrounds the
   * `primaryText` and optionally `secondaryText` within the list item.
   */
  textClassName?: string;

  /**
   * An optional className to apply to the `<span>` that surrounds the
   * `secondaryText` within the list item.
   */
  secondaryTextClassName?: string;

  /**
   *
   * @remarks \@since 6.0.0 Renamed from `textChildren` since it was defaulted on.
   * @defaultValue `false`
   */
  disableTextChildren?: boolean;

  /**
   * An optional element that should be rendered as the `primaryText` within the
   * list item. It is most likely easier to use the `children` prop instead, but
   * this allows you to create more complex components with the `ListItem` since
   * you can provided `children` and have the styles for the `primaryText` still
   * applied. By default, this will only allow one line of text and add ellipsis
   * for any text overflow.
   */
  primaryText?: ReactNode;

  /**
   * An optional element that should be rendered as the `secondaryText` within
   * the list item. By default, this will only span one line and add ellipsis
   * for overflow.
   */
  secondaryText?: ReactNode;

  /**
   * An optional addon to display to the left of the `primaryText` or
   * `children` and should be used with the `leftAddonType` prop to adjust
   * spacing.
   */
  leftAddon?: ReactNode;

  /**
   * The type of the addon that appears to the left of the `primaryText` or
   * `children`.
   *
   * @defaultValue `"icon"`
   */
  leftAddonType?: ListItemAddonType;

  /**
   * The vertical position the left icon, avatar, media, or large media
   * should be placed.
   *
   * @defaultValue `"middle"`
   */
  leftAddonPosition?: ListItemAddonPosition;

  /**
   * An optional addon to display to the right of the `primaryText` or
   * `children` and should be used with the `rightAddonType` prop to adjust
   * spacing.
   */
  rightAddon?: ReactNode;

  /**
   * The type of the addon that appears to the right of the `primaryText` or
   * `children`.
   *
   * @defaultValue `"icon"`
   */
  rightAddonType?: ListItemAddonType;

  /**
   * The vertical position the right icon, avatar, media, or large media
   * should be placed.
   *
   * @defaultValue `"middle"`
   */
  rightAddonPosition?: ListItemAddonPosition;

  /**
   * Boolean if the left and/or right addons should be "forcefully" wrapped in a
   * `<span>` with the spacing class names applied instead of attempting to
   * clone it into the provided icon element.
   */
  forceAddonWrap?: boolean;

  /**
   * @defaultValue `false`
   */
  threeLines?: boolean;
}
