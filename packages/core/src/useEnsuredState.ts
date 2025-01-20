/* eslint-disable react-hooks/rules-of-hooks */
import type { Dispatch } from "react";
import { useState } from "react";

import type { UseStateInitializer, UseStateSetter } from "./types.js";

/**
 * @internal
 * @since 6.0.0
 */
export interface EnsuredStateOptions<
  V,
  Setter extends Dispatch<V> | UseStateSetter<V> = UseStateSetter<V>,
> {
  value?: V;
  setValue?: Setter;
  defaultValue?: UseStateInitializer<V>;
}

/**
 * This is used to dynamically allow controlling hooks by providing a `value` +
 * `setValue` or defaulting to uncontrolled behavior with local state.
 *
 * @internal
 * @since 6.0.0
 */
export function useEnsuredState<
  V,
  Setter extends Dispatch<V> | UseStateSetter<V>,
>(
  options: EnsuredStateOptions<V, Setter>
): readonly [value: V, setValue: Setter] {
  const { value, setValue, defaultValue } = options;
  if (typeof value !== "undefined" && typeof setValue !== "undefined") {
    return [value, setValue];
  }

  if (typeof value !== "undefined" || typeof setValue !== "undefined") {
    throw new Error(
      "Both a `value` and `setValue` must be defined for controlled components."
    );
  }

  if (typeof defaultValue === "undefined") {
    throw new Error(
      "A `defaultValue` must be defined for uncontrolled components."
    );
  }

  return useState(defaultValue) as [value: V, setValue: Setter];
}
