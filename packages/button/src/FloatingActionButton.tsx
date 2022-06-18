import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes, Ref } from "react";
import { forwardRef } from "react";
import type { ButtonProps } from "./Button";
import { Button } from "./Button";
import type { ButtonTheme, ButtonThemeType, ButtonType } from "./styles";

const styles = bem("rmd-fab");

/**
 * The position within the viewport for the floating action button.
 * @remarks \@since 6.0.0 This was renamed from `FABPosition`
 */
export type FloatingActionButtonPosition =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

/** @remarks \@since 6.0.0 */
export interface FloatingActionButtonProps extends ButtonProps {
  /**
   * Since the `ref` for the `FloatingActionButton` will be the surrounding
   * `span` DOM node, this is used to get access to the `button` DOM Node if
   * that is needed for some reason.
   */
  buttonRef?: Ref<HTMLButtonElement>;

  /** @defaultValue `"bottom-right"` */
  position?: FloatingActionButtonPosition;

  /**
   * This is used to update the `position` CSS value:
   *
   * - `"viewport" -> position: fixed;`
   * - `"container" -> position: absolute;`
   *
   * Note: When this is set to `"container"`, you **must** have a parent element
   * with `position: relative;` for it to display correctly.
   *
   * @defaultValue `"viewport"`
   */
  positionWithin?: "viewport" | "container";

  /**
   * Any additional props that should be passed to the `<span>` surrounding the
   * `Button`
   */
  containerProps?: HTMLAttributes<HTMLSpanElement>;

  /** @defaultValue `"secondary"` */
  theme?: ButtonTheme;
  /** @defaultValue `"contained"` */
  themeType?: ButtonThemeType;
  /** @defaultValue `"icon"` */
  buttonType?: ButtonType;
}

/**
 * Unlike the {@link Button} component, the `FloatingActionButton` will default
 * to:
 * - `theme = "secondary"`
 * - `themeType ="contained"`
 * - `buttonType = "icon"`
 *
 *
 * @example
 * Simple Example
 * ```tsx
 * import { FloatingActionButton } from "@react-md/button";
 * import type { ReactElement } from "react";
 *
 * function SimpleExample(): ReactElement {
 *   return (
 *     <FloatingActionButton>
 *       <FavoriteSVGIcon />
 *     </FloatingActionButton>
 *   );
 * }
 * ```
 *
 * @example
 * Custom Position
 * ```tsx
 * import { FloatingActionButton } from "@react-md/button";
 * import type { ReactElement } from "react";
 *
 * function CustomPosition(): ReactElement {
 *   return (
 *     <FloatingActionButton position="top-right">
 *       <FavoriteSVGIcon />
 *     </FloatingActionButton>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export const FloatingActionButton = forwardRef<
  HTMLSpanElement,
  FloatingActionButtonProps
>(function FloatingActionButton(props, ref) {
  const {
    buttonRef,
    position = "bottom-right",
    positionWithin = "viewport",
    containerProps,
    theme = "secondary",
    themeType = "contained",
    buttonType = "icon",
    ...buttonProps
  } = props;
  return (
    <span
      {...containerProps}
      ref={ref}
      className={cnb(
        styles({
          tl: position === "top-left",
          tr: position === "top-right",
          bl: position === "bottom-left",
          br: position === "bottom-right",
          absolute: positionWithin === "container",
        }),
        containerProps?.className
      )}
    >
      <Button
        {...buttonProps}
        ref={buttonRef}
        theme={theme}
        themeType={themeType}
        buttonType={buttonType}
      />
    </span>
  );
});
