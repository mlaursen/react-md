import { MutableRefObject, useCallback, useMemo } from "react";
import { loop } from "../../loop";
import {
  BaseKeyboardSearchOptions,
  SearchData,
  useKeyboardSearch,
} from "../../search/useKeyboardSearch";
import { DEFAULT_GET_ITEM_VALUE, DEFAULT_VALUE_KEY } from "../../search/utils";
import { MovementConfig } from "./types";
import {
  getKeyboardConfig,
  getStringifiedKeyConfig,
  transformKeys,
} from "./utils";

export type MovementHandler<E extends HTMLElement> =
  React.KeyboardEventHandler<E>;

/**
 * A mutable ref object that must be applied to each DOM node within the
 * "focusable"/"searchable" list of elements so that custom focus behavior can
 * be triggered.
 *
 * @typeParam E - the element type of each item within the focusable list.
 */
export type ItemRef<E extends HTMLElement> = MutableRefObject<E | null>;

export type ItemRefList<E extends HTMLElement = HTMLElement> =
  readonly ItemRef<E>[];

export interface BaseKeyboardMovementOptions<
  D = unknown,
  CE extends HTMLElement = HTMLElement,
  IE extends HTMLElement = HTMLElement
> extends Omit<BaseKeyboardSearchOptions<D, CE>, "onChange">,
    MovementConfig {
  /**
   * Boolean if the event should trigger `event.stopPropagation()` when the
   * custom keyboard movement is triggered. This should generally be kept as
   * `false` or `undefined` by default, but enabled when creating more complex
   * 2-dimensional movement cases such as grids.
   */
  stopPropagation?: boolean;

  /**
   * A required change event handler that will be called whenever a user types a
   * letter and it causes a new item to be "found". This should normally be
   * something that either updates the `aria-activedescendant` id to the new
   * found item's id or manually focus the item's DOM node.
   */
  onChange?: (data: SearchData<D, CE>, itemRefs: ItemRefList<IE>) => void;
}

/**
 * The options for custom keyboard movement.
 *
 * @typeParam D - the type of each item within the item list
 * @typeParam CE - the type of the DOM element for the keyboard event handler.
 * @typeParam IE - the type of the DOM element for the keyboard event handler.
 */
export interface KeyboardMovementOptions<
  D = unknown,
  CE extends HTMLElement = HTMLElement,
  IE extends HTMLElement = HTMLElement
> extends BaseKeyboardMovementOptions<D, CE, IE> {
  /**
   * The currently focused index within the item list. This will need to be
   * updated due to the `onChange` callback being called for this hook to work
   * as it is fully "controlled" by a parent hook/component.
   */
  focusedIndex: number;

  /**
   * A required change event handler that will be called whenever a user types a
   * letter and it causes a new item to be "found". This should normally be
   * something that either updates the `aria-activedescendant` id to the new
   * found item's id or manually focus the item's DOM node.
   */
  onChange: (data: SearchData<D, CE>, itemRefs: ItemRefList<IE>) => void;
}

/**
 * Returns an ordered list with two items:
 *
 * - itemRefs
 * - onKeyDown event handler
 *
 * @typeParam CE - The HTMLElement type of the container element that handles
 * the custom keyboard movement.
 * @typeParam IE - The HTMLElement type of each item within the container
 * element that can be focusable.
 */
export type KeyboardMovementProviders<
  CE extends HTMLElement,
  IE extends HTMLElement
> = [
  /**
   * A list of mutable ref objects that must be applied to each focusable item
   * within the list. This list will automatically be generated based on the
   * number of items provided to the `useKeyboardMovement` hook
   */
  ItemRefList<IE>,

  /**
   * The keydown event handler to apply to a "container" element that has custom
   * keyboard focus.
   */
  MovementHandler<CE>
];

/**
 * This is a low-level hook for providing custom keyboard movement based on key
 * configurations.  This normally shouldn't really be used externally since
 * you'll most likely want to use the "presets" of `useFocusMovement` and
 * `useActiveDescendantMovement` that implement the main movement types already
 * for you.
 *
 * The way this works is that it will general a list of mutable item refs that
 * should be applied to each DOM node for the corresponding `item` within the
 * `items` list. This list will change and regenerate itself each time the
 * `items` array changes so it'll always be in-sync with the DOM nodes. This
 * means that if you have some items that **should not be rendered**, they
 * should not be included within the items list. The main reason these item refs
 * are required is so that the `aria-acativedescendant` movement can scroll the
 * new "focused" element into view if needed while the "true" focus movement can
 * trigger a `ref.current.focus()` on the new item as needed.
 *
 * Finally, this will create a keydown event handler that will merge in the
 * optionally provided `onKeyDown` prop and check if the pressed key should
 * trigger a custom keyboard movement event.  If it does, an `onChange` event
 * will be fired with the matching data and allows for custom movement with
 * `target.focus()` or updating the `aria-activedescendant` attribute as needed.
 *
 * @typeParam D - The type of each data item within the items list.
 * @typeParam CE - The HTMLElement type of the container element that handles
 * the custom keyboard movement.
 * @typeParam IE - The HTMLElement type of each item within the container
 * element that can be focusable.
 */
export function useKeyboardMovement<
  D = unknown,
  CE extends HTMLElement = HTMLElement,
  IE extends HTMLElement = HTMLElement
>({
  onKeyDown,
  incrementKeys,
  decrementKeys,
  jumpToFirstKeys,
  jumpToLastKeys,
  stopPropagation = true,
  onChange,
  items,
  resetTime,
  findMatchIndex,
  focusedIndex,
  loopable = true,
  searchable = true,
  valueKey = DEFAULT_VALUE_KEY,
  getItemValue = DEFAULT_GET_ITEM_VALUE,
}: KeyboardMovementOptions<D, CE, IE>): KeyboardMovementProviders<CE, IE> {
  const keys = useMemo(
    () => [
      ...transformKeys(incrementKeys, "increment"),
      ...transformKeys(decrementKeys, "decrement"),
      ...transformKeys(jumpToFirstKeys, "first"),
      ...transformKeys(jumpToLastKeys, "last"),
    ],
    [incrementKeys, decrementKeys, jumpToFirstKeys, jumpToLastKeys]
  );

  const itemRefs = useMemo<ItemRefList<IE>>(
    () => Array.from(items, () => ({ current: null })),
    [items]
  );

  const handleSearch = useKeyboardSearch<D, CE>({
    items,
    valueKey,
    getItemValue,
    onChange(data) {
      onChange(data, itemRefs);
    },
    searchIndex: focusedIndex,
    resetTime,
    findMatchIndex,
  });

  const handleKeyDown = useCallback<MovementHandler<CE>>(
    (event) => {
      if (searchable) {
        handleSearch(event);
      }

      if (onKeyDown) {
        onKeyDown(event);
      }

      const target = event.target as HTMLElement;
      const keyConfig = getKeyboardConfig(event, keys);
      if (!keyConfig || !target) {
        return;
      }

      // implementing custom behavior, so prevent default of scrolling or other
      // things
      event.preventDefault();
      if (stopPropagation) {
        event.stopPropagation();
      }

      const { type } = keyConfig;

      const lastIndex = items.length - 1;
      let index: number;
      switch (type) {
        case "first":
          index = 0;
          break;
        case "last":
          index = lastIndex;
          break;
        default:
          index = loop({
            value: focusedIndex,
            max: lastIndex,
            increment: type === "increment",
            minmax: !loopable,
          });
      }

      if (index === focusedIndex) {
        return;
      }

      const data: SearchData<D, CE> = {
        index,
        item: items[index],
        items,
        query: getStringifiedKeyConfig(keyConfig),
        target: event.currentTarget,
      };
      onChange(data, itemRefs);
    },
    [
      onKeyDown,
      stopPropagation,
      focusedIndex,
      keys,
      items,
      handleSearch,
      loopable,
      searchable,
      onChange,
      itemRefs,
    ]
  );

  return [itemRefs, handleKeyDown];
}
