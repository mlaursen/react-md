import {
  RippleContainer,
  useElementInteraction,
  useHigherContrastChildren,
} from "@react-md/core";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { ButtonClassNameThemeOptions } from "./styles";
import { getButtonClassName } from "./styles";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonClassNameThemeOptions {
  /** @defaultValue `"button"` */
  type?: "button" | "reset" | "submit";
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { Button } from "@react-md/button";
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
 * import { Button } from "@react-md/button";
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
 * import { Button } from "@react-md/button";
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
 * import { Button } from "@react-md/button";
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
      theme = "clear",
      themeType = "flat",
      buttonType = "text",
      className,
      children: propChildren,
      onClick,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchMove,
      ...remaining
    } = props;
    const isThemeDisabled = theme === "disabled";
    const { pressed, pressedClassName, rippleContainerProps, handlers } =
      useElementInteraction({
        onClick,
        onKeyDown,
        onKeyUp,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
        disabled: disabled || isThemeDisabled,
      });

    const children = useHigherContrastChildren(propChildren);

    return (
      <button
        {...remaining}
        // when the theme is set to `"disabled"`, the event handlers should be
        // removed so that it behaves like a disabled button. you do not want to
        // actually set the `disabled` attribute since it will lose keyboard
        // focus. this is mostly for supporting circular progress bars within
        // buttons
        {...(isThemeDisabled ? {} : handlers)}
        aria-disabled={isThemeDisabled || undefined}
        ref={ref}
        type={type}
        className={getButtonClassName({
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
        {rippleContainerProps && <RippleContainer {...rippleContainerProps} />}
      </button>
    );
  }
);
