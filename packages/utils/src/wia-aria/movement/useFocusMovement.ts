import { useState, useEffect } from "react";
import { SearchChangeEvent } from "../../search/useKeyboardSearch";
import useKeyboardMovement, {
  KeyboardMovementOptions,
  KeyboardMovementProviders,
} from "./useKeyboardMovement";

type Options<D = unknown, E extends HTMLElement = HTMLElement> = Omit<
  KeyboardMovementOptions<D, E>,
  "onChange" | "focusedIndex"
>;

interface KeyboardFocusOptions<
  D = unknown,
  E extends HTMLElement = HTMLElement
> extends Options<D, E> {
  /**
   * The index that should be focused by default.
   */
  defaultFocusedIndex?: number;

  /**
   * An optional function to call when the keydown event triggers a new item to
   * be focused via `aria-activedescendant`.
   */
  onChange?: SearchChangeEvent<D>;
}

/**
 * This hook allows for custom keyboard focus movement using DOM focus behavior
 * by actually focusing each DOM node.
 *
 * To use this hook, you'll want to update the container element of all the
 * items to have a correct `role` applied as well as the `onKeyDown` event
 * handler provided by this hook. Then, you'll want to applied a
 * `ref={itemRefs[i]}` for each item within the items list so that the DOM nodes
 * can be focused as needed. Unfortunately, this means that all the child items
 * **must** either be an HTMLElement or the ref is forwarded down to the
 * HTMLElement.
 *
 * @typeparam D The type of each data item within the items list.
 * @typeparam CE The HTMLElement type of the container element that handles the
 * custom keyboard movement.
 * @typeparam IE The HTMLElement type of each item within the container element
 * that can be focusable.
 */
export default function useFocusMovement<
  D = unknown,
  E extends HTMLElement = HTMLElement,
  I extends HTMLElement = HTMLElement
>({
  defaultFocusedIndex = -1,
  onChange,
  ...options
}: KeyboardFocusOptions<D, E>): KeyboardMovementProviders<E, I> {
  const [focusedIndex, setFocusedIndex] = useState(defaultFocusedIndex);
  const { itemRefs, onKeyDown } = useKeyboardMovement<D, E, I>({
    ...options,
    focusedIndex,
    onChange(data) {
      if (onChange) {
        onChange(data);
      }

      const { index } = data;
      if (index === -1) {
        return;
      }

      const item = itemRefs[index] && itemRefs[index].current;
      if (item) {
        item.focus();
      }

      setFocusedIndex(index);
    },
  });

  useEffect(() => {
    if (defaultFocusedIndex === -1) {
      return;
    }

    const item =
      itemRefs[defaultFocusedIndex] && itemRefs[defaultFocusedIndex].current;
    if (item) {
      item.focus();
    }

    // only want to trigger on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { itemRefs, onKeyDown };
}
