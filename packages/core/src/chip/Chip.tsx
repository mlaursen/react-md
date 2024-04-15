"use client";
import { cnb } from "cnbuilder";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { type BackgroundColor } from "../cssUtils.js";
import { getIcon } from "../icon/iconConfig.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren.js";
import { useMaxWidthTransition } from "../transition/useMaxWidthTransition.js";
import { type PropsWithRef } from "../types.js";
import { chip, chipContent } from "./styles.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-chip-solid-background-color"?: string;
    "--rmd-chip-solid-disabled-background-color"?: string;
    "--rmd-chip-solid-color"?: string;
    "--rmd-chip-theme-background-color"?: string;
    "--rmd-chip-theme-color"?: string;
    "--rmd-chip-outline-background-color"?: string;
    "--rmd-chip-outline-color"?: string;
  }
}

/**
 * @since 6.0.0 Renamed the `noninteractive` prop to
 * `noninteractable`.
 */
export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @defaultValue `"solid"`
   */
  theme?: "outline" | "solid";

  /**
   * Set this to `true` if the chip should gain additional box shadow while the
   * user is pressing down on the chip.
   *
   * @defaultValue `false`
   */
  raisable?: boolean;

  /**
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * When this is a boolean, a selected icon will be displayed before the
   * `children` and appear/disappear when `true`/`false`.
   *
   * @see {@link selectedIcon}
   * @see {@link selectedIconAfter}
   * @see {@link selectedThemed}
   */
  selected?: boolean;

  /**
   * Set this to `true` if the chip should change background color while
   * {@link selected} instead of displaying an icon. The default background
   * color is a lighter swatch of the theme primary color.
   *
   * @defaultValue `false`
   */
  selectedThemed?: boolean;

  /**
   * An optional className to provide only while {@link selected} is `true`.
   */
  selectedClassName?: string;

  /**
   * This will be ignored if {@link selected} is `undefined`.
   *
   * @defaultValue `getIcon("selected")`
   */
  selectedIcon?: ReactNode;

  /**
   * Set this to `true` if the {@link selectedIcon} should display as the
   * {@link rightAddon} instead of the {@link leftAddon}.
   *
   * @defaultValue `false`
   * @since 6.0.0
   */
  selectedIconAfter?: boolean;

  /**
   * Set this to `true` if the {@link selectedIcon} should not animate and
   * instead apply `display: none`
   *
   * @defaultValue `false`
   */
  disableIconTransition?: boolean;

  /**
   * Set this to `true` to render the chip as a `<span>` instead of a button.
   *
   * @since 2.6.0
   * @since 6.0.0 Renamed from `noninteractable`
   * @defaultValue `false`
   */
  noninteractive?: boolean;

  /**
   * An optional background color theme to use.
   *
   * @since 6.0.0
   */
  backgroundColor?: BackgroundColor;

  /**
   * An optional icon, avatar, circular progress, or custom component to render
   * before the `children`. This will remove some of the leading horizontal
   * padding on the chip as well.
   */
  leftAddon?: ReactNode;

  /**
   * An optional icon, avatar, circular progress, or custom component to render
   * after the `children`. This will remove some of the trailing horizontal
   * padding on the chip as well.
   */
  rightAddon?: ReactNode;

  /**
   * Set this to true if the `children` should not be wrapped in a span to apply
   * the {@link chipContent} styles which allow for shrinking text and
   * truncating text with ellipsis.
   *
   * @defaultValue `false`
   */
  disableContentWrap?: boolean;

  /**
   * This will be ignored if {@link disableContentWrap} is `true`.
   *
   * @since 6.0.0
   */
  contentProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

  /**
   * This will be ignored if {@link disableContentWrap} is `true`.
   */
  contentStyle?: CSSProperties;

  /**
   * This will be ignored if {@link disableContentWrap} is `true`.
   */
  contentClassName?: string;
}

/**
 * **Server Component**
 *
 * @example Simple Example
 * ```tsx
 * import { Chip } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return <Chip>Content</Chip>;
 * }
 * ```
 *
 * @example Outlined Example
 * ```tsx
 * import { Chip } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return <Chip theme="outline">Content</Chip>;
 * }
 * ```
 *
 * @example Addons Example
 * ```tsx
 * import { Avatar, Chip } from "@react-md/core";
 * import AddCircleIcon from "@react-md/material-icons/AddCircleIcon";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Chip
 *       leftAddon={
 *         <Avatar>
 *           <img src="https://i.pravatar.cc/40?img=3" alt="" />
 *         </Avatar>
 *       }
 *       rightAddon={<AddCircleIcon />}
 *     >
 *       Chip
 *     </Chip>
 *   );
 * }
 * ```
 *
 * @since 6.0.0 Renamed the `noninteractable` prop to
 * `noninteractive`.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  function Chip(props, ref) {
    const {
      "aria-pressed": ariaPressed,
      theme = "solid",
      className,
      raisable = false,
      disabled = false,
      selected,
      selectedThemed = false,
      selectedClassName,
      selectedIcon: propSelectedIcon,
      selectedIconAfter = false,
      backgroundColor,
      noninteractive = false,
      disableIconTransition = false,
      children: propChildren,
      onClick,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onDragStart,
      onTouchStart,
      onTouchEnd,
      onTouchMove,
      leftAddon: propLeftAddon,
      rightAddon: propRightAddon,
      contentProps,
      contentStyle,
      contentClassName,
      disableContentWrap = false,
      ...remaining
    } = props;

    let buttonProps: ButtonHTMLAttributes<HTMLButtonElement> | undefined;
    if (!noninteractive) {
      buttonProps = {
        "aria-pressed": ariaPressed ?? (!!selected || undefined),
        type: "button",
        disabled,
      };
    }

    let content = propChildren;
    if (!disableContentWrap) {
      content = (
        <span
          style={contentStyle}
          {...contentProps}
          className={cnb(
            chipContent({ className: contentClassName }),
            contentProps?.className
          )}
        >
          {propChildren}
        </span>
      );
    }

    let leftAddon = propLeftAddon;
    let rightAddon = propRightAddon;
    const selectedIconNode = getIcon("selected", propSelectedIcon);
    const isTransitionable =
      !selectedThemed &&
      typeof selected === "boolean" &&
      typeof (selectedIconAfter ? propRightAddon : propLeftAddon) ===
        "undefined";
    const selectedIcon = useMaxWidthTransition({
      element: selectedIconNode,
      transitionIn: !!selected,
      disabled: !isTransitionable,
      disableTransition: disableIconTransition,
    });
    if (isTransitionable) {
      if (selectedIconAfter) {
        rightAddon = selectedIcon;
      } else {
        leftAddon = selectedIcon;
      }
    }

    const { pressed, pressedClassName, ripples, handlers } =
      useElementInteraction({
        onClick,
        onKeyDown,
        onKeyUp,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        onDragStart,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
        disabled: disabled || noninteractive,
      });
    const children = useHigherContrastChildren(content);
    const Component = noninteractive ? "span" : "button";

    return (
      <Component
        {...remaining}
        {...buttonProps}
        {...handlers}
        className={chip({
          className,
          theme,
          pressed: raisable && pressed,
          disabled,
          selected,
          selectedThemed,
          selectedClassName,
          noninteractive,
          backgroundColor,
          pressedClassName,
          leftAddon: !!leftAddon && (selectedIconAfter || selected !== false),
          rightAddon:
            !!rightAddon && (!selectedIconAfter || selected !== false),
        })}
        ref={ref}
      >
        {leftAddon}
        {children}
        {rightAddon}
        {ripples}
      </Component>
    );
  }
);
