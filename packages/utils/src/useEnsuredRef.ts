import { MutableRefObject, Ref, RefCallback, useCallback, useRef } from "react";

import { applyRef } from "./applyRef";

/**
 * @remarks \@since 2.3.0
 */
export type EnsuredRefs<E extends HTMLElement> = readonly [
  MutableRefObject<E | null>,
  RefCallback<E | null>
];

/**
 * This is mostly an enternal hook that allows for an optional ref (normally
 * from props or hook options) to be merged with a hook's required `ref`. This
 * will return a MutableRefObject used for DOM manipulation in a custom hook
 * followed by a ref callback function that should be passed to the DOM node
 * that will ensure that both the optional `propRef` and hook ref are updated.
 *
 * @remarks \@since 2.3.0
 */
export function useEnsuredRef<E extends HTMLElement>(
  propRef?: Ref<E | null>
): EnsuredRefs<E> {
  const ref = useRef<E | null>(null);
  const refHandler = useCallback(
    (instance: E | null) => {
      applyRef(instance, propRef);
      ref.current = instance;
    },
    [propRef]
  );

  return [ref, refHandler];
}
