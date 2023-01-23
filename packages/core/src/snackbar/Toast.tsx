import { cnb } from "cnbuilder";
import type { AriaRole, HTMLAttributes, ReactElement, ReactNode } from "react";
import { forwardRef, isValidElement, useCallback, useState } from "react";
import type { ButtonProps } from "../button";
import type {
  CSSTransitionClassNames,
  TransitionCallbacks,
  TransitionTimeout,
} from "../transition";
import { useScaleTransition } from "../transition";
import type { PropsWithRef } from "../types";
import { useEnsuredId } from "../useEnsuredId";
import { useResizeObserver } from "../useResizeObserver";
import { bem } from "../utils";
import { ToastActionButton } from "./ToastActionButton";
import { ToastCloseButton } from "./ToastCloseButton";
import type { ToastContentProps } from "./ToastContent";
import { ToastContent } from "./ToastContent";

const styles = bem("rmd-toast");
const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export type ToastTheme =
  | "surface"
  | "primary"
  | "secondary"
  | "warning"
  | "error"
  | "success";

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
export interface ConfigurableToastProps
  extends HTMLAttributes<HTMLDivElement>,
    TransitionCallbacks {
  /**
   * Note: this default value will only be generated in the `Toast` component.
   *
   * @defaultValue `"toast-" + useId()`
   */
  id?: string;

  /**
   * @defaultValue `visibleTime === null ? "alert" : undefined`
   */
  role?: AriaRole;

  /**
   * @defaultValue `"surface"`
   */
  theme?: ToastTheme;

  /**
   * Set this to `true` to stack the content above the {@link action}. It is not
   * recommended to enable this prop if the {@link closeButton} is enabled.
   *
   * @defaultValue `false`
   */
  stacked?: boolean;

  /**
   * If this is not provided, a `ResizeObserver` will be used to determine if
   * there are multiple lines of content.
   */
  multiline?: boolean;

  /**
   * When this is a string or React element, it will be rendered as the
   * `children` within a `Button`
   */
  action?: ButtonProps | ReactElement | string;

  /**
   * @defaultValue `useIcon("close")`
   */
  closeIcon?: ReactNode;

  /**
   * Set this to `true` if a close button should be rendered to the right of the
   * `children`.
   *
   * @defaultValue `!!closeButtonProps`
   */
  closeButton?: boolean;

  /**
   * Use this prop to override most of the close button behavior. The
   */
  closeButtonProps?: ButtonProps;

  /**
   * Any additional props that should be provided to the `<div>` that surroundes
   * the toast `children`.
   */
  contentProps?: PropsWithRef<ToastContentProps, HTMLDivElement>;

  /**
   * The toast's transition timeout for entering and exiting. This is **not**
   * how long the toast should remain visible.
   *
   * @defaultValue `SCALE_TIMEOUT`
   */
  timeout?: TransitionTimeout;

  /**
   * The toast's transition class names for entering and exiting.
   *
   * @defaultValue `SCALE_CLASSNAMES`
   */
  classNames?: CSSTransitionClassNames;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ToastProps extends ConfigurableToastProps {
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
    timeout,
    classNames,
    theme = "surface",
    action: propAction,
    visible,
    closeIcon,
    closeButtonProps,
    closeButton = !!closeButtonProps,
    contentProps,
    stacked,
    multiline: propMultiline,
    onEnter,
    onEntering,
    onEntered = noop,
    onExit,
    onExiting,
    onExited = noop,
    children,
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
  const { elementProps } = useScaleTransition({
    appear: true,
    nodeRef: ref,
    className: toast({
      className,
      theme,
      stacked,
      action,
      reordered,
      closeButton,
    }),
    timeout,
    classNames,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    transitionIn: visible,
  });

  const contentRef = useResizeObserver({
    ref: contentProps?.ref,
    disabled: typeof propMultiline === "boolean",
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
    <div {...remaining} {...elementProps} id={id}>
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
  );
});
