import React, { useCallback, useMemo } from "react";

import { useTempValue } from "../useTempValue";
import {
  findMatchIndex as DEFAULT_FIND_MATCH_INDEX,
  FindMatchIndex,
} from "./findMatchIndex";
import {
  BaseSearchOptions,
  DEFAULT_GET_ITEM_VALUE,
  DEFAULT_SEARCH_RESET_TIME,
  DEFAULT_VALUE_KEY,
} from "./utils";

/**
 * The data that is provided to the `onChange` handler when searching. This will
 * be triggered whenever the user types a letter that causes the current search
 * result to change.
 */
export interface SearchData<D = unknown, E extends HTMLElement = HTMLElement> {
  /**
   * The item that was matched from the latest search.
   */
  readonly item: D;

  /**
   * The current list of items that were provided to be searched.
   */
  readonly items: readonly D[];

  /**
   * The index in the `items` array that the found item appears at. This is
   * super useful when extending this hook to be used with
   * `aria-activedescendant` focus movement or manual focus behavior since the
   * `items` array should normally be the same indexes as the DOM nodes.
   */
  readonly index: number;

  /**
   * The search value that was used to find this item and trigger the change
   * event.
   */
  readonly query: string;

  /**
   * The current target for the search keydown event.
   */
  readonly target: E;
}

export type SearchChangeEvent<
  D = unknown,
  E extends HTMLElement = HTMLElement
> = (data: SearchData<D, E>) => void;

export interface BaseKeyboardSearchOptions<
  D = unknown,
  E extends HTMLElement = HTMLElement
> extends BaseSearchOptions<D> {
  /**
   * The list of items that should be searched whenever the user types a letter.
   */
  items: readonly D[];

  /**
   * A required change event handler that will be called whenever a user types a
   * letter and it causes a new item to be "found". This should normally be
   * something that either updates the `aria-activedescendant` id to the new
   * found item's id or manually focus the item's DOM node.
   */
  onChange: SearchChangeEvent<D, E>;

  /**
   * An optional `onKeyDown` event handler that should be merged with the search
   * functionality.
   *
   * Note: This will be called **before** the search functionality is triggered.
   */
  onKeyDown?: React.KeyboardEventHandler<E>;

  /**
   * The amount of time that a "search" value should be kept before resetting.
   * The default value works for most cases, but it might be nice to configure
   * it based on your use case.
   */
  resetTime?: number;

  /**
   * The function used to find a match index within the `items` list. You most
   * likely won't want to change this.
   */
  findMatchIndex?: FindMatchIndex;
}

export interface KeyboardSearchOptions<
  D = unknown,
  E extends HTMLElement = HTMLElement
> extends BaseKeyboardSearchOptions<D, E> {
  /**
   * The current index that should be "focused" due to a keyboard search. This
   * should be updated whenever the `onChange` callback is fired.
   */
  searchIndex: number;
}

type ReturnValue<E extends HTMLElement = HTMLElement> =
  React.KeyboardEventHandler<E>;

/**
 * Adds the accessibility functionality to search a list of items as the user
 * types to trigger `aria-activedescendant` focus or manual DOM focus events.
 */
export function useKeyboardSearch<
  D = unknown,
  E extends HTMLElement = HTMLElement
>({
  items,
  onChange,
  onKeyDown,
  resetTime = DEFAULT_SEARCH_RESET_TIME,
  searchIndex,
  valueKey = DEFAULT_VALUE_KEY,
  getItemValue = DEFAULT_GET_ITEM_VALUE,
  findMatchIndex = DEFAULT_FIND_MATCH_INDEX,
}: KeyboardSearchOptions<D, E>): ReturnValue<E> {
  const [value, setValue] = useTempValue("", resetTime);
  const values = useMemo(
    () => items.map((item) => getItemValue(item, valueKey)),
    [items, getItemValue, valueKey]
  );

  const handleKeyDown = useCallback<React.KeyboardEventHandler<E>>(
    (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      const { key, altKey, ctrlKey, metaKey } = event;
      if (
        altKey ||
        ctrlKey ||
        metaKey ||
        key.length > 1 ||
        (!value.current && key === " ")
      ) {
        // might need to change this later if other languages have non-meta keys
        // that are more than 1 letter
        return;
      }

      let nextValue = key;
      if (value.current !== key) {
        nextValue = `${value.current}${key}`;
      }
      setValue(nextValue);

      const index = findMatchIndex(nextValue, values, searchIndex, true);
      // don't want to trigger change events if the search didn't match anything
      // since you normally don't really care about failed matches
      if (index === searchIndex || index === -1) {
        return;
      }

      const data: SearchData<D, E> = {
        index,
        item: items[index],
        items,
        query: nextValue,
        target: event.currentTarget,
      };

      onChange(data);
    },
    [
      searchIndex,
      findMatchIndex,
      items,
      onChange,
      onKeyDown,
      setValue,
      value,
      values,
    ]
  );

  return handleKeyDown;
}
