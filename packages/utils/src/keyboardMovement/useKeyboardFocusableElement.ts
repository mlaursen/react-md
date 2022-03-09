import type { Ref, RefCallback } from "react";
import { useCallback, useRef } from "react";

import { applyRef } from "../applyRef";
import { useKeyboardFocusContext } from "./movementContext";

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export function useKeyboardFocusableElement<E extends HTMLElement>(
  ref?: Ref<E>
): RefCallback<E> {
  const { attach, detach } = useKeyboardFocusContext();
  const nodeRef = useRef<E | null>(null);

  return useCallback(
    (instance: E | null) => {
      applyRef(instance, ref);
      if (instance) {
        attach(instance);
      } else if (nodeRef.current) {
        detach(nodeRef.current);
      }

      nodeRef.current = instance;
    },
    [attach, detach, ref]
  );
}
