import type {
  CSSTransitionComponentProps,
  SimplePosition,
  TransitionActions,
} from "@react-md/core";
import { bem, Portal, useCSSTransition } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import {
  DEFAULT_TOOLTIP_CLASSNAMES,
  DEFAULT_TOOLTIP_POSITION,
  DEFAULT_TOOLTIP_TIMEOUT,
} from "./constants";

const styles = bem("rmd-tooltip");

export interface TooltipClassNameOptions {
  className?: string;
  dense?: boolean;
  position: SimplePosition;
}

export function tooltip(options: TooltipClassNameOptions): string {
  const { dense, position, className } = options;
  return cnb(styles({ dense, [position]: true }), className);
}

export interface TooltipProps
  extends HTMLAttributes<HTMLSpanElement>,
    CSSTransitionComponentProps,
    TransitionActions {
  id: string;
  dense?: boolean;
  visible: boolean;
  position?: SimplePosition;
  disablePortal?: boolean;
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  function Tooltip(props, nodeRef) {
    const {
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
      disablePortal: propDisablePortal,
      ...remaining
    } = props;

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
          <span {...remaining} {...elementProps} role="tooltip">
            {children}
          </span>
        )}
      </Portal>
    );
  }
);
