"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";

import { type ComponentWithRippleProps } from "../interaction/types.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren.js";
import { type PropsWithRef } from "../types.js";
import {
  FloatingActionButton,
  type FloatingActionButtonPosition,
  type FloatingActionButtonProps,
} from "./FloatingActionButton.js";
import { type ButtonClassNameThemeOptions, button } from "./buttonStyles.js";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonClassNameThemeOptions,
    ComponentWithRippleProps {
  /** @defaultValue `"button"` */
  type?: "button" | "reset" | "submit";

  /**
   * The position within the viewport to display the button as a floating action
   * button.
   */
  floating?: FloatingActionButtonPosition;

  /**
   * Any additional props to provide the to `FAB` container element when the
   * `floating` prop is provided
   */
  floatingProps?: PropsWithRef<FloatingActionButtonProps, HTMLSpanElement>;
}

/**
 * **Client Component**
 *
 * @example Simple Example
 * ```tsx
 * import { Button } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Button
 *       onClick={(event) => {
 *         // do something
 *       }}
 *     >
 *       Content
 *     </Button>
 *   );
 * }
 * ```
 *
 * @example Theme Example
 * ```tsx
 * import { Button } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Button
 *       theme="primary"
 *       themeType="contained"
 *       onClick={(event) => {
 *         // do something
 *       }}
 *     >
 *       Content
 *     </Button>
 *   );
 * }
 * ```
 *
 * @example Icon Button Example
 * ```tsx
 * import { Button } from "@react-md/core";
 * import { FavoriteSVGIcon } from "@react-md/material-icons";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Button
 *       theme="secondary"
 *       themeType="outline"
 *       buttonType="icon"
 *       onClick={(event) => {
 *         // do something
 *       }}
 *     >
 *       <FavoriteSVGIcon />
 *     </Button>
 *   );
 * }
 * ```
 *
 * @example Text Button with icons
 * ```tsx
 * import { Button } from "@react-md/core";
 * import { FavoriteSVGIcon } from "@react-md/material-icons";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Button
 *       onClick={(event) => {
 *         // do something
 *       }}
 *     >
 *       <FavoriteSVGIcon />
 *       Content
 *     </Button>
 *   );
 * }
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      type = "button",
      disabled = false,
      floating = null,
      floatingProps,
      theme = floating ? "secondary" : "clear",
      themeType = floating ? "contained" : "flat",
      iconSize,
      buttonType = floating || iconSize ? "icon" : "text",
      className,
      responsive,
      children: propChildren,
      onBlur,
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
      disableRipple,
      ...remaining
    } = props;
    const isThemeDisabled = theme === "disabled";
    const ariaDisabled = props["aria-disabled"];
    const { pressed, pressedClassName, ripples, handlers } =
      useElementInteraction({
        mode: disableRipple ? "press" : undefined,
        onBlur,
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
        disabled:
          disabled ||
          isThemeDisabled ||
          (ariaDisabled && ariaDisabled !== "false"),
      });

    const children = useHigherContrastChildren(propChildren);

    return (
      <FloatingActionButton position={floating} {...floatingProps}>
        <button
          {...remaining}
          // when the theme is set to `"disabled"`, the event handlers should be
          // removed so that it behaves like a disabled button. you do not want to
          // actually set the `disabled` attribute since it will lose keyboard
          // focus. this is mostly for supporting circular progress bars within
          // buttons
          {...(isThemeDisabled ? {} : handlers)}
          aria-disabled={isThemeDisabled || remaining["aria-disabled"]}
          disabled={disabled}
          ref={ref}
          type={type}
          className={button({
            theme,
            themeType,
            buttonType,
            disabled,
            responsive,
            iconSize,
            pressed,
            pressedClassName,
            className,
          })}
        >
          {children}
          {ripples}
        </button>
      </FloatingActionButton>
    );
  }
);
