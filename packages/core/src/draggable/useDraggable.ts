import { cnb } from "cnbuilder";
import type { HTMLAttributes, Ref, RefCallback } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getRangeSteps } from "../getRangeSteps";
import { useUserInteractionMode } from "../interaction";
import { nearest } from "../nearest";
import type { UseStateInitializer, UseStateSetter } from "../types";
import { useDir } from "../typography";
import { useEnsuredRef } from "../useEnsuredRef";
import { useHtmlClassName } from "../useHtmlClassName";
import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LocalStorageHookOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LocalStorageHookReturnValue,
} from "../useLocalStorage";
import { useLocalStorage } from "../useLocalStorage";
import { withinRange } from "../withinRange";
import {
  getDragPosition,
  isMouseDragStartEvent,
  isTouchDragStartEvent,
} from "./utils";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export type DraggableTouchEventHandlers<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onTouchStart" | "onTouchEnd" | "onTouchMove"
>;

/**
 * @remarks \@since 6.0.0
 */
export type DraggableMouseEventHandlers<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onMouseDown" | "onMouseUp" | "onMouseMove"
>;

/**
 * @remarks \@since 6.0.0
 */
export type DraggableKeyboardEventHanders<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onKeyDown"
>;

/**
 * @remarks \@since 6.0.0
 */
export type DraggableEventHandlers<E extends HTMLElement> =
  DraggableTouchEventHandlers<E> &
    DraggableMouseEventHandlers<E> &
    DraggableKeyboardEventHanders<E>;

/**
 * @remarks \@since 6.0.0
 */
export interface DraggableOptions<E extends HTMLElement>
  extends DraggableEventHandlers<E> {
  /**
   * The minimum number of pixels allowed for the draggable element. This must
   * be a number greater than or equal to 0.
   */
  min: number;

  /**
   * The maximum number of pixels allowed for the draggable element. This must
   * be a number greater than the {@link min} and usually a number less than the
   * viewport size.
   */
  max: number;

  /**
   * @defaultValue `Math.ceil((max - min) / 2)`
   */
  defaultValue?: UseStateInitializer<number>;

  /**
   * An optional ref to merge with the returned
   * {@link DraggableImplementation.draggableRef}.
   */
  ref?: Ref<E>;

  /**
   * The amount to increment or decrement the value with arrow keys.
   *
   * @defaultValue `1`
   */
  step?: number;

  /**
   * Set this to `true` to enable dragging vertically instead of horizontally.
   *
   * @defaultValue `false`
   */
  vertical?: boolean;

  /**
   * Set this to `true` to disable all drag behavior. This will still call any
   * of the provided {@link DraggableEventHandlers}.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Set this to `true` to prevent the `document.documentElement` from gaining
   * the `.rmd-dragging` class names while dragging.
   *
   * This should normally remain as `false` to improve performance and prevent
   * other mouse events from firing while dragging.
   *
   * @defaultValue `false`
   */
  disableDraggingClassName?: boolean;

  /**
   * @defaultValue `""`
   * @see {@link LocalStorageHookOptions.key}
   */
  localStorageKey?: string;

  /**
   * This will always be considered `true` while the user is dragging the
   * element to improve performance. The `value` will be persisted to local
   * storage once the user has stopped dragging.
   *
   * @defaultValue `false`
   * @see {@link LocalStorageHookOptions.manual}
   */
  localStorageManual?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export interface DraggableImplementation<E extends HTMLElement> {
  mouseEventHandlers: Required<DraggableMouseEventHandlers<E>>;
  touchEventHandlers: Required<DraggableTouchEventHandlers<E>>;
  keyboardEventHandlers: Required<DraggableKeyboardEventHanders<E>>;

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

  /**
   * Set the {@link value} to {@link DraggableOptions.min}.
   */
  minimum(): void;

  /**
   * Set the {@link value} to {@link DraggableOptions.max}.
   */
  maximum(): void;

  /**
   * Increment the {@link value} by {@link DraggableOptions.step}.
   */
  increment(): void;

  /**
   * Decrement the {@link value} by {@link DraggableOptions.step}.
   */
  decrement(): void;

  /**
   * A ref that **Must** be passed to the element that should be draggable.
   */
  draggableRef: RefCallback<E>;

  /**
   * @see {@link LocalStorageHookReturnValue.persist}
   */
  persistToLocalStorage(): void;

  /**
   * @see {@link LocalStorageHookReturnValue.remove}
   */
  removeFromLocalStorage(): void;
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
  const {
    ref: propRef,
    min,
    max,
    step = 1,
    vertical = false,
    defaultValue,
    onKeyDown = noop,
    onMouseUp = noop,
    onMouseDown = noop,
    onMouseMove = noop,
    onTouchStart = noop,
    onTouchMove = noop,
    onTouchEnd = noop,
    localStorageKey = "",
    localStorageManual,
    disabled = false,
    disableDraggingClassName = false,
  } = options;

  const [nodeRef, ref] = useEnsuredRef(propRef);
  const isTouch = useUserInteractionMode() === "touch";
  const draggingRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const { value, setValue, persist, remove } = useLocalStorage({
    key: localStorageKey,
    manual: localStorageManual || dragging,
    defaultValue: () => {
      if (typeof defaultValue === "function") {
        return defaultValue();
      }

      if (typeof defaultValue === "undefined") {
        return Math.ceil((max - min) / 2);
      }

      return defaultValue;
    },
  });

  const isRTL = useDir().dir === "rtl";
  const maximum = useCallback(() => {
    setValue(max);
  }, [max, setValue]);
  const minimum = useCallback(() => {
    setValue(min);
  }, [min, setValue]);
  const increment = useCallback(() => {
    setValue((prevValue) => withinRange({ min, max, value: prevValue + step }));
  }, [max, min, setValue, step]);
  const decrement = useCallback(() => {
    setValue((prevValue) => withinRange({ min, max, value: prevValue - step }));
  }, [max, min, setValue, step]);

  const draggingClassName = dragging && !disableDraggingClassName;
  useHtmlClassName(cnb(draggingClassName && "rmd-dragging"));
  useHtmlClassName(
    cnb(draggingClassName && `rmd-dragging--${vertical ? "v" : "h"}`)
  );

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const updatePosition = (event: MouseEvent | TouchEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      const splitter = nodeRef.current;
      if (!splitter) {
        return;
      }

      // firefox defaults to `document.body` while chrome will return `null`
      const container = splitter.offsetParent || document.body;
      const position = getDragPosition({
        event,
        isRTL,
        vertical,
        container,
      });

      setValue(withinRange({ min, max, value: position }));
    };

    const stopDragging = (event: MouseEvent | TouchEvent): void => {
      updatePosition(event);
      draggingRef.current = false;
      setDragging(false);
    };

    const updateKey = isTouch ? "touchmove" : "mousemove";
    const stopKey = isTouch ? "touchend" : "mouseup";

    window.addEventListener(updateKey, updatePosition);
    window.addEventListener(stopKey, stopDragging);
    return () => {
      window.removeEventListener(updateKey, updatePosition);
      window.removeEventListener(stopKey, stopDragging);
    };
  }, [dragging, isRTL, isTouch, max, min, nodeRef, setValue, vertical]);

  const prevRange = useRef({ min, max, step });
  useEffect(() => {
    if (
      prevRange.current.min === min &&
      prevRange.current.max === max &&
      prevRange.current.step === step
    ) {
      return;
    }

    // ensure that if the `min`, `max`, or `step` value changes that the value
    // is updated as well. Without this, there will be a runtime error if the
    // value is not within the new range.
    prevRange.current = { min, max, step };
    setValue((prevValue) =>
      nearest({
        min,
        max,
        steps: getRangeSteps({ min, max, step }),
        value: prevValue,
      })
    );
  }, [max, min, setValue, step]);

  useEffect(() => {
    if (!dragging) {
      persist();
    }
  }, [dragging, persist]);

  const mouseEventHandlers: Required<DraggableMouseEventHandlers<E>> = {
    onMouseDown(event) {
      onMouseDown(event);
      if (disabled || isTouch || !isMouseDragStartEvent(event)) {
        return;
      }

      // don't set dragging immediately so that click events can still happen
      draggingRef.current = true;
    },
    onMouseMove(event) {
      onMouseMove(event);
      if (disabled || isTouch || !draggingRef.current) {
        return;
      }

      setDragging(true);
    },
    onMouseUp(event) {
      onMouseUp(event);
      if (disabled || isTouch) {
        return;
      }

      draggingRef.current = false;
    },
  };
  const touchEventHandlers: Required<DraggableTouchEventHandlers<E>> = {
    onTouchStart(event) {
      onTouchStart(event);
      if (disabled || !isTouchDragStartEvent(event)) {
        return;
      }

      // don't set dragging immediately so that click events can still happen
      draggingRef.current = true;
    },
    onTouchMove(event) {
      onTouchMove(event);
      if (disabled || !draggingRef.current) {
        return;
      }

      setDragging(true);
    },
    onTouchEnd(event) {
      onTouchEnd(event);
      if (disabled) {
        return;
      }

      draggingRef.current = false;
    },
  };
  const keyboardEventHandlers: Required<DraggableKeyboardEventHanders<E>> = {
    onKeyDown(event) {
      onKeyDown(event);
      if (disabled) {
        return;
      }

      const decrementKey = vertical ? "ArrowUp" : "ArrowLeft";
      const incrementKey = vertical ? "ArrowDown" : "ArrowRight";

      switch (event.key) {
        case decrementKey:
          event.preventDefault();
          decrement();
          break;
        case incrementKey:
          event.preventDefault();
          increment();
          break;
        case "Home":
          event.preventDefault();
          minimum();
          break;
        case "End":
          event.preventDefault();
          maximum();
          break;
      }
    },
  };

  return {
    value,
    dragging,
    setValue,
    maximum,
    minimum,
    increment,
    decrement,
    draggableRef: ref,
    mouseEventHandlers,
    touchEventHandlers,
    keyboardEventHandlers,
    persistToLocalStorage: persist,
    removeFromLocalStorage: remove,
  };
}
