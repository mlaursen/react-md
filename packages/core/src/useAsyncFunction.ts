"use client";

import { type RefObject, useCallback, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type AsyncButton } from "./button/AsyncButton.js";
import { type UseStateSetter } from "./types.js";
import { useUnmounted } from "./useUnmounted.js";

/**
 * @since 6.0.0
 */
export type AsyncFunction<Args extends unknown[]> = (
  ...args: Args
) => Promise<void>;

/**
 * @since 6.0.0
 */
export type HandleAsyncFunction = <Args extends unknown[]>(
  action: AsyncFunction<Args>
) => AsyncFunction<Args>;

/**
 * @since 6.0.0
 */
export interface AsyncFunctionHookOptions {
  /** @defaultValue `false` */
  disabled?: boolean;
}

/**
 * @since 6.0.0
 */
export interface AsyncFunctionHookImplementation {
  pending: boolean;

  /**
   * This ref can be used to prevent setting state on an unmounted component.
   * @example
   * ```tsx
   * const { handleAsync, pending, unmounted } = useAsyncFunction();
   *
   * return (
   *   <Button
   *     onClick={async () => {
   *       await handleAsync(someAsyncTaskThatMightUnmountThisComponent);
   *       if (!unmounted.current) {
   *         // set some local state
   *       }
   *     }}
   *  >
   *    Button
   *  </Button>
   * );
   * ```
   */
  unmounted: RefObject<boolean>;
  setPending: UseStateSetter<boolean>;
  handleAsync: HandleAsyncFunction;
}

/**
 * A simple utility hook for triggering a pending state while an async function
 * is running. This is really only useful if you aren't using something like
 * `react-query`, `@reduxjs/toolkit/query`, `@apollo/client`, etc for API calls
 * which have a built-in pending state for mutations.
 *
 * @see {@link AsyncButton}
 *
 * @example Confirmation Dialog with Overlay
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { Dialog } from "@react-md/core/dialog/Dialog";
 * import { DialogContent } from "@react-md/core/dialog/DialogContent";
 * import { DialogFooter } from "@react-md/core/dialog/DialogFooter";
 * import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
 * import { Form } from "@react-md/core/form/Form";
 * import { useAsyncFunction } from "@react-md/core/useAsyncFunction";
 * import CloseIcon from "@react-md/material-icons/CloseIcon";
 * import { type ReactElement, useId } from "react";
 *
 * interface ExampleProps {
 *   hide(); void;
 *   submit(): Promise<void>
 * }
 *
 * function Example({ hide, submit }: ExampleProps): ReactElement {
 *   const { handleAsync, pending } = useAsyncFunction();
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
 * @since 6.0.0
 */
export function useAsyncFunction(
  options: AsyncFunctionHookOptions = {}
): AsyncFunctionHookImplementation {
  const { disabled } = options;

  const [pending, setPending] = useState(false);
  const unmounted = useUnmounted();

  const handleAsync = useCallback<HandleAsyncFunction>(
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
