import { ReactElement, Ref } from "react";

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
 *
 * @see https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist/49725198#49725198
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export interface LabelA11y {
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/**
 * A small accessibility helper to ensure that either `aria-label` or
 * `aria-labelledby` have been provided to a component.
 */
export type LabelRequiredForA11y<Props extends LabelA11y> = RequireAtLeastOne<
  Props,
  keyof LabelA11y
>;
