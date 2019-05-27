import { useRef, useCallback, Ref } from "react";
import { applyRef } from "@react-md/utils";

/**
 * This simple hook will merge the provided ref from the menu with the
 * menu ref that is used within the `Menu` component to determine different
 * events.
 */
export default function useMenuRef(
  ref: Ref<HTMLDivElement | null> | undefined
) {
  const menu = useRef<HTMLDivElement | null>(null);
  const menuRef = useCallback(
    (instance: HTMLDivElement | null) => {
      applyRef(instance, ref);
      menu.current = instance;
    },
    [ref]
  );

  return { menu, ref: menuRef };
}
