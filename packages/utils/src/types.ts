export type Maybe<T, NotFound = null> = T | NotFound;

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
