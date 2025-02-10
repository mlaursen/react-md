import { type Ref, type RefCallback, useEffect } from "react";

import { useEnsuredRef } from "./useEnsuredRef.js";

/**
 * @since 6.0.0
 */
export interface MutationObserverHookOptions<E extends HTMLElement>
  extends MutationObserverInit {
  ref?: Ref<E>;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#options
   * @defaultValue `!childList && !attributes && !characterData`
   */
  disabled?: boolean;

  onUpdate: (mutation: MutationRecord) => void;
}

/**
 * The mutation observer is used to track the changes made to the DOM tree.
 *
 * @example Simple Example
 * ```tsx
 * import { useMutationObserver } from "@react-md/core/useMutationObserver";
 * import { useCallback, type HTMLAttributes, type ReactElement } from "react";
 *
 * function Example(props: HTMLAttributes<HTMLDivElement>): ReactElement {
 *   const { children, ...remaining } = props;
 *
 *   const targetRef = useMutationObserver({
 *     subtree: true,
 *     attributes: true,
 *     childList: true,
 *     onUpdate: useCallback((mutation) => {
 *       switch (mutation.type) {
 *         case "childList":
 *           console.log("A child node has been added or removed");
 *           break;
 *         case "attributes":
 *           console.log(`The ${mutation.attributeName} attribute was modified`);
 *           break
 *       }
 *
 *     }, []),
 *   });
 *
 *   return (
 *     <div {...remaining} ref={targetRef}>
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useMutationObserver<E extends HTMLElement>(
  options: MutationObserverHookOptions<E>
): RefCallback<E> {
  const {
    ref,
    onUpdate,
    attributes,
    attributeFilter,
    attributeOldValue,
    subtree,
    childList,
    characterData,
    characterDataOldValue,
    disabled = !childList && !attributes && !characterData,
  } = options;

  const [targetNodeRef, refCallback] = useEnsuredRef(ref);
  useEffect(() => {
    if (disabled) {
      return;
    }

    const observerTarget = targetNodeRef.current;
    if (!observerTarget) {
      return;
    }

    const observer = new MutationObserver((records) => {
      const [entry] = records;
      if (entry) {
        onUpdate(entry);
      }
    });

    observer.observe(observerTarget, {
      attributes,
      attributeFilter,
      attributeOldValue,
      subtree,
      childList,
      characterData,
      characterDataOldValue,
    });
    return () => {
      observer.disconnect();
    };
  }, [
    attributeFilter,
    attributeOldValue,
    attributes,
    characterData,
    characterDataOldValue,
    childList,
    disabled,
    onUpdate,
    subtree,
    targetNodeRef,
  ]);

  return refCallback;
}
