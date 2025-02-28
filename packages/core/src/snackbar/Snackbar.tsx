"use client";

import { type ComponentType, type HTMLAttributes, forwardRef } from "react";

import { Portal } from "../portal/Portal.js";
import { useEnsuredId } from "../useEnsuredId.js";
import {
  DefaultToastRenderer,
  type ToastRendererProps,
} from "./DefaultToastRenderer.js";
import { type ConfigurableToastProps } from "./Toast.js";
import { useToastQueue } from "./ToastManagerProvider.js";
import { type SnackbarPosition, snackbar } from "./snackbarStyles.js";

/**
 * @since 6.0.0 The `id` prop is optional
 */
export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  /** @defaultValue `"snackbar-" + useId()` */
  id?: string;

  /**
   * Set this to the number of toasts that can be visible within the snackbar at
   * the same time. Any toasts added after this value will be added into the
   * queue to be shown.
   *
   * @defaultValue `1`
   */
  limit?: number;

  /**
   * Set this to `true` if the snackbar should use absolute positioning so it
   * can be fixed within a `position: relative` container instead of the entire
   * viewport.
   *
   * @defaultValue `false`
   */
  absolute?: boolean;

  /** @defaultValue `"bottom"` */
  position?: SnackbarPosition;

  /** @defaultValue `false` */
  disablePortal?: boolean;

  /**
   * This can be used to create a custom toast implementation.
   *
   * @example
   * ```ts
   * import { Snackbar } from "@react-md/core/snackbar/Snackbar";
   * import { Toast } from "@react-md/core/snackbar/Toast";
   * import { ToastContent } from "@react-md/core/snackbar/ToastContent";
   * import { type ToastRendererProps } from "@react-md/core/snackbar/DefaultToastRenderer";
   * import { useToastManager } from "@react-md/core/snackbar/ToastManagerProvider";
   * import { type ReactElement } from "react";
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
 * @example Super Simple Example
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { Snackbar } from "@react-md/core/snackbar/Snackbar";
 * import { addToast } from "@react-md/core/snackbar/ToastManager";
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
 * @since 6.0.0 Rewritten to use a new API that supports adding toasts
 * outside of React components and rendering multiple toasts at once.
 */
export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(props, ref) {
    const {
      id: propId,
      className,
      limit = 1,
      absolute,
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
        {queue.length > 0 && (
          <div
            {...remaining}
            id={id}
            ref={ref}
            className={snackbar({ absolute, position, className })}
          >
            {queue.map((toast) => (
              <RenderToast
                {...toast}
                key={toast.toastId}
                toastDefaults={toastDefaults}
              />
            ))}
          </div>
        )}
      </Portal>
    );
  }
);
