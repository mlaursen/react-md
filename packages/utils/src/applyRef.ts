import { Ref } from "react";

/**
 * A small utility function that allows me to apply a passed in
 * ref along with my own custom ref logic.
 *
 * @param instance - The DOM Node instance
 * @param ref - The prop ref
 */
export default function applyRef<E>(instance: E | null, ref?: Ref<E>) {
  if (!ref) {
    return;
  }

  if (typeof ref === "function") {
    ref(instance);
  } else if (typeof ref === "object") {
    (ref as { current: E | null }).current = instance;
  }
}
