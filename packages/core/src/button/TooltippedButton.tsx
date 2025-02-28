"use client";

import { type ReactNode, forwardRef } from "react";

import { Tooltip, type TooltipProps } from "../tooltip/Tooltip.js";
import {
  type ProvidedTooltipProps,
  type TooltipOptions,
  type TooltippedElementEventHandlers,
  useTooltip,
} from "../tooltip/useTooltip.js";
import { Button, type ButtonProps } from "./Button.js";
import { type ButtonType } from "./buttonStyles.js";

/**
 * @since 6.0.0
 */
export interface TooltippedButtonProps extends ButtonProps {
  /** @defaultValue `"icon"` */
  buttonType?: ButtonType;

  /**
   * The tooltip children to render. When this is falsey, the tooltip event
   * listeners will not be enabled and the tooltip will never display.
   */
  tooltip?: ReactNode;

  /**
   * Any additional props to pass to the `Tooltip` component (normally styling
   * props).
   */
  tooltipProps?: Omit<TooltipProps, keyof ProvidedTooltipProps>;

  /**
   * Any additional tooltip options to pass to {@link useTooltip}. The most
   * common options would be:
   *
   * ```ts
   * tooltipOptions={{
   *   overflowOnly: true,
   *
   *   // whatever values you want for these
   *   hoverTimeout: 0,
   *   leaveTimeout: 150,
   *   defaultPosition: "left",
   * }}
   * ```
   */
  tooltipOptions?: Omit<TooltipOptions, keyof TooltippedElementEventHandlers>;
}

/**
 * **Client Component**
 *
 * A simple wrapper around the `Button` and `Tooltip` components to dynamically
 * add tooltips to buttons. The `buttonType` will default to `icon` instead of
 * `text`.
 *
 * @example
 * ```tsx
 * import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
 * import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
 *
 * export default function Example(): ReactElement {
 *   return (
 *     <TooltippedButton tooltip="I am a tooltip!" aria-label="Favorite">
 *       <FavoriteIcon />
 *     </TooltippedButton>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export const TooltippedButton = forwardRef<
  HTMLButtonElement,
  TooltippedButtonProps
>(function TooltippedButton(props, ref) {
  const {
    tooltip,
    tooltipProps,
    tooltipOptions,
    buttonType = "icon",
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    onContextMenu,
    ...remaining
  } = props;
  const { tooltipProps: providedTooltipProps, elementProps } = useTooltip({
    ...tooltipOptions,
    disabled: !tooltip || tooltipOptions?.disabled,
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchEnd,
    onTouchStart,
    onContextMenu,
  });

  return (
    <>
      <Button
        {...elementProps}
        {...remaining}
        ref={ref}
        buttonType={buttonType}
      />
      <Tooltip {...providedTooltipProps} {...tooltipProps}>
        {tooltip}
      </Tooltip>
    </>
  );
});
