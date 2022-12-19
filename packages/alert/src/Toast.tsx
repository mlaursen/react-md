import { cnb } from "cnbuilder";
import type {
  CSSTransitionClassNamesObject,
  CSSTransitionComponentProps,
  TransitionActions,
  TransitionTimeout,
} from "@react-md/core";
import { bem, useCSSTransition } from "@react-md/core";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

const styles = bem("rmd-toast");

export interface ToastClassNameOptions {
  className?: string;
}

export function toast(options: ToastClassNameOptions = {}): string {
  const { className } = options;

  return cnb(styles(), className);
}

/** @remarks \@since 2.4.0 */
export const DEFAULT_TOAST_TIMEOUT: TransitionTimeout = 150;

/** @remarks \@since 2.4.0 */
export const DEFAULT_TOAST_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> =
  {
    appear: "rmd-toast--enter",
    appearActive: "rmd-toast--enter-active",
    enter: "rmd-toast--enter",
    enterActive: "rmd-toast--enter-active",
    exit: "rmd-toast--exit",
    exitActive: "rmd-toast--exit-active",
  };

export interface ToastProps
  extends HTMLAttributes<HTMLDivElement>,
    TransitionActions,
    CSSTransitionComponentProps {
  /**
   * @defaultValue `true`
   */
  appear?: boolean;

  visible: boolean;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  props,
  ref
) {
  const {
    className,
    children,
    appear = true,
    enter,
    exit,
    temporary,
    exitedHidden,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    visible,
    timeout = DEFAULT_TOAST_TIMEOUT,
    classNames = DEFAULT_TOAST_CLASSNAMES,
    ...remaining
  } = props;
  const { rendered, elementProps } = useCSSTransition({
    nodeRef: ref,
    className: toast({ className }),
    transitionIn: visible,
    appear,
    enter,
    exit,
    temporary,
    exitedHidden,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    timeout,
    classNames,
  });

  return (
    <>
      {rendered && (
        <div {...remaining} {...elementProps}>
          {children}
        </div>
      )}
    </>
  );
});
