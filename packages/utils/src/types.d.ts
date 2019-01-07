import * as React from "react";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * A simple shareable interface that can be used to show that a component has
 * a forwarded ref.
 */
export interface IWithForwardedRef<E = HTMLElement> {
  forwardedRef?: React.Ref<E>;
}
