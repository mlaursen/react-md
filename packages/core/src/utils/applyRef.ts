import type { MutableRefObject, Ref } from "react";

/**
 * A small utility function that allows me to apply a passed in ref along with
 * my own custom ref logic.
 *
 * @example Simple Example
 * ```tsx
 * import { HTMLAttributes, forwardRef } from "react";
 * import { applyRef } from "@react-md/core/utils/applyRef";
 *
 * export type ExampleProps = HTMLAttributes<HTMLDivElement>;
 *
 * const Example = forwardRef<HTMLDivElement, ExampleProps>(function Example(props, ref) {
 *   const refHandler = useCallback((instance: HTMLDivElement | null) => {
 *     applyRef(instance, ref);
 *     if (!instance) {
 *       return;
 *     }
 *
 *     // do something with instance
 *   });
 *
 *   return <div ref={refHandler} />;
 * });
 * ```
 *
 * @param instance - The DOM Node instance
 * @param ref - The prop ref
 * @internal
 */
export function applyRef<E>(instance: E | null, ref: Ref<E> | undefined): void {
  if (!ref) {
    return;
  }

  if (typeof ref === "function") {
    ref(instance);
  } else if (typeof ref === "object") {
    (ref as MutableRefObject<E | null>).current = instance;
  }
}
