"use client";
import { cnb } from "cnbuilder";
import type { AriaRole, HTMLAttributes, ReactElement, ReactNode } from "react";
import { forwardRef, isValidElement } from "react";
import type { ButtonProps } from "../button/Button.js";
import type {
  CSSTransitionClassNames,
  TransitionCallbacks,
  TransitionTimeout,
} from "../transition/types.js";
import { useScaleTransition } from "../transition/useScaleTransition.js";
import type { PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { bem } from "../utils/bem.js";
import { ToastActionButton } from "./ToastActionButton.js";
import { ToastCloseButton } from "./ToastCloseButton.js";
import type { ToastContentProps } from "./ToastContent.js";
import { ToastContent } from "./ToastContent.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-toast-color"?: string;
    "--rmd-toast-background-color"?: string;
    "--rmd-toast-offset"?: string | number;
  }
}

const styles = bem("rmd-toast");

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
  /** @defaultValue `"surface"` */
  theme?: ToastTheme;
  /** @defaultValue `false` */
  action?: boolean;
  /** @defaultValue `false` */
  paused?: boolean;
  /** @defaultValue `false` */
  stacked?: boolean;
  /** @defaultValue `false` */
  reordered?: boolean;
  /** @defaultValue `false` */
  closeButton?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function toast(options: ToastClassNameOptions = {}): string {
  const {
    className,
    theme = "surface",
    action,
    paused,
    stacked,
    reordered,
    closeButton,
  } = options;

  return cnb(
    styles({
      [theme]: true,
      x: closeButton,
      action,
      paused,
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
   * Note: This is set while creating the toast.
   *
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
   * This can be used to replace the custom action button behavior.
   */
  actionButton?: ReactNode;

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
   * Any additional props that should be provided to the `<div>` that surrounds
   * the toast `children`.
   */
  contentProps?: PropsWithRef<ToastContentProps, HTMLDivElement>;

  /**
   * Set this to `true` if the `children` for the toast should no longer be
   * wrapped in an additional `<div>` that applies some toast layout styles.
   * This should normally only be used for custom `Toast` implementations.
   *
   * @see the `Snackbar`'s `renderToast` prop for an example.
   */
  disableToastContent?: boolean;

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
  paused?: boolean;
  visible: boolean;
}

/**
 * **Client Component**
 *
 * This component is just used for toast styling and does not implement any of
 * the visibility behavior.
 *
 * @remarks \@since 6.0.0
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  function Toast(props, ref) {
    const {
      id: propId,
      className,
      timeout,
      classNames,
      theme = "surface",
      action: propAction,
      actionButton: propActionButton,
      paused,
      visible,
      closeIcon,
      closeButtonProps,
      closeButton = !!closeButtonProps,
      contentProps,
      disableToastContent,
      stacked,
      multiline,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      children,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "toast");

    let actionButton = propActionButton;
    if (propAction) {
      let overrides: ButtonProps = {};
      let buttonChildren: ReactNode;
      // have to use `any` to correctly filter out all react elements
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (isValidElement<any>(propAction) || typeof propAction !== "object") {
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

    const action = !!actionButton;
    const reordered = stacked && action && closeButton;
    const { elementProps, rendered } = useScaleTransition({
      appear: true,
      nodeRef: ref,
      className: toast({
        className,
        theme,
        action,
        paused,
        stacked,
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
      temporary: true,
      transitionIn: visible,
      exitedHidden: true,
    });

    // this might get rid of the weird popping-back-in for a split second
    // that sometimes happens on mobile firefox
    if (!rendered) {
      return null;
    }

    return (
      <div {...remaining} {...elementProps} id={id}>
        <ToastContent
          action={action}
          stacked={stacked}
          multiline={multiline}
          closeButton={closeButton}
          disableWrapper={disableToastContent}
          {...contentProps}
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
  }
);