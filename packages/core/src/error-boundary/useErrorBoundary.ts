import { useContext } from "react";

import { context } from "./context.js";
import { type ErrorBoundaryContext } from "./types.js";

/**
 * @example Fallback Example
 * ```tsx
 * "use client";
 *
 * import { Button } from "@react-md/core/button/Button";
 * import { useErrorBoundary } from "@react-md/core/error-boundary/useErrorBoundary";
 * import { Typography } from "@react-md/core/typography/Typography";
 *
 * function SomeFallbackComponent() {
 *   const { error, errored, reset } = useErrorBoundary();
 *
 *   return (
 *     <>
 *       <Typography>Uh oh, something broke!</Typography>
 *       <Button onClick={reset}>Try Again?</Button>
 *     </>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useErrorBoundary(): ErrorBoundaryContext {
  const value = useContext(context);
  if (!value) {
    throw new Error("ErrorBoundary has not been mounted");
  }

  return value;
}
