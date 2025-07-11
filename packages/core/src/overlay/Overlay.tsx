"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { useSsr } from "../SsrProvider.js";
import { Portal } from "../portal/Portal.js";
import {
  type CSSTransitionComponentProps,
  type TransitionActions,
} from "../transition/types.js";
import { useCSSTransition } from "../transition/useCSSTransition.js";
import {
  type BaseOverlayClassNameOptions,
  DEFAULT_OVERLAY_CLASSNAMES,
  DEFAULT_OVERLAY_TIMEOUT,
  overlay,
} from "./styles.js";

/**
 * @since 6.0.0 Added `align` and `justify` props.
 * @since 6.0.0 Renamed `hidden` to `noOpacity`.
 * @since 6.3.1 Extends BaseOverlayClassNameOptions for CSSProperties module
 * augmentation.
 */
export interface OverlayProps
  extends HTMLAttributes<HTMLSpanElement>,
    BaseOverlayClassNameOptions,
    CSSTransitionComponentProps,
    TransitionActions {
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
 * @example Simple Example
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { Overlay } from "@react-md/core/overlay/Overlay";
 * import { useToggle } from "@react-md/core/useToggle";
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
 * @see {@link https://react-md.dev/components/overlay | Overlay Demos}
 * @since 6.0.0 Removed the `onRequestClose` prop in favor of using
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
