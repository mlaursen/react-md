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

/**
 * This type allows you to require at least one of the provided keys. This is super helpful
 * for things like `aria-label` or `aria-labelledby` when it's required for a11y.
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  { [K in Keys]-?: Required<Pick<T, K>> }[Keys];
