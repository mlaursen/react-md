import { MutableRefObject } from "react";
import { useFocusOnMount, usePreviousFocus } from "@react-md/utils";

export interface MenuEventsProps {
  menuRef: MutableRefObject<HTMLDivElement | null>;
  cancelled: boolean;
  defaultFocus: "first" | "last" | string;
}

/**
 * This is just a simple component that is used with the `Menu` component to
 * handle the initial focus on mount and re-focusing a previous element on
 * unmount.
 * @internal
 */
export function MenuEvents({
  menuRef,
  cancelled,
  defaultFocus,
}: MenuEventsProps): null {
  usePreviousFocus(cancelled);
  useFocusOnMount(menuRef, defaultFocus, false, true);
  return null;
}
