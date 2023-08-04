"use client";
import { useEffect, useState } from "react";
import type { UseStateInitializer, UseStateSetter } from "../types";
import type {
  LocalStorageHookOptions,
  LocalStorageHookReturnValue,
} from "../useLocalStorage";
import { useLocalStorage } from "../useLocalStorage";
import type {
  BaseDraggableOptions,
  ControlledDraggableImplementation,
} from "./useControlledDraggable";
import { useControlledDraggable } from "./useControlledDraggable";
import { deserializeDraggableValue, getDraggableDefaultValue } from "./utils";

/**
 * @remarks \@since 6.0.0
 */
export interface LocalStorageDraggableOptions<E extends HTMLElement>
  extends BaseDraggableOptions<E>,
    Pick<LocalStorageHookOptions<E>, "key" | "manual"> {
  /**
   * @defaultValue `Math.ceil((max - min) / 2)`
   */
  defaultValue?: UseStateInitializer<number>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface LocalStorageDraggableImplementation<E extends HTMLElement>
  extends ControlledDraggableImplementation<E>,
    Pick<LocalStorageHookReturnValue<E>, "persist" | "remove"> {
  /**
   * The current drag distance in pixels.
   */
  value: number;

  /**
   * This can be used to manually set the {@link value} if that is needed for
   * some custom behavior.
   */
  setValue: UseStateSetter<number>;

  /**
   * This will be `true` when the user is dragging the element through mouse or
   * touch.
   */
  dragging: boolean;
}

/**
 * An implementation of the {@link useControlledDraggable} hook that uses
 * `localStorage` for state.
 *
 * @remarks \@since 6.0.0
 */
export function useLocalStorageDraggable<E extends HTMLElement>(
  options: LocalStorageDraggableOptions<E>
): LocalStorageDraggableImplementation<E> {
  const { key, manual, min, max, defaultValue, ...dragOptions } = options;
  const [dragging, setDragging] = useState(false);
  const { value, setValue, persist, remove } = useLocalStorage({
    key,
    manual: manual || dragging,
    defaultValue: () => getDraggableDefaultValue({ min, max, defaultValue }),
    deserializer: (item) => deserializeDraggableValue({ min, max, item }),
  });
  const draggable = useControlledDraggable({
    ...dragOptions,
    min,
    max,
    setValue,
    dragging,
    setDragging,
  });
  const { draggedOnce } = draggable;
  useEffect(() => {
    if (!dragging && draggedOnce.current) {
      persist();
    }
  }, [draggedOnce, dragging, persist]);

  return {
    ...draggable,
    value,
    setValue,
    dragging,
    persist,
    remove,
  };
}
