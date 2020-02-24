import React, {
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import { cnb } from "cnbuilder";
import CSSTransition from "react-transition-group/CSSTransition";
import { OverridableCSSTransitionProps } from "@react-md/transition";
import { bem } from "@react-md/utils";

export interface ToastProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<OverridableCSSTransitionProps, "mountOnEnter" | "unmountOnExit"> {
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
const DEFAULT_TOAST_CLASSNAMES = {
  appear: "rmd-toast--enter",
  appearActive: "rmd-toast--enter-active",
  enter: "rmd-toast--enter",
  enterActive: "rmd-toast--enter-active",
  enterDone: "",
  exit: "rmd-toast--exit",
  exitActive: "rmd-toast--exit-active",
  exitDone: "",
};

/**
 * This is a very low-level component that can be used to animate a new toast in
 * to a `Snackbar` as it is mainly just a wrapper of the `CSSTransition`
 * component. If you are using this component, it is generally recommended to
 * provide the `onEntered` callback as a function to start the hide visibility
 * timer and the `onExited` callback to remove the current toast from your
 * queue.
 */
function Toast(
  {
    className,
    children,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    timeout = 150,
    classNames = DEFAULT_TOAST_CLASSNAMES,
    action = null,
    stacked = false,
    twoLines = false,
    visible,
    ...props
  }: ToastProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  return (
    <CSSTransition
      in={visible}
      appear
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      timeout={timeout}
      classNames={classNames}
      mountOnEnter
      unmountOnExit
    >
      <div
        {...props}
        ref={ref}
        className={cnb(
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
        <span className={block("message")}>{children}</span>
        {action && (
          <span className={block("action", { stacked })}>{action}</span>
        )}
      </div>
    </CSSTransition>
  );
}

const ForwardedToast = forwardRef<HTMLDivElement, ToastProps>(Toast);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedToast.propTypes = {
      visible: PropTypes.bool.isRequired,
      action: PropTypes.element,
      stacked: PropTypes.bool,
      twoLines: PropTypes.bool,
      className: PropTypes.string,
      classNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          appear: PropTypes.string,
          appearActive: PropTypes.string,
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
          exitDone: PropTypes.string,
        }),
      ]),
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
    };
  } catch (e) {}
}

export default ForwardedToast;
