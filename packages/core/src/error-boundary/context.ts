import { createContext } from "react";

import { type ErrorBoundaryContext } from "./types.js";

/**
 * @internal
 * @since 6.0.0
 */
export const context = createContext<ErrorBoundaryContext | null>(null);
context.displayName = "ErrorBoundary";

/**
 * @internal
 * @since 6.0.0
 */
export const { Provider } = context;
