import { createContext, ReactElement, useContext, useState } from "react";
import { List, ListProps } from "@react-md/list";
import { LabelRequiredForA11y, useKeyboardFocus } from "@react-md/utils";

import { useMenuBarContext } from "./MenuBarProvider";

/**
 * This contet is used to implement the "roving tab index" behavior
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
export interface BaseMenuBarWidgetProps extends Omit<ListProps, "role"> {
  /**
   * @defaultValue `true`
   * @see {@link ListProps.horizontal}
   */
  horizontal?: boolean;
}

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
  horizontal = true,
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
        horizontal={horizontal}
        tabIndex={tabIndex ?? (focusId ? -1 : 0)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      >
        {children}
      </List>
    </Provider>
  );
}
