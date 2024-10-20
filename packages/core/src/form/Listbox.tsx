import {
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type Ref,
  useMemo,
} from "react";
import { Menu, type MenuProps } from "../menu/Menu.js";
import { type LabelRequiredForA11y } from "../types.js";
import { ListboxProvider } from "./ListboxProvider.js";
import { type OptionSelectedIconProps } from "./Option.js";

/**
 * @since 6.0.0
 * @internal
 */
export type ListboxValue = string | number | null | Record<string, unknown>;

/**
 * @since 6.0.0
 */
export interface ListboxSelectedIconProps extends OptionSelectedIconProps {
  /**
   * Set this to `true` to update all the `Option` components to no longer
   * render an icon while selected.
   *
   * @defaultValue `false`
   */
  disableSelectedIcon?: boolean;
}

/**
 * @since 6.0.0
 * @internal
 */
export interface ListboxProps<Value extends ListboxValue>
  extends MenuProps,
    ListboxSelectedIconProps {
  nodeRef?: Ref<HTMLDivElement>;

  value: Value | readonly NonNullable<ListboxValue>[];
  setValue: Dispatch<NonNullable<Value>>;
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
      value={useMemo(
        () => ({
          selectOption: setValue,
          isOptionSelected(option) {
            return (
              option === value ||
              (Array.isArray(value) && value.includes(option))
            );
          },
          selectedIcon,
          unselectedIcon,
          selectedIconAfter,
          disableSelectedIcon,
        }),
        [
          disableSelectedIcon,
          selectedIcon,
          selectedIconAfter,
          setValue,
          unselectedIcon,
          value,
        ]
      )}
    >
      <Menu {...remaining} ref={nodeRef}>
        {children}
      </Menu>
    </ListboxProvider>
  );
}
