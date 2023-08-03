"use client";
import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { RippleContainer } from "../interaction/RippleContainer";
import { useElementInteraction } from "../interaction/useElementInteraction";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren";
import type { PropsWithRef } from "../types";
import { bem } from "../utils";
import type {
  FloatingActionButtonPosition,
  FloatingActionButtonProps,
} from "./FloatingActionButton";
import { FloatingActionButton } from "./FloatingActionButton";

declare module "react" {
  interface CSSProperties {
    "--rmd-button-background-color"?: string;
    "--rmd-button-color"?: string;
    "--rmd-button-border-radius"?: string | number;
    "--rmd-button-contained-background-color"?: string;
    "--rmd-button-contained-color"?: string;
    "--rmd-button-text-horizontal-padding"?: string | number;
    "--rmd-button-text-vertical-padding"?: string | number;
    "--rmd-button-text-min-height"?: string | number;
    "--rmd-button-text-min-width"?: string | number;
    "--rmd-button-icon-size"?: string | number;
    "--rmd-button-icon-radius"?: string | number;
  }
}

const styles = bem("rmd-button");

/**
 * When this is set to `"text"`, the size of the button will be determined by
 * the content and will be more block-like. Icons can still be rendered in
 * `"text"` buttons and will have spacing automatically applied between other
 * content in the button.
 *
 * When this is set to `"icon"`, the button will be equal height/width and
 * circular.
 */
export type ButtonType = "text" | "icon" | "icon-square";

/**
 * One of the valid material design default button themes that can be used. This
 * will update the general look and feel by updating the colors within the
 * button while the `ButtonThemeType` will update the borders or box shadow.
 */
export type ButtonTheme =
  | "clear"
  | "primary"
  | "secondary"
  | "warning"
  | "error"
  | "disabled";

/**
 * When this is set to `"flat"`, the button will have no `background-color`,
 * `border`, and `box-shadow`. It will only set the `color` to the
 * {@link ButtonTheme}.
 *
 * When this is set to `"outline"`, the button will have no `background-color`,
 * but gain a `border` and `color` set to the {@link ButtonTheme}.
 *
 * When this is set to `"contained"`, the button will set the `background-color`
 * to the {@link ButtonTheme}, add some `box-shadow`, and set the `color` to
 * either `#000` or `#fff`. (The `color` defaults to whichever value has the
 * highest contrast ratio with the `background-color`)
 */
export type ButtonThemeType = "flat" | "outline" | "contained";

/** @remarks \@since 6.0.0 */
export interface ButtonClassNameThemeOptions {
  className?: string;

  /** @defaultValue `false` */
  disabled?: boolean;

  /**
   * @see {@link ButtonTheme} for information about the different types.
   * @defaultValue `"text"`
   */
  buttonType?: ButtonType;

  /** @defaultValue `"clear"` */
  theme?: ButtonTheme;

  /**
   * @see {@link ButtonThemeType} for information about the theming behavior.
   * @defaultValue `"flat"`
   */
  themeType?: ButtonThemeType;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface ButtonClassNameOptions extends ButtonClassNameThemeOptions {
  /** @defaultValue `false` */
  pressed?: boolean;
  pressedClassName?: string;
}

/**
 * Creates a button theme based on the button theming props. This is really just
 * used so that other elements like clickable `<div>`s or `<input type="file">`
 * can look like buttons.
 *
 * @param options - An object containing the themeable button props to generate a
 * button theme className.
 * @returns a string of class names to create an element with a button theme.
 * @remarks \@since 6.0.0 This used to be called `buttonThemeClassNames`.
 */
export function button(options: ButtonClassNameOptions = {}): string {
  const {
    theme: propTheme = "clear",
    themeType = "flat",
    buttonType = "text",
    disabled: propDisabled = false,
    pressed = false,
    pressedClassName,
    className,
  } = options;

  const theme = propTheme === "disabled" ? "clear" : propTheme;
  const disabled = propDisabled || propTheme === "disabled";
  const text = buttonType === "text";
  const icon = !text;
  const outline = themeType === "outline";
  const contained = themeType === "contained";
  const clear = theme === "clear";

  return cnb(
    styles({
      text,
      icon,
      "icon-square": buttonType === "icon-square",
      disabled,
      contained: !disabled && contained,
      outline,
      pressed: contained && pressed,
      [theme]: !disabled && !clear && contained,
      [`text-${theme}`]: !disabled && !clear && !contained,
      [`outline-${theme}`]: !disabled && !clear && outline,
    }),
    pressedClassName,
    className
  );
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonClassNameThemeOptions {
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
 * @example
 * Simple Example
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
 * @example
 * Theme Example
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
 * @example
 * Icon Button Example
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
 * @example
 * Text Button with icons
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
      buttonType = floating ? "icon" : "text",
      className,
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
      ...remaining
    } = props;
    const isThemeDisabled = theme === "disabled";
    const { pressed, pressedClassName, rippleContainerProps, handlers } =
      useElementInteraction({
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
        disabled: disabled || isThemeDisabled,
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
            pressed,
            pressedClassName,
            className,
          })}
        >
          {children}
          {rippleContainerProps && (
            <RippleContainer {...rippleContainerProps} />
          )}
        </button>
      </FloatingActionButton>
    );
  }
);
