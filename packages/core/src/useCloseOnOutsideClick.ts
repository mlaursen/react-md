import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export interface CloseOnOutsideClickOptions {
  active: boolean;
  onRequestClose(event: MouseEvent): void;
  targetRef: RefObject<HTMLElement>;
  otherTargetRefs?: readonly RefObject<HTMLElement>[];
}

/**
 * ```tsx
 * import { useCloseOnOutsideClick } from "@react-md/core";
 * import type  { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const toggleRef = useRef<HTMLButtonElement>(null);
 *   const menuRef = useRef<HTMLDivElement>(null);
 *   const [visible, setVisible] = useState(false);
 *
 *   useCloseOnOutsideClick({
 *     active: visible,
 *     onRequestClose: () => setVisible(false),
 *     otherTargetRef: menuRef,
 *     otherTargetRefs: [toggleRef]
 *   });
 *
 *   return (
 *     <>
 *       <Button ref={toggleRef} onClick={() => setVisible(true)}>
 *         Show
 *       </BUtton>
 *       {visible && (
 *         <div ref={menuRef}>
 *           Pretend menu
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 * ```
 */
export function useCloseOnOutsideClick(
  options: CloseOnOutsideClickOptions
): void {
  const { active, onRequestClose, targetRef, otherTargetRefs = [] } = options;
  const configRef = useRef({
    onRequestClose,
    targetRef,
    otherTargetRefs,
  });
  useIsomorphicLayoutEffect(() => {
    configRef.current = {
      onRequestClose,
      targetRef,
      otherTargetRefs,
    };
  });

  useEffect(() => {
    if (!active) {
      return;
    }

    const handler = (event: MouseEvent): void => {
      const { target } = event;
      const {
        targetRef: otherTargetRef,
        otherTargetRefs,
        onRequestClose,
      } = configRef.current;
      if (
        !(target instanceof Element) ||
        (!otherTargetRef.current?.contains(target) &&
          !otherTargetRefs.some((ref) => ref.current?.contains(target)))
      ) {
        onRequestClose(event);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [active]);
}
