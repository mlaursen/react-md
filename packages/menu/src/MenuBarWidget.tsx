import type { ReactElement } from "react";
import { createContext, useContext, useState } from "react";
import type { ListProps } from "@react-md/list";
import { List } from "@react-md/list";
import type { LabelRequiredForA11y } from "@react-md/utils";
import { useKeyboardFocus } from "@react-md/utils";

import { useMenuBarContext } from "./MenuBarProvider";

/**
 * This context is used to implement the "roving tab index" behavior
 *
 * @internal
 * @remarks \@since 5.0.0
 */
const context = createContext("");
context.displayName = "MenuBarWidgetFocusId";
const { Provider } = context;

/** @remarks \@since 5.0.0 */
export function useMenuBarWidgetFocusId(): string {
  return useContext(context);
}

/** @remarks \@since 5.0.0 */
export type BaseMenuBarWidgetProps = Omit<ListProps, "role" | "horizontal">;

/** @remarks \@since 5.0.0 */
export type MenuBarWidgetProps = LabelRequiredForA11y<BaseMenuBarWidgetProps>;

/**
 * This component implements the keyboard focus behavior for the `MenuBar`
 * component and probably shouldn't be used externally.
 *
 * @remarks \@since 5.0.0
 */
export function MenuBarWidget({
  children,
  tabIndex,
  onFocus: propOnFocus,
  onKeyDown: propOnKeyDown,
  ...props
}: MenuBarWidgetProps): ReactElement {
  const { setActiveId } = useMenuBarContext();
  const [focusId, setFocusId] = useState("");
  const { onFocus, onKeyDown } = useKeyboardFocus({
    onFocus: propOnFocus,
    onKeyDown: propOnKeyDown,
    onFocusChange(element) {
      element.focus();
      setFocusId(element.id);
      setActiveId((prevActiveId) => (prevActiveId ? element.id : ""));
    },
  });

  return (
    <Provider value={focusId}>
      <List
        {...props}
        role="menubar"
        horizontal
        tabIndex={tabIndex ?? (focusId ? -1 : 0)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      >
        {children}
      </List>
    </Provider>
  );
}
