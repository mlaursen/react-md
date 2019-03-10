import { Ref } from "react";

/**
 * A simple shareable interface that can be used to show that a component has
 * a forwarded ref.
 */
export interface WithForwardedRef<E = HTMLElement> {
  forwardedRef?: Ref<E>;
}

export type Maybe<T, NotFound = null> = T | NotFound;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
