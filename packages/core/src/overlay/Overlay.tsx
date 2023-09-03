"use client";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { useSsr } from "../SsrProvider.js";
import { Portal } from "../portal/Portal.js";
import type {
  CSSTransitionClassNamesObject,
  CSSTransitionComponentProps,
  TransitionActions,
  TransitionTimeout,
} from "../transition/types.js";
import { useCSSTransition } from "../transition/useCSSTransition.js";
import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-overlay-background-color"?: string;
    "--rmd-overlay-z-index"?: number;
  }
}

const styles = bem("rmd-overlay");

/** @remarks \@since 6.0.0 */
export interface OverlayClassNameOptions {
  className?: string;

  visible: boolean;

  /** @defaultValue `false` */
  clickable?: boolean;

  /** @defaultValue `false` */
  absolute?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function overlay(options: OverlayClassNameOptions): string {
  const { visible, absolute = false, clickable = false, className } = options;

  return cnb(
    styles({
      visible,
      clickable,
      absolute,
    }),
    className
  );
}

/** @remarks \@since 2.4.0 */
export const DEFAULT_OVERLAY_TIMEOUT: TransitionTimeout = 150;

/** @remarks \@since 2.4.0 */
export const DEFAULT_OVERLAY_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> =
  {
    appearActive: "rmd-overlay--active",
    appearDone: "rmd-overlay--active",
    enterActive: "rmd-overlay--active",
    enterDone: "rmd-overlay--active",
  };

export interface OverlayProps
  extends HTMLAttributes<HTMLSpanElement>,
    CSSTransitionComponentProps,
    TransitionActions,
    OverlayClassNameOptions {
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
