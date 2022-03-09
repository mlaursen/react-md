import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import type { CSSTransitionComponentProps } from "@react-md/transition";
import { CSSTransition } from "@react-md/transition";
import { bem } from "@react-md/utils";

import { DEFAULT_TOAST_CLASSNAMES, DEFAULT_TOAST_TIMEOUT } from "./constants";

export interface ToastProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<CSSTransitionComponentProps, "temporary"> {
  /**
   * Boolean if the main message content should be stacked above the action
   * button.  This prop is invalid if an `action` is not provided.
   */
  stacked?: boolean;

  /**
   * Boolean if the children is a two line message. This applies some additional
   * styles and unfortunately needs to be known before the toast is created.
   */
  twoLines?: boolean;

  /**
   * An optional action button to display with the toast. This will be rendered
   * to the right of the main toast's children if provided.
   */
  action?: ReactNode | null;

  /**
   * Boolean if the toast is currently visible. This should be enabled on mount
   * and then set to false once the toast has finished its display timeout.
   */
  visible: boolean;
}

const block = bem("rmd-toast");

/**
 * This is a very low-level component that can be used to animate a new toast in
 * to a `Snackbar` as it is mainly just a wrapper of the `CSSTransition`
 * component. If you are using this component, it is generally recommended to
 * provide the `onEntered` callback as a function to start the hide visibility
 * timer and the `onExited` callback to remove the current toast from your
 * queue.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    className,
    children,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    timeout = DEFAULT_TOAST_TIMEOUT,
    classNames = DEFAULT_TOAST_CLASSNAMES,
    action = null,
    stacked = false,
    twoLines = false,
    visible,
    ...props
  },
  nodeRef
) {
  return (
    <CSSTransition
      appear
      nodeRef={nodeRef}
      temporary
      transitionIn={visible}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      timeout={timeout}
      classNames={classNames}
    >
      <div
        {...props}
        className={cn(
          block({
            stacked,
            padded: !action || twoLines,
            "two-lines": twoLines,
            action,
            "action-2": action && twoLines,
          }),
          className
        )}
      >
        <span className={block("message", { action })}>{children}</span>
        {action && (
          <span className={block("action", { stacked })}>{action}</span>
        )}
      </div>
    </CSSTransition>
  );
});
