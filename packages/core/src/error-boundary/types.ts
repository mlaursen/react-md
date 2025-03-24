/**
 * @since 6.0.0
 */
export type ErrorBoundaryState =
  | {
      errored: false;
      error: null;
    }
  | {
      errored: true;
      error: Error;
    };

/**
 * @since 6.0.0
 */
export type ErrorBoundaryContext = ErrorBoundaryState & {
  reset: () => void;
};
