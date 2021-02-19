import { MutableRefObject, Ref } from "react";

/**
 * A small utility function that allows me to apply a passed in ref along with
 * my own custom ref logic.
 *
 * @param instance - The DOM Node instance
 * @param ref - The prop ref
 */
export function applyRef<E>(instance: E | null, ref?: Ref<E>): void {
  if (!ref) {
    return;
  }

  if (typeof ref === "function") {
    ref(instance);
  } else if (typeof ref === "object") {
    (ref as MutableRefObject<E | null>).current = instance;
  }
}
