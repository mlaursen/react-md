import { type HTMLAttributes, type ReactNode } from "react";

import { type PropsWithRef } from "../types.js";

/**
 * The height to apply to the list item.
 *
 * Conversions:
 *
 * - height !== undefined && height !== "auto" -&gt; height
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

/** @since 6.0.0 */
export interface ListItemChildrenAddonProps {
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
   * @since 6.0.0
   */
  leftAddonClassName?: string;

  /**
   * Set this to `true` if your addon does not accept a `className` prop to
   * apply the correct styling.
   *
   * @defaultValue `leftAddonType === "media" || leftAddonType === "large-media"`
   * @since 6.0.0
   */
  leftAddonForceWrap?: boolean;

  /**
   * Set this to `true` to disable the additional spacing applied to the addons
   * that appear before the `children` and the normal `--rmd-text-icon-spacing`
   * value is used instead.
   *
   * @defaultValue `false`
   */
  disableLeftAddonSpacing?: boolean;

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
   * @since 6.0.0
   */
  rightAddonClassName?: string;

  /**
   * Set this to `true` if your addon does not accept a `className` prop to
   * apply the correct styling.
   *
   * @defaultValue `rightAddonType === "media" || rightAddonType === "large-media"`
   * @since 6.0.0
   */
  rightAddonForceWrap?: boolean;

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
  disableLeftAddonCenteredMedia?: boolean;

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
  disableRightAddonCenteredMedia?: boolean;
}

/**
 * Note: This interface was added since there are components that replace the
 * {@link ListItemChildrenAddonProps} with renamed versions but should still
 * support everything for rendering text.
 *
 * @since 6.0.0
 */
export interface ListItemChildrenTextProps {
  /**
   * The main content to display that defaults to being wrapped in the
   * `ListItemText` component. Enable the {@link disableTextChildren} prop to
   * render without the additional `ListItemText` wrapper.
   */
  children?: ReactNode;

  /**
   * Any additional props that should be passed to the `<span>` surrounding
   * the {@link children}, {@link primaryText}, and {@link secondaryText}.
   *
   * @since 6.0.0
   */
  textProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>>;

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
   * Set this to `true` if the {@link children} should not automatically be
   * wrapped in the `ListItemText` component.
   *
   * @since 6.0.0 Renamed from `textChildren` since it was defaulted on.
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
   * Any additional props that should be passed to the `<span>` surrounding
   * the {@link secondaryText}.
   *
   * @since 6.0.0
   */
  secondaryTextProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>>;

  /**
   * Set this to `true` to allow the {@link secondaryText} to span multiple
   * lines and use the CSS clamp after two lines of text are visible. The number
   * of lines can be configured by `core.$list-item-multiline-clamp` or
   * `@include core.list-set-var(item-multiline-clamp, $new-value)`.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp}
   * @defaultValue `false`
   */
  multiline?: boolean;
}

/**
 * @since 6.0.0 Extends the `ListItemChildrenTextProps` and
 * `ListItemChildrenAddonProps` interfaces.
 * @since 6.0.0 Added `textProps` and `secondaryTextClassName`
 * @since 6.0.0 Renamed `textChildren` to `disableTextChildren`
 */
export interface ListItemChildrenProps
  extends ListItemChildrenTextProps,
    ListItemChildrenAddonProps {}
