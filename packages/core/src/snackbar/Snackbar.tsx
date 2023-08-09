"use client";
import { cnb } from "cnbuilder";
import type { AriaRole, ComponentType, HTMLAttributes } from "react";
import { forwardRef } from "react";
import { Portal } from "../portal/Portal";
import { useEnsuredId } from "../useEnsuredId";
import { bem } from "../utils/bem";
import type { ToastRendererProps } from "./DefaultToastRenderer";
import { DefaultToastRenderer } from "./DefaultToastRenderer";
import type { ConfigurableToastProps } from "./Toast";
import { useToastQueue } from "./ToastManagerProvider";

const styles = bem("rmd-snackbar");

/**
 * @remarks
 * \@since 2.0.0
 * \@since 6.0.0 Added the `"top-left"`, `"top-right"`, `"bottom-left"`, and
 * `"bottom-right"` positions
 */
export type SnackbarPosition =
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "top-left"
  | "top-right";

/** @remarks \@since 6.0.0 */
export interface SnackbarClassNameOptions {
  className?: string;
  position: SnackbarPosition;
}

/**
 * @remarks \@since 6.0.0
 */
function snackbar(options: SnackbarClassNameOptions): string {
  const { className, position } = options;
  const top =
    position === "top" || position === "top-left" || position === "top-right";

  return cnb(
    styles({
      top,
      bottom: !top,
      start: position === "top-left" || position === "bottom-left",
      end: position === "top-right" || position === "bottom-right",
    }),
    className
  );
}

/**
 * @remarks \@since 6.0.0 The `id` prop is optional
 */
export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @defaultValue `"snackbar-" + useId()`
   */
  id?: string;

  /** @defaultValue `"status"` */
  role?: AriaRole;

  /**
   * Set this to the number of toasts that can be visible within the snackbar at
   * the same time. Any toasts added after this value will be added into the
   * queue to be shown.
   *
   * @defaultValue `1`
   */
  limit?: number;

  /**
   * @defaultValue `"bottom"`
   */
  position?: SnackbarPosition;

  /**
   * @defaultValue `false`
   */
  disablePortal?: boolean;

  /**
   * This can be used to create a custom toast implementation.
   *
   * @example
   * ```ts
   * import type { ToastRendererProps } from "@react-md/core";
   * import {
   *   Snackbar,
   *   Toast,
   *   ToastContent,
   *   useToastManager,
   * } from "@react-md/core";
   * import type { ReactElement } from "react";
   *
   * function CustomToast(props: CustomToastRendererProps): ReactElement {
   *   // Pretend like we don't need anything else from the toast since the
   *   // custom behavior is related to the `toastId`
   *   const { toastId, visible, duplicates, visibleTime } = props;
   *
   *   const toastManager = useToastManager();
   *
   *   // Note: If you want to rely on the `action` and `closeButton` behavior,
   *   // you must also wrap the `Toast` with:
   *   // <RemoveToastProvider value={() => toastManager.removeToast(toastId, true)}>
   *
   *   return (
   *     <Toast
   *       theme={isError(toastId) ? "error" : "surface"}
   *       visible={visible}
   *       onEntered={() => {
   *         toastManager.startRemoveTimeout(toastId);
   *       }}
   *       onExited={() => {
   *         toastManager.removeToast(toastId, false)
   *       }}
   *       disableContentWrapper
   *     >
   *       <ToastContent>
   *         <TranslateMessage id={toastId} />
   *       </ToastContent>
   *       {isActionable(toastId) && (
   *         <Button
   *           onClick={async () => {
   *             await someApiCall();
   *             toastManager.removeToast(toastId, true);
   *           }}
   *         >
   *           Dismiss
   *         </Button>
   *       )}
   *     </Toast>
   *   );
   * }
   *
   * function Example(): ReactElement {
   *   return <Snackbar renderToast={CustomToast} />
   * }
   * ```
   *
   * @see {@link DefaultToastRenderer}
   * @defaultValue `DefaultToastRenderer`
   */
  renderToast?: ComponentType<ToastRendererProps>;

  /**
   * Optional props that should be passed to each `Toast` from the `Snackbar`.
   * This is a great way to enforce each toast having a close button, a custom
   * class name, theme, etc.
   *
   * @see {@link DefaultToastRenderer}
   */
  toastDefaults?: ConfigurableToastProps;
}

/**
 * **Client Component**
 *
 * @example
 * Super SImple Example
 * ```tsx
 * import { Button, Snackbar, addToast } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <>
 *       <Button
 *         onClick={() => {
 *           addToast({ children: "A new toast!" });
 *         }}
 *       >
 *         Toast!
 *       </Button>
 *       <Snackbar />
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link SnackbarProps.renderToast} for creating a custom toast
 * implementation.
 * @remarks \@since 6.0.0 Rewritten to use a new API that supports adding toasts
 * outside of React components and rendering multiple toasts at once.
 */
export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(props, ref) {
    const {
      id: propId,
      role = "status",
      className,
      limit = 1,
      position = "bottom",
      renderToast: RenderToast = DefaultToastRenderer,
      disablePortal,
      toastDefaults,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "snackbar");
    const queue = useToastQueue(limit);

    return (
      <Portal disabled={disablePortal}>
        <div
          {...remaining}
          id={id}
          ref={ref}
          role={role}
          className={snackbar({ position, className })}
        >
          {queue.map((toast) => (
            <RenderToast
              {...toast}
              key={toast.toastId}
              toastDefaults={toastDefaults}
            />
          ))}
        </div>
      </Portal>
    );
  }
);
