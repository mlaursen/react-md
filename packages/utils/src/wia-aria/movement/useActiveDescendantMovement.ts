import { Dispatch, SetStateAction, useState } from "react";

import { scrollIntoView } from "../../scrollIntoView";
import { DEFAULT_GET_ITEM_VALUE, DEFAULT_VALUE_KEY } from "../../search/utils";
import {
  BaseKeyboardMovementOptions,
  ItemRefList,
  MovementHandler,
  useKeyboardMovement,
} from "./useKeyboardMovement";
import { getItemId } from "./utils";

export type ActiveDescendantId = string;

/**
 *
 * @typeParam CE - The HTMLElement type of the container element that handles
 * the custom keyboard movement.
 * @typeParam IE - The HTMLElement type of each item within the container
 * element that can be focusable.
 */
export interface ActiveDescendantMovementProviders<
  CE extends HTMLElement,
  IE extends HTMLElement
> {
  itemRefs: ItemRefList<IE>;
  onKeyDown: MovementHandler<CE>;
  activeId: ActiveDescendantId;
  focusedIndex: number;
  setFocusedIndex: Dispatch<SetStateAction<number>>;
}

type KeyHandler<IE extends HTMLElement = HTMLElement> = (
  focusedIndex: number,
  itemRef: IE | null
) => void;

interface ActiveDescendantOptions<
  D = unknown,
  CE extends HTMLElement = HTMLElement,
  IE extends HTMLElement = HTMLElement
> extends BaseKeyboardMovementOptions<D, CE, IE> {
  /**
   * The base id that should be used to generate the `aria-activedescendant`
   * value id. This will be passed into the `getId` option.
   */
  baseId: string;

  /**
   * The function that should generate an id based on the provided `id` and
   * `index` of the item.
   */
  getId?(id: string, index: number): string;

  /**
   * The default index that should be "focused" when the component mounts. This
   * is set to `-1` by default so that it only gains a new "focused" index when
   * the container element is focused.
   */
  defaultFocusedIndex?: (() => number) | number;

  /**
   * An optional function to call when the enter key has been pressed while the
   * container element has keyboard focus. This is normally used for triggering
   * click events for that specific item.
   */
  onEnter?: KeyHandler<IE>;

  /**
   * An optional function to call when the space key has been pressed while the
   * container element has keyboard focus. This is normally used for triggering
   * click events for that specific item and will always call
   * `event.preventDefault()` to prevent the page scrolling behavior.
   */
  onSpace?: KeyHandler<IE>;
}

/**
 * This hook allows for custom keyboard "focus" movement using the
 * `aria-activedescendant` movement pattern. This is generally used when the DOM
 * focus shouldn't actually change from the container element (like listboxes)
 * but you still need to indicate that another element is "focused" due to a key
 * press.
 *
 * To use this hook, you'll want to update the container element of all the
 * items to have an `aria-activedescendant={activeId}` attribute and
 * `onKeyDown={onKeyDown}` that are provided by this hook. The
 * `aria-activedescendant` will help screen readers known what element is
 * "focused" since the container element should never really lose focus during
 * these keyboard movement events.  Finally, you'll want to update each item
 * have an id that is the result of `getItem(baseId, index)` so that it matches
 * the `aria-activedescendant` value and then apply `ref={itemRefs[i]}`.
 * Unfortunately, this means that all the child items **must** either be an
 * HTMLElement or the ref is forwarded down to the HTMLElement.
 *
 * The `itemRefs` **must** be applied so that a new "focused" item can be
 * scrolled into view as needed.
 *
 * @typeParam D - The type of each data item within the items list.
 * @typeParam CE - The HTMLElement type of the container element that handles
 * the custom keyboard movement.
 * @typeParam IE - The HTMLElement type of each item within the container
 * element that can be focusable.
 */
export function useActiveDescendantMovement<
  D = unknown,
  CE extends HTMLElement = HTMLElement,
  IE extends HTMLElement = HTMLElement
>({
  baseId,
  getId = getItemId,
  defaultFocusedIndex = -1,
  items,
  onChange,
  getItemValue = DEFAULT_GET_ITEM_VALUE,
  valueKey = DEFAULT_VALUE_KEY,
  onKeyDown,
  onEnter,
  onSpace,
  ...options
}: ActiveDescendantOptions<D, CE, IE>): ActiveDescendantMovementProviders<
  CE,
  IE
> {
  const [focusedIndex, setFocusedIndex] = useState(defaultFocusedIndex);
  const activeId = focusedIndex !== -1 ? getId(baseId, focusedIndex) : "";

  const [itemRefs, handleKeyDown] = useKeyboardMovement<D, CE, IE>({
    ...options,
    valueKey,
    getItemValue,
    focusedIndex,
    items,
    onChange(data, itemRefs) {
      if (onChange) {
        onChange(data, itemRefs);
      }

      const { index, target } = data;
      const item = itemRefs[index] && itemRefs[index].current;
      if (item && target && target.scrollHeight > target.offsetHeight) {
        scrollIntoView(target, item);
      }

      setFocusedIndex(index);
    },
    onKeyDown(event) {
      if (onKeyDown) {
        onKeyDown(event);
      }

      const ref =
        (itemRefs[focusedIndex] && itemRefs[focusedIndex].current) || null;
      if (onEnter && event.key === "Enter") {
        onEnter(focusedIndex, ref);
      } else if (onSpace && event.key === " ") {
        event.preventDefault();
        onSpace(focusedIndex, ref);
      }
    },
  });

  return {
    activeId,
    itemRefs,
    onKeyDown: handleKeyDown,
    focusedIndex,
    setFocusedIndex,
  };
}
