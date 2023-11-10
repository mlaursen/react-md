"use client";
import { forwardRef, type HTMLAttributes } from "react";
import { type TextOverflow } from "../cssUtils.js";
import { Portal } from "../portal/Portal.js";
import { type SimplePosition } from "../positioning/types.js";
import {
  type CSSTransitionComponentProps,
  type TransitionActions,
} from "../transition/types.js";
import { useCSSTransition } from "../transition/useCSSTransition.js";
import { useEnsuredId } from "../useEnsuredId.js";
import {
  DEFAULT_TOOLTIP_CLASSNAMES,
  DEFAULT_TOOLTIP_POSITION,
  DEFAULT_TOOLTIP_TIMEOUT,
} from "./constants.js";
import { tooltip } from "./tooltipStyles.js";

/**
 * The base props for the `Tooltip` component. This can be extended when
 * creating custom tooltip implementations.
 *
 * @remarks
 * \@since 2.8.0 Supports the `RenderConditionalPortalProps`
 * \@since 6.0.0 No longer supports the `RenderConditionalPortalProps`.
 */
export interface TooltipProps
  extends HTMLAttributes<HTMLSpanElement>,
    CSSTransitionComponentProps,
    TransitionActions {
  visible: boolean;

  /**
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * @defaultValue `DEFAULT_TOOLTIP_POSITION`
   * @see {@link DEFAULT_TOOLTIP_POSITION}
   */
  position?: SimplePosition;

  /**
   * @see {@link CSSTransitionComponentProps.temporary}
   * @defaultValue `true`
   */
  temporary?: boolean;

  /**
   * @defaultValue `false`
   */
  disablePortal?: boolean;

  /**
   * Set this to `"nowrap"` for tooltips that are positioned near the edge of
   * the viewport that have a position of `"above"` or `"below"` so that the
   * tooltip no longer aligns to the center of the tooltipped element.
   *
   * Set this to `"ellipsis"` if the tooltip should only show a single line of
   * text and ellipsis once it has reached the max tooltip width.
   *
   * @defaultValue `"allow"`
   */
  textOverflow?: TextOverflow;
}

/**
 * **Client Component**
 *
 * This is the base tooltip component that can only be used to render a tooltip
 * with an animation when the visibility changes. If this component is used, you
 * will need to manually add all the event listeners and triggers to change the
 * `visible` prop.
 *
 * @example
 * Simple Usage
 * ```tsx
 * import { Button, useTooltip, Tooltip } from "@react-md/core";
 *
 * function Example() {
 *   const { elementProps, tooltipProps } = useTooltip();
 *
 *   return (
 *     <>
 *       <Button {...elementProps}>Button</Button>
 *       <Tooltip {...tooltipProps}>
 *         Tooltip Content
 *       </Tooltip>
 *     </>
 *   );
 * }
 * ```
 */
export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  function Tooltip(props, nodeRef) {
    const {
      id: propId,
      dense,
      visible,
      children,
      appear,
      enter,
      exit,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      timeout = DEFAULT_TOOLTIP_TIMEOUT,
      classNames = DEFAULT_TOOLTIP_CLASSNAMES,
      className,
      position = DEFAULT_TOOLTIP_POSITION,
      temporary = true,
      exitedHidden = !temporary,
      textOverflow,
      disablePortal: propDisablePortal,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "tooltip");

    const { rendered, elementProps, disablePortal } = useCSSTransition({
      nodeRef,
      appear,
      enter,
      exit,
      transitionIn: visible,
      timeout,
      classNames,
      className: tooltip({
        dense,
        position,
        className,
        textOverflow,
      }),
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      temporary,
      exitedHidden,
      disablePortal: propDisablePortal,
    });

    return (
      <Portal disabled={disablePortal}>
        {rendered && (
          <span {...remaining} {...elementProps} id={id} role="tooltip">
            {children}
          </span>
        )}
      </Portal>
    );
  }
);
