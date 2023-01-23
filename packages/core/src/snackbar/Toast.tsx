import { cnb } from "cnbuilder";
import type { ReactNode } from "react";
import { forwardRef, isValidElement, useCallback, useState } from "react";
import type { ButtonProps } from "../button";
import type {
  CSSTransitionComponentProps,
  TransitionActions,
} from "../transition";
import { useScaleTransition } from "../transition";
import { useEnsuredId } from "../useEnsuredId";
import { useResizeObserver } from "../useResizeObserver";
import { bem } from "../utils";
import { ToastActionButton } from "./ToastActionButton";
import { ToastCloseButton } from "./ToastCloseButton";
import { ToastContent } from "./ToastContent";
import type { ConfigurableToastProps, ToastTheme } from "./ToastProvider";

const styles = bem("rmd-toast");

/** @remarks \@since 6.0.0 */
export interface ToastClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  action?: boolean;
  /** @defaultValue `false` */
  stacked?: boolean;
  /** @defaultValue `false` */
  reordered?: boolean;
  /** @defaultValue `false` */
  closeButton?: boolean;

  /** @defaultValue `"surface"` */
  theme?: ToastTheme;
}

/**
 * @remarks \@since 6.0.0
 */
export function toast(options: ToastClassNameOptions = {}): string {
  const {
    className,
    theme = "surface",
    action,
    stacked,
    reordered,
    closeButton,
  } = options;

  return cnb(
    styles({
      [theme]: true,
      x: closeButton,
      action,
      "small-gap": closeButton && action,
      stacked,
      reordered: stacked && reordered,
    }),
    className
  );
}

/**
 * @remarks \@since 6.0.0
 */
export interface ToastProps
  extends ConfigurableToastProps,
    CSSTransitionComponentProps,
    TransitionActions {
  /**
   * @defaultValue `true`
   */
  appear?: boolean;

  /** @defaultValue `false` */
  vertical?: boolean;

  visible: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  props,
  ref
) {
  const {
    id: propId,
    className,
    children,
    appear = true,
    enter,
    exit,
    temporary = true,
    exitedHidden = true,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    visible,
    timeout,
    classNames,
    vertical,
    action: propAction,
    theme = "surface",
    closeIcon,
    closeButtonProps,
    closeButton = !!closeButtonProps,
    contentProps,
    stacked,
    multiline: propMultiline,
    ...remaining
  } = props;

  const id = useEnsuredId(propId, "toast");

  let actionButton: ReactNode;
  if (propAction) {
    let overrides: ButtonProps = {};
    let buttonChildren: ReactNode;
    if (isValidElement(propAction) || typeof propAction !== "object") {
      buttonChildren = propAction;
    } else {
      ({ children: buttonChildren, ...overrides } = propAction);
    }

    actionButton = (
      <ToastActionButton
        theme={theme === "surface" ? "secondary" : "clear"}
        reordered={stacked && closeButton}
        {...overrides}
      >
        {buttonChildren}
      </ToastActionButton>
    );
  }

  const [isMultiline, setMultiline] = useState(false);
  const multiline = propMultiline ?? isMultiline;
  const action = !!actionButton;
  const reordered = stacked && action && closeButton;
  const { rendered, elementProps } = useScaleTransition({
    nodeRef: ref,
    className: toast({
      className,
      theme,
      stacked,
      action,
      reordered,
      closeButton,
    }),
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
    vertical,
  });
  const contentRef = useResizeObserver({
    ref: contentProps?.ref,
    disabled: !rendered || typeof propMultiline === "boolean",
    disableWidth: true,
    onUpdate: useCallback((entry) => {
      const element = entry.target;
      const style = window.getComputedStyle(element);
      const lineHeight = parseFloat(style.lineHeight);
      if (Number.isNaN(lineHeight)) {
        return;
      }

      setMultiline(element.scrollHeight > lineHeight);
    }, []),
  });

  return (
    <>
      {rendered && (
        <div id={id} {...remaining} {...elementProps}>
          <ToastContent
            action={action}
            stacked={stacked}
            multiline={multiline}
            closeButton={closeButton}
            {...contentProps}
            ref={contentRef}
          >
            {children}
          </ToastContent>
          {actionButton}
          {closeButton && (
            <ToastCloseButton reordered={reordered} {...closeButtonProps}>
              {closeIcon}
            </ToastCloseButton>
          )}
        </div>
      )}
    </>
  );
});
