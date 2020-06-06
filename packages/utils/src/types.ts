import { Ref, ReactElement } from "react";

export type Maybe<T, NotFound = null> = T | NotFound;

/**
 * A helper type that allows an optional `ref` to also be applied with a props
 * object even though a `ref` isn't a real prop.
 */
export type PropsWithRef<P extends {}, E extends HTMLElement> = P & {
  /**
   * An optional ref that can be applied.
   */
  ref?: Ref<E>;
};

/**
 * A simple type that can be used for different components that clone a
 * `className` into a child component.
 */
export type ClassNameCloneableChild<T = {}> = ReactElement<
  T & { className?: string }
>;

/**
 * This type allows you to require at least one of the provided keys. This is
 * super helpful for things like `aria-label` or `aria-labelledby` when it's
 * required for a11y.
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  { [K in Keys]-?: Required<Pick<T, K>> }[Keys];

interface LabelA11y {
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export type LabelRequiredForA11y<T extends LabelA11y> = T &
  RequireAtLeastOne<T, "aria-label" | "aria-labelledby">;
