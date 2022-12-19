import type {
  CSSTransitionComponentProps,
  SimplePosition,
  TransitionActions,
} from "@react-md/core";
import { bem, Portal, useCSSTransition, useEnsuredId } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import {
  DEFAULT_TOOLTIP_CLASSNAMES,
  DEFAULT_TOOLTIP_POSITION,
  DEFAULT_TOOLTIP_TIMEOUT,
} from "./constants";

const styles = bem("rmd-tooltip");

/**
 * @remarks \@since 6.0.0
 */
export interface TooltipClassNameOptions {
  className?: string;
  dense?: boolean;
  position: SimplePosition;
  disableLineWrap?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function tooltip(options: TooltipClassNameOptions): string {
  const { dense, position, className, disableLineWrap } = options;

  return cnb(
    styles({ dense, [position]: true, wrap: !disableLineWrap }),
    className
  );
}

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
   * @defaultValue `false`
   */
  disablePortal?: boolean;

  /**
   * Set this to `true` to disable the `max-width` behavior.
   *
   * @defaultValue `false`
   */
  disableLineWrap?: boolean;
}

/**
 * This is the base tooltip component that can only be used to render a tooltip
 * with an animation when the visibility changes. If this component is used, you
 * will need to manually add all the event listeners and triggers to change the
 * `visible` prop.
 *
 * @example
 * Simple Usage
 * ```tsx
 * import { Button } from "@react-md/button";
 * import { useTooltip, Tooltip } from "@react-md/tooltip";
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
      temporary,
      exitedHidden = !temporary,
      disableLineWrap,
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
        disableLineWrap,
        position,
        className,
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
