import * as React from "react";

/**
 * A simple shareable interface that can be used to show that a component has
 * a forwarded ref.
 */
export interface IWithForwardedRef<E = HTMLElement> {
  forwardedRef?: React.Ref<E>;
}

export type Maybe<T, NotFound = null> = T | NotFound;
