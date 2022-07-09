import type {
  CSSTransitionClassNamesObject,
  CSSTransitionComponentProps,
  TransitionTimeout,
} from "@react-md/core";
import { Portal, useCSSTransition } from "@react-md/core";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { OverlayClassNameOptions } from "./styles";
import { getOverlayClassName } from "./styles";

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
    OverlayClassNameOptions {
  visible: boolean;
}

export const Overlay = forwardRef<HTMLSpanElement, OverlayProps>(
  function Overlay(props, nodeRef) {
    const {
      children,
      className,
      visible,
      clickable = true,
      temporary = true,
      timeout = DEFAULT_OVERLAY_TIMEOUT,
      classNames = DEFAULT_OVERLAY_CLASSNAMES,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...remaining
    } = props;

    const { elementProps, rendered, disablePortal } = useCSSTransition({
      nodeRef,
      transitionIn: visible,
      timeout,
      classNames,
      className: getOverlayClassName({
        visible,
        clickable,
        className,
      }),
      appear: true,
      enter: true,
      exit: true,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      temporary,
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
