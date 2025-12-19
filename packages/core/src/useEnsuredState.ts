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
  name?: string;
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
  const { name = "value", value, setValue, defaultValue } = options;
  if (value !== undefined && setValue !== undefined) {
    return [value, setValue];
  }

  if (value !== undefined || setValue !== undefined) {
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
    throw new Error(
      `Both a \`${name}\` and \`set${pascalName}\` must be defined for controlled components.`
    );
  }

  if (defaultValue === undefined) {
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
    throw new Error(
      `A \`default${pascalName}\` must be defined for uncontrolled components.`
    );
  }

  return useState(defaultValue) as [value: V, setValue: Setter];
}
