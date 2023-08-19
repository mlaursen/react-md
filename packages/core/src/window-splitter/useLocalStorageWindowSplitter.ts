"use client";
import { useEffect, useState } from "react";
import {
  deserializeDraggableValue,
  getDraggableDefaultValue,
} from "../draggable/utils.js";
import type {
  LocalStorageHookOptions,
  LocalStorageHookReturnValue,
} from "../useLocalStorage.js";
import { useLocalStorage } from "../useLocalStorage.js";
import { useControlledWindowSplitter } from "./useControlledWindowSplitter.js";
import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useWindowSplitter,
  WindowSplitterImplementation,
  WindowSplitterOptions,
} from "./useWindowSplitter.js";

/**
 * @remarks \@since 6.0.0
 */
export interface LocalStorageWindowSplitterOptions<
  E extends HTMLElement = HTMLButtonElement,
> extends WindowSplitterOptions<E>,
    Pick<LocalStorageHookOptions<E>, "key" | "manual"> {}

/**
 * @remarks \@since 6.0.0
 */
export interface LocalStorageWindowSplitterImplementation<
  E extends HTMLElement = HTMLButtonElement,
> extends WindowSplitterImplementation<E>,
    Pick<LocalStorageHookReturnValue<E>, "persist" | "remove"> {}

/**
 * This is the `useWindowSplitter` that also allows the value to be saved into
 * local storage.
 *
 * @see {@link useWindowSplitter} for an example.
 * @remarks \@since 6.0.0
 */
export function useLocalStorageWindowSplitter<
  E extends HTMLElement = HTMLButtonElement,
>(
  options: LocalStorageWindowSplitterOptions<E>
): LocalStorageWindowSplitterImplementation<E> {
  const { min, max, defaultValue, key, manual, ...remaining } = options;

  // Note: this is pretty much the same setup as the `useLocalStorageDraggable`
  // hook. the only difference is passing to the `useControlledWindowSplitter`
  const [dragging, setDragging] = useState(false);
  const { value, setValue, persist, remove } = useLocalStorage({
    key,
    manual: manual || dragging,
    defaultValue: () => getDraggableDefaultValue({ min, max, defaultValue }),
    deserializer: (item) => deserializeDraggableValue({ min, max, item }),
  });
  const splitter = useControlledWindowSplitter({
    min,
    max,
    value,
    setValue,
    dragging,
    setDragging,
    ...remaining,
  });
  useEffect(() => {
    if (!dragging && splitter.draggedOnce.current) {
      persist();
    }
  }, [dragging, persist, splitter.draggedOnce]);

  return {
    ...splitter,
    value,
    setValue,
    dragging,
    persist,
    remove,
  };
}
