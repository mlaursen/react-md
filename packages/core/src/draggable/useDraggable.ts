"use client";
import { useState } from "react";
import type { UseStateInitializer, UseStateSetter } from "../types";
import {
  useControlledDraggable,
  type BaseDraggableOptions,
  type ControlledDraggableImplementation,
} from "./useControlledDraggable";
import { getDraggableDefaultValue } from "./utils";

/**
 * @remarks \@since 6.0.0
 */
export interface DraggableOptions<E extends HTMLElement>
  extends BaseDraggableOptions<E> {
  /**
   * @defaultValue `Math.ceil((max - min) / 2)`
   */
  defaultValue?: UseStateInitializer<number>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface DraggableImplementation<E extends HTMLElement>
  extends ControlledDraggableImplementation<E> {
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
 * This is most likely an internal only hook that provides the functionality for
 * dragging an element through mouse, touch, and keyboard events. The main use
 * cases so far for this hook are:
 * - window splitters
 * - sliders
 *
 * @remarks \@since 6.0.0
 */
export function useDraggable<E extends HTMLElement>(
  options: DraggableOptions<E>
): DraggableImplementation<E> {
  const { min, max, defaultValue, ...dragOptions } = options;
  const [value, setValue] = useState(() =>
    getDraggableDefaultValue({ min, max, defaultValue })
  );
  const [dragging, setDragging] = useState(false);
  const draggable = useControlledDraggable({
    min,
    max,
    dragging,
    setDragging,
    setValue,
    ...dragOptions,
  });

  return {
    ...draggable,
    value,
    setValue,
    dragging,
  };
}
