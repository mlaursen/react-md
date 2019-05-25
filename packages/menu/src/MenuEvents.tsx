import { FC, MutableRefObject } from "react";
import { usePreviousFocus, useFocusOnMount } from "@react-md/wia-aria";

export interface MenuEventsProps {
  menuRef: MutableRefObject<HTMLDivElement | null>;
  defaultFocus: "first" | "last" | string;
}

/**
 * This is just a simple component that is used with the `Menu` component to handle the
 * initial focus on mount and re-focusing a previous element on unmount.
 * @private
 */
const MenuEvents: FC<MenuEventsProps> = ({ menuRef, defaultFocus }) => {
  usePreviousFocus(false);
  useFocusOnMount(menuRef, defaultFocus, true);
  return null;
};

export default MenuEvents;
