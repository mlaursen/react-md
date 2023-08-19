"use client";
import { useCallback, useState } from "react";
import type { NonNullRef, UseStateSetter } from "./types.js";
import { useUnmounted } from "./useUnmounted.js";

/**
 * @remarks \@since 6.0.0
 */
export type AsyncActionFunction<Args extends unknown[]> = (
  ...args: Args
) => Promise<void>;

/**
 * @remarks \@since 6.0.0
 */
export type HandleAsyncAction = <Args extends unknown[]>(
  action: AsyncActionFunction<Args>
) => AsyncActionFunction<Args>;

/**
 * @remarks \@since 6.0.0
 */
export interface AsyncActionOptions {
  /** @defaultValue `false` */
  disabled?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export interface AsyncActionImplementation {
  pending: boolean;
  unmounted: NonNullRef<boolean>;
  setPending: UseStateSetter<boolean>;
  handleAsync: HandleAsyncAction;
}

/**
 * A simple utility hook for triggering a pending state while an async function
 * is running. This is really only useful if you aren't using something like
 * `react-query`, `@reduxjs/toolkit/query`, `@apollo/client`, etc for API calls
 * which have a built-in pending state for mutations.
 *
 * @example
 * Simple Example (Async Button)
 * ```tsx
 * import type { ButtonProps } from "@react-md/core";
 * import { box, Button, CircularProgress, useAsyncAction } from "@react-md/core";
 * import { cnb } from "cnbuilder";
 * import type { MouseEvent, ReactElement } from "react";
 *
 * import styles from "./AsyncButton.module.scss";
 *
 * export interface AsyncButtonProps extends ButtonProps {
 *   onClick(event: MouseEvent<HTMLButtonElement>): Promise<void>;
 * }
 *
 * export function AsyncButton(props: AsyncButtonProps): ReactElement {
 *   const { onClick, children, theme, className, disabled, ...remaining } = props;
 *   const { handleAsync, pending } = useAsyncAction({ disabled });
 *
 *   return (
 *     <Button
 *       {...remaining}
 *       aria-disabled={pending || undefined}
 *       disabled={disabled}
 *       className={cnb(pending && styles.loading, className)}
 *       theme={pending ? "disabled" : theme}
 *       onClick={handleAsync(onClick)}
 *     >
 *       {children}
 *       {pending && (
 *         <span
 *           className={box({
 *             align: "center",
 *             disablePadding: true,
 *             className: styles.overlay,
 *           })}
 *         >
 *           <CircularProgress />
 *         </span>
 *       )}
 *     </Button>
 *   );
 * }
 *
 * // `AsyncButton.module.scss`
 * // hide everything in the button except for the overlay containing the circular
 * // progress
 * .loading > *:not(.overlay) {
 *   opacity: 0;
 * }
 *
 * .overlay {
 *   border-radius: inherit;
 *   box-shadow: inherit;
 *   inset: 0;
 *   position: absolute;
 *   z-index: 1;
 * }
 * ```
 *
 * @example
 * Confirmation Dialog with Overlay
 * ```tsx
 * import {
 *   Button,
 *   DialogHeader,
 *   DialogContent,
 *   DialogFooter,
 *   Form,
 *   useAsyncAction,
 * } from "@react-md/core";
 * import CloseIcon from "@react-md/material-icons/CloseIcon";
 * import type { ReactElement } from "react";
 * import { useId } from "react";
 *
 * interface ExampleProps {
 *   hide(); void;
 *   submit(): Promise<void>
 * }
 *
 * function Example({ hide, submit }: ExampleProps): ReactElement {
 *   const { handleAsync, pending } = useAsyncAction();
 *   const formId = useId();
 *
 *   return (
 *     <>
 *       <DialogHeader>
 *         <DialogTitle>Some Title</DialogTitle>
 *         <Button aria-label="Close" onClick={hide} disabled={pending}>
 *           <CloseIcon />
 *         </Button>
 *       </DialogHeader>
 *       <DialogContent>
 *         <Form
 *           id={formId}
 *           onReset={hide}
 *           onSubmit={handleAsync(submit)}
 *         >
 *           // pretend content
 *         </Form>
 *       </DialogContent>
 *       <DialogFooter>
 *         <Button
 *           type="reset"
 *           form={formId}
 *           disabled={pending}
 *         >
 *           Cancel
 *         </Button>
 *         <Button
 *           type="submit"
 *           form={formId}
 *           disabled={pending}
 *         >
 *           Confirm
 *         </Button>
 *       </DialogFooter>
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function useAsyncAction(
  options: AsyncActionOptions = {}
): AsyncActionImplementation {
  const { disabled } = options;

  const [pending, setPending] = useState(false);
  const unmounted = useUnmounted();

  const handleAsync = useCallback<HandleAsyncAction>(
    (action) =>
      async (...args) => {
        if (pending || disabled) {
          return;
        }

        setPending(true);
        try {
          await action(...args);
        } finally {
          if (!unmounted.current) {
            setPending(false);
          }
        }
      },
    [disabled, pending, unmounted]
  );

  return {
    pending,
    unmounted,
    setPending,
    handleAsync,
  };
}
