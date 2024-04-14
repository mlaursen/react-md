"use client";
import { forwardRef, useCallback, useState, type HTMLAttributes } from "react";
import { useResizeObserver } from "../useResizeObserver.js";
import { toastContent } from "./toastContentStyles.js";

/**
 * @since 6.0.0
 */
export interface ToastContentProps extends HTMLAttributes<HTMLDivElement> {
  /** @defaultValue `false` */
  action?: boolean;

  /** @defaultValue `false` */
  stacked?: boolean;

  /**
   * Set this to `true` if you know that the {@link children} span multiple
   * lines. When this is omitted, a `ResizeObserver` will be used to
   * automatically detect multiline content.
   */
  multiline?: boolean;

  /** @defaultValue `false` */
  closeButton?: boolean;

  /**
   * Set this to `true` if you do not want to wrap the `children` in a `<div>`
   * that applies some toast layout styles. This should really only be used for
   * custom `Toast` implementations.
   *
   * @internal
   * @defaultValue `false`
   */
  disableWrapper?: boolean;
}

/**
 * **Client Component**
 *
 * @since 6.0.0
 */
export const ToastContent = forwardRef<HTMLDivElement, ToastContentProps>(
  function ToastContent(props, ref) {
    const {
      className,
      children,
      action,
      stacked,
      multiline: propMultiline,
      closeButton,
      disableWrapper,
      ...remaining
    } = props;

    const [isMultiline, setMultiline] = useState(false);
    const nodeRef = useResizeObserver({
      ref,
      disabled: disableWrapper || typeof propMultiline === "boolean",
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
    const multiline = propMultiline ?? isMultiline;

    if (disableWrapper) {
      return <>{children}</>;
    }

    return (
      <div
        {...remaining}
        ref={nodeRef}
        className={toastContent({
          action,
          stacked,
          multiline,
          closeButton,
          className,
        })}
      >
        {children}
      </div>
    );
  }
);
