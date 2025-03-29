"use client";

import {
  Component,
  type ErrorInfo,
  type ReactElement,
  type ReactNode,
} from "react";

import { Provider } from "./context.js";
import { type ErrorBoundaryContext, type ErrorBoundaryState } from "./types.js";

/**
 * @since 6.0.0
 */
export interface ErrorBoundaryProps {
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  fallback: ReactNode;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * This is a minimal fork of the `react-error-boundary` package from
 * {@link https://github.com/bvaughn/react-error-boundary/tree/5.0.0}
 * that only includes things I consider useful. Use the `react-error-boundary`
 * if more complex behavior is required.
 *
 * @example Main Use Case
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { ErrorBoundary } from "@react-md/core/error-boundary/ErrorBoundary";
 * import { useErrorBoundary } from "@react-md/core/error-boundary/useErrorBoundary";
 * import { Typography } from "@react-md/core/typography/Typography";
 *
 * function Example() {
 *   return (
 *     <ErrorBoundary
 *       fallback={<SomeFallbackComponent />}
 *     >
 *       <SomeComponentThatMightError />
 *     </ErrorBoundary>
 *   );
 * }
 *
 * "use client";
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
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { error: null, errored: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error, errored: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  reset = (): void => {
    this.setState({ error: null, errored: false });
  };

  render(): ReactElement {
    const { fallback } = this.props;
    const { error, errored } = this.state;

    let { children } = this.props;
    if (errored) {
      children = fallback;
    }

    return (
      <Provider
        // should always match
        value={{ error, errored, reset: this.reset } as ErrorBoundaryContext}
      >
        {children}
      </Provider>
    );
  }
}
