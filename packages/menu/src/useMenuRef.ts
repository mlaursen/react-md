import { MutableRefObject, Ref, useCallback, useRef } from "react";
import { applyRef } from "@react-md/utils";

interface ReturnValue {
  menu: MutableRefObject<HTMLDivElement | null>;
  ref: (instance: HTMLDivElement | null) => void;
}

/**
 * This simple hook will merge the provided ref from the menu with the menu ref
 * that is used within the `Menu` component to determine different events.
 */
export default function useMenuRef(
  ref: Ref<HTMLDivElement | null> | undefined
): ReturnValue {
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
