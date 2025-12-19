"use client";

import {
  type HTMLAttributes,
  type ReactElement,
  type Ref,
  useCallback,
  useState,
} from "react";

import { useResizeObserver } from "../useResizeObserver.js";
import { toastContent } from "./toastContentStyles.js";

/**
 * @since 6.0.0
 */
export interface ToastContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;

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
 * @see {@link https://react-md.dev/components/snackbar | Snackbar Demos}
 * @since 6.0.0
 */
export function ToastContent(props: ToastContentProps): ReactElement {
  const {
    ref,
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
      const style = globalThis.getComputedStyle(element);
      const lineHeight = Number.parseFloat(style.lineHeight);
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
