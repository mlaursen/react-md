import { cnb } from "cnbuilder";
import type { ComponentType, HTMLAttributes } from "react";
import { forwardRef } from "react";
import { Portal } from "../portal";
import { useEnsuredId } from "../useEnsuredId";
import { bem } from "../utils";
import type { ToastRendererProps } from "./DefaultToastRenderer";
import { DefaultToastRenderer } from "./DefaultToastRenderer";
import type { ConfigurableToastProps } from "./Toast";
import { useToastQueue } from "./ToastProvider";

const styles = bem("rmd-snackbar");

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

  return cnb(styles({ [position]: true }), className);
}

export type SnackbarPosition = "bottom" | "top";

/**
 * @remarks \@since 6.0.0 The `id` prop is optional
 */
export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @defaultValue `"snackbar-" + useId()`
   */
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
   * import type { CustomToastRendererProps } from "@react-md/core";
   * import { Snackbar, Toast, useHideToast } from "@react-md/core";
   * import type { ReactElement } from "react";
   *
   * function CustomToast(props: CustomToastRendererProps): ReactElement {
   *   const { toastId, visibleTime, ...remaining } = props;
   *   const hideToast = useHideToast();
   *
   *   return (
   *     <Toast
   *       theme={isError(toastId) ? "error" : "surface"}
   *       {...remaining}
   *     >
   *       <TranslateMessage id={toastId} />
   *       {isActionalable(toastId) && (
   *         <Button
   *           onClick={async () => {
   *             await someApiCall();
   *             hideToast();
   *           }}
   *         >
   *           Dismiss
   *         </Button>
   *       )}
   *     </Toast>
   *   )
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

  toastDefaults?: ConfigurableToastProps;
}

/**
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
