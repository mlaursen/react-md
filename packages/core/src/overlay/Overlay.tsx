"use client";
import { forwardRef, type HTMLAttributes } from "react";
import { type BoxAlignItems, type BoxJustifyContent } from "../box/styles.js";
import { Portal } from "../portal/Portal.js";
import { useSsr } from "../SsrProvider.js";
import {
  type CSSTransitionComponentProps,
  type TransitionActions,
} from "../transition/types.js";
import { useCSSTransition } from "../transition/useCSSTransition.js";
import {
  DEFAULT_OVERLAY_CLASSNAMES,
  DEFAULT_OVERLAY_TIMEOUT,
  overlay,
} from "./overlayStyles.js";

/**
 * @remarks \@since 6.0.0 Added `align` and `justify` props.
 */
export interface OverlayProps
  extends HTMLAttributes<HTMLSpanElement>,
    CSSTransitionComponentProps,
    TransitionActions {
  /**
   * @defaultValue `"center"`
   * @remarks \@since 6.0.0
   */
  align?: BoxAlignItems;

  /**
   * @defaultValue `"center"`
   * @remarks \@since 6.0.0
   */
  justify?: BoxJustifyContent;

  /**
   * Set this to `true` for when the overlay should be visible. Toggling this
   * value will trigger the enter/exit animation.
   */
  visible: boolean;

  /**
   * Set this to `true` if the overlay should be rendered with an `opacity: 0`
   * and disabling the animation. This is useful if you'd like a "close on
   * outside click" behavior.
   *
   * @defaultValue `false`
   */
  noOpacity?: boolean;

  /**
   * @see {@link OverlayClassNameOptions.clickable}
   * @defaultValue `!noOpacity`
   */
  clickable?: boolean;

  /**
   * @defaultValue `false`
   */
  disablePortal?: boolean;

  /**
   * @defaultValue `false`
   */
  disableTransition?: boolean;
}

/**
 * **Client Component**
 *
 * @example
 * Simple Example
 * ```tsx
 * import { Button, Overlay, useToggle } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { toggle, disable, toggled: visible } = useToggle(false);
 *
 *   return (
 *     <>
 *       <Button onClick={toggle}>Toggle</Button>
 *       <Overlay visible={visible} onClick={disable} />
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0 Removed the `onRequestClose` prop in favor of using
 * the `onClick` prop instead.
 */
export const Overlay = forwardRef<HTMLSpanElement, OverlayProps>(
  function Overlay(props, nodeRef) {
    const {
      children,
      className,
      visible,
      noOpacity = false,
      clickable = !noOpacity,
      temporary = true,
      timeout = DEFAULT_OVERLAY_TIMEOUT,
      classNames = DEFAULT_OVERLAY_CLASSNAMES,
      disableTransition = false,
      align = "center",
      justify = "center",
      appear,
      enter,
      exit,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      exitedHidden = true,
      disablePortal: propDisablePortal = false,
      ...remaining
    } = props;

    const ssr = useSsr();
    const { elementProps, rendered, disablePortal } = useCSSTransition({
      nodeRef,
      transitionIn: visible,
      timeout: noOpacity ? 0 : timeout,
      classNames: noOpacity ? "" : classNames,
      className: overlay({
        visible,
        clickable,
        align,
        justify,
        className,
      }),
      appear: appear && !disableTransition && !ssr,
      enter: enter && !disableTransition,
      exit: exit && !disableTransition,
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
          <span {...remaining} {...elementProps}>
            {children}
          </span>
        )}
      </Portal>
    );
  }
);
