"use client";

import { type ReactElement, type ReactNode, type Ref } from "react";

import { Menu, type MenuProps } from "../menu/Menu.js";
import { type LabelRequiredForA11y } from "../types.js";
import {
  ListboxProvider,
  type ListboxProviderOptions,
  type ListboxValue,
  useListboxProvider,
} from "./ListboxProvider.js";

/**
 * @since 6.0.0
 * @internal
 */
export interface ListboxProps<Value extends ListboxValue>
  extends MenuProps, ListboxProviderOptions<Value> {
  nodeRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}

/**
 * @since 6.0.0
 * @internal
 */
export function Listbox<T extends ListboxValue>(
  props: LabelRequiredForA11y<ListboxProps<T>>
): ReactElement {
  const {
    value,
    setValue,
    children,
    nodeRef,
    selectedIconAfter,
    selectedIcon,
    unselectedIcon,
    disableSelectedIcon,
    ...remaining
  } = props;

  return (
    <ListboxProvider
      value={useListboxProvider({
        value,
        setValue,
        selectedIcon,
        selectedIconAfter,
        disableSelectedIcon,
        unselectedIcon,
      })}
    >
      <Menu {...remaining} ref={nodeRef}>
        {children}
      </Menu>
    </ListboxProvider>
  );
}
