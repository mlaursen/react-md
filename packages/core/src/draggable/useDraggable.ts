"use client";
import { cnb } from "cnbuilder";
import type { HTMLAttributes, Ref, RefCallback } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";
import { useScrollLock } from "../scroll/useScrollLock.js";
import type {
  NonNullRef,
  UseStateInitializer,
  UseStateSetter,
} from "../types.js";
import { useDir } from "../typography/WritingDirectionProvider.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useEnsuredState } from "../useEnsuredState.js";
import { useHtmlClassName } from "../useHtmlClassName.js";
import { getPercentage } from "../utils/getPercentage.js";
import { getRangeDefaultValue } from "../utils/getRangeDefaultValue.js";
import { getRangeSteps } from "../utils/getRangeSteps.js";
import { nearest } from "../utils/nearest.js";
import { withinRange } from "../utils/withinRange.js";
import {
  isMouseDragStartEvent,
  isTouchDragStartEvent,
  updateDragPosition,
} from "./utils.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export type DraggableTouchEventHandlers<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onTouchStart" | "onTouchMove"
>;

/**
 * @since 6.0.0
 */
export type DraggableMouseEventHandlers<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onMouseDown" | "onMouseUp" | "onMouseMove"
>;

/**
 * @since 6.0.0
 */
export type DraggableKeyboardEventHandlers<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onKeyDown"
>;

/**
 * @since 6.0.0
 */
export type DraggableEventHandlers<E extends HTMLElement> =
  DraggableTouchEventHandlers<E> &
    DraggableMouseEventHandlers<E> &
    DraggableKeyboardEventHandlers<E>;

/**
 * @since 6.0.0
 */
export interface ControllableDraggableStateOptions {
  value?: number;
  setValue?: UseStateSetter<number>;
  defaultValue?: UseStateInitializer<number>;
  dragging?: boolean;
  setDragging?: UseStateSetter<boolean>;
}

/**
 * @since 6.0.0
 */
export interface BaseDraggableOptions<E extends HTMLElement>
  extends DraggableEventHandlers<E>,
    ControllableDraggableStateOptions {
  /**
   * An optional ref to merge with the returned
   * {@link DraggableImplementation.draggableRef}.
   */
  ref?: Ref<E>;

  /**
   * The minimum number of pixels allowed for the draggable element. This must
   * be a number greater than or equal to 0.
   *
   * When {@link withinOffsetParent} is set to `true`, this is the minimum value
   * allowed instead of pixels.
   */
  min: number;

  /**
   * The maximum number of pixels allowed for the draggable element. This must
   * be a number greater than the {@link min} and usually a number less than the
   * viewport size.
   *
   * When {@link withinOffsetParent} is set to `true`, this is the maximum value
   * allowed instead of pixels.
   */
  max: number;

  /**
   * The amount to increment or decrement the value with arrow keys.
   *
   * @defaultValue `1`
   */
  step?: number;

  /**
   * This was added to support range sliders where there are two (or more)
   * draggable elements within the same container element and their values
   * cannot pass each other. Without these overrides, the range would keep
   * changing as the other values change, so the drag percentage would be
   * incorrect.
   *
   * @example Range Slider
   * ```ts
   * const min = 0;
   * const max = 100;
   * const minValue = 3;
   * const maxValue = 80;
   *
   * const minValueDraggable = useDraggable({
   *   min,
   *   max,
   *   rangeMax: maxValue,
   * });
   * const maxValueDraggable = useDraggable({
   *   min,
   *   max,
   *   rangeMin: minValue,
   * });
   * ```
   *
   * @defaultValue `min`
   */
  rangeMin?: number;

  /**
   * @see {@link rangeMin} for an explanation of this option.
   * @defaultValue `max`
   */
  rangeMax?: number;

  /**
   * Set this to `true` to enable dragging vertically instead of horizontally.
   *
   * @defaultValue `false`
   */
  vertical?: boolean;

  /**
   * The default drag behavior is to increase the value when:
   *
   * - dragging `"right"` and the writing direction is `"ltr"`
   * - dragging `"left"` and the writing direction is `"rtl"`
   * - dragging `"upwards"`
   *
   * When this is set to `true`, the value when increase when:
   *
   * - dragging `"left"` and the writing direction is `"ltr"`
   * - dragging `"right"` and the writing direction is `"rtl"`
   * - dragging `"downwards"`
   *
   * @defaultValue `false`
   */
  reversed?: boolean;

  /**
   * Set this to `true` to disable all drag behavior. This will still call any
   * of the provided {@link DraggableEventHandlers}.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Set this to `true` if the dragging calculations should be to the
   * `draggableRef.current.offsetParent` instead of the entire window. The main
   * use case for this is sliders.
   *
   * @defaultValue `false`
   */
  withinOffsetParent?: boolean;

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
   * Set this to `true` to prevent the vertical or horizontal cursor from
   * appearing while dragging.
   *
   * @defaultValue `false`
   */
  disableDraggingCursorClassName?: boolean;
}

/**
 * @since 6.0.0
 */
export interface UncontrolledDraggableOptions {
  value?: never;
  setValue?: never;
  dragging?: never;
  setDragging?: never;
}

/**
 * @since 6.0.0
 */
export interface ControlledValueDraggableOptions {
  value: number;
  setValue: UseStateSetter<number>;
  defaultValue?: never;
  dragging?: never;
  setDragging?: never;
}

/**
 * @since 6.0.0
 */
export interface ControlledDraggingDraggableOptions {
  value?: never;
  setValue?: never;
  defaultValue?: never;
  dragging: boolean;
  setDragging: UseStateSetter<boolean>;
}

/**
 * @since 6.0.0
 */
export interface FullyControlledDraggableOptions {
  value: number;
  setValue: UseStateSetter<number>;
  dragging: boolean;
  setDragging: UseStateSetter<boolean>;
}

/**
 * @since 6.0.0
 */
export type DraggableStateOptions =
  | UncontrolledDraggableOptions
  | ControlledValueDraggableOptions
  | ControlledDraggingDraggableOptions
  | FullyControlledDraggableOptions;

/**
 * @since 6.0.0
 */
export type DraggableOptions<E extends HTMLElement = HTMLElement> =
  BaseDraggableOptions<E> & DraggableStateOptions;

/**
 * @since 6.0.0
 */
export interface DraggableImplementation<E extends HTMLElement = HTMLElement>
  extends Required<DraggableEventHandlers<E>> {
  mouseEventHandlers: Required<DraggableMouseEventHandlers<E>>;
  touchEventHandlers: Required<DraggableTouchEventHandlers<E>>;
  keyboardEventHandlers: Required<DraggableKeyboardEventHandlers<E>>;

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
   * The current percentage the `value` is within the range.
   *
   * ```ts
   * const percentage =
   *   dragging && withinOffsetParent
   *     ? : dragPercentage
   *     : getPercentage({ min, max, value });
   * ```
   */
  percentage: number;

  /**
   * A ref that **Must** be passed to the element that should be draggable.
   */
  draggableRef: RefCallback<E>;

  /**
   * This value will only update while dragging with a mouse or touch and should
   * be used for the positioning styles while dragging.
   *
   * Note: The {@link percentage} will use this value while dragging.
   */
  dragPercentage: number;

  /**
   * Flag to determine if the user has dragged at least once. Used internally
   * for manually persisting the value into local storage once the user has
   * stopped dragging.
   */
  draggedOnce: NonNullRef<boolean>;

  value: number;
  setValue: UseStateSetter<number>;
  dragging: boolean;
  setDragging: UseStateSetter<boolean>;
}

/**
 * This is most likely an internal only hook that provides the functionality for
 * dragging an element through mouse, touch, and keyboard events. The main use
 * cases so far for this hook are:
 * - window splitters
 * - sliders
 *
 * @since 6.0.0
 */
export function useDraggable<E extends HTMLElement>(
  options: DraggableOptions<E>
): DraggableImplementation<E> {
  const {
    ref: propRef,
    min,
    max,
    rangeMin = min,
    rangeMax = max,
    step = 1,
    reversed = false,
    vertical = false,
    onKeyDown = noop,
    onMouseUp = noop,
    onMouseDown = noop,
    onMouseMove = noop,
    onTouchStart = noop,
    onTouchMove = noop,
    dragging: propDragging,
    setDragging: propSetDragging,
    value: propValue,
    setValue: propSetValue,
    defaultValue,
    withinOffsetParent = false,
    disabled = false,
    disableDraggingClassName = false,
    disableDraggingCursorClassName = disableDraggingClassName,
  } = options;

  const [nodeRef, ref] = useEnsuredRef(propRef);
  const isTouch = useUserInteractionMode() === "touch";
  const draggingRef = useRef(false);
  const [dragPercentage, setDragPercentage] = useState(min);
  const [value, setValue] = useEnsuredState({
    value: propValue,
    setValue: propSetValue,
    defaultValue: getRangeDefaultValue({
      min,
      max,
      step: 1,
      defaultValue,
    }),
  });
  const [dragging, setDragging] = useEnsuredState({
    value: propDragging,
    setValue: propSetDragging,
    defaultValue: false,
  });

  const isRTL = useDir().dir === "rtl";
  const percentage =
    dragging && withinOffsetParent
      ? dragPercentage
      : getPercentage({ min, max, value });
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
    cnb(
      !disableDraggingCursorClassName &&
        draggingClassName &&
        `rmd-dragging--${vertical ? "v" : "h"}`
    )
  );

  const draggedOnce = useRef(false);
  useEffect(() => {
    if (!dragging) {
      return;
    }

    draggedOnce.current = true;
    const updatePosition = (event: MouseEvent | TouchEvent): void => {
      if (!event.cancelable) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      updateDragPosition({
        event,
        nodeRef,
        min,
        max,
        step,
        rangeMin,
        rangeMax,
        isRTL,
        isDragStart: false,
        reversed,
        vertical,
        setValue,
        setDragging,
        setDragPercentage,
        withinOffsetParent,
      });
    };

    const stopDragging = (event: MouseEvent | TouchEvent): void => {
      updatePosition(event);
      draggingRef.current = false;
      setDragging(false);
    };

    const updateKey = isTouch ? "touchmove" : "mousemove";
    const stopKey = isTouch ? "touchend" : "mouseup";
    const passive = isTouch ? { passive: false } : undefined;

    window.addEventListener(updateKey, updatePosition, passive);
    window.addEventListener(stopKey, stopDragging);
    return () => {
      window.removeEventListener(updateKey, updatePosition);
      window.removeEventListener(stopKey, stopDragging);
    };
  }, [
    dragging,
    isRTL,
    isTouch,
    max,
    min,
    nodeRef,
    rangeMax,
    rangeMin,
    reversed,
    setDragging,
    setValue,
    step,
    vertical,
    withinOffsetParent,
  ]);

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

  const mouseEventHandlers: Required<DraggableMouseEventHandlers<E>> = {
    onMouseDown: useCallback(
      (event) => {
        onMouseDown(event);
        if (disabled || isTouch || !isMouseDragStartEvent(event)) {
          return;
        }

        // don't allow text to be selected
        event.preventDefault();
        updateDragPosition({
          isDragStart: true,
          event,
          nodeRef,
          min,
          max,
          step,
          rangeMin,
          rangeMax,
          isRTL,
          reversed,
          vertical,
          setValue,
          setDragging,
          setDragPercentage,
          withinOffsetParent,
        });

        // don't set dragging immediately so that click events can still happen
        draggingRef.current = true;
      },
      [
        disabled,
        isRTL,
        isTouch,
        max,
        min,
        nodeRef,
        onMouseDown,
        rangeMax,
        rangeMin,
        reversed,
        setDragging,
        setValue,
        step,
        vertical,
        withinOffsetParent,
      ]
    ),
    onMouseMove: useCallback(
      (event) => {
        onMouseMove(event);
        if (disabled || isTouch || !draggingRef.current || dragging) {
          return;
        }

        updateDragPosition({
          isDragStart: true,
          event,
          nodeRef,
          min,
          max,
          step,
          rangeMin,
          rangeMax,
          isRTL,
          reversed,
          vertical,
          setValue,
          setDragging,
          setDragPercentage,
          withinOffsetParent,
        });
        setDragging(true);
      },
      [
        disabled,
        dragging,
        isRTL,
        isTouch,
        max,
        min,
        nodeRef,
        onMouseMove,
        rangeMax,
        rangeMin,
        reversed,
        setDragging,
        setValue,
        step,
        vertical,
        withinOffsetParent,
      ]
    ),
    onMouseUp: useCallback(
      (event) => {
        onMouseUp(event);
        if (disabled || isTouch) {
          return;
        }

        draggingRef.current = false;
      },
      [disabled, isTouch, onMouseUp]
    ),
  };
  const keyboardEventHandlers: Required<DraggableKeyboardEventHandlers<E>> = {
    onKeyDown: useCallback(
      (event) => {
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
      [decrement, disabled, increment, maximum, minimum, onKeyDown, vertical]
    ),
  };

  // touch devices are a bit weird and cause issues since the "start" event is
  // also used for scrolling. If the user quickly grabs the draggable element
  // and drags vertically, most of the time it will try to scroll instead of
  // dragging the element. The workaround is to being the drag events
  // immediately on touchstart and disable scroll behavior for the page.
  //
  // There are also some issues with calling `event.preventDefault()` within
  // touch events even while `{ passive: false } is manually set, so need to
  // also attach a touchmove event.
  useScrollLock(isTouch && dragging);
  const touchEventHandlers: Required<DraggableTouchEventHandlers<E>> = {
    onTouchStart: useCallback(
      (event) => {
        onTouchStart(event);
        if (disabled || !isTouchDragStartEvent(event)) {
          return;
        }

        draggingRef.current = true;
        updateDragPosition({
          isDragStart: true,
          event,
          nodeRef,
          min,
          max,
          step,
          rangeMin,
          rangeMax,
          isRTL,
          reversed,
          vertical,
          setValue,
          setDragging,
          setDragPercentage,
          withinOffsetParent,
        });
      },
      [
        disabled,
        isRTL,
        max,
        min,
        nodeRef,
        onTouchStart,
        rangeMax,
        rangeMin,
        reversed,
        setDragging,
        setValue,
        step,
        vertical,
        withinOffsetParent,
      ]
    ),
    onTouchMove: useCallback(
      (event) => {
        onTouchMove(event);
        if (disabled || !draggingRef.current || !event.cancelable) {
          return;
        }

        // prevent the document's touchmove event from also firing
        event.stopPropagation();
        updateDragPosition({
          isDragStart: true,
          event,
          nodeRef,
          min,
          max,
          step,
          rangeMin,
          rangeMax,
          isRTL,
          reversed,
          vertical,
          setValue,
          setDragging,
          setDragPercentage,
          withinOffsetParent,
        });
      },
      [
        disabled,
        isRTL,
        max,
        min,
        nodeRef,
        onTouchMove,
        rangeMax,
        rangeMin,
        reversed,
        setDragging,
        setValue,
        step,
        vertical,
        withinOffsetParent,
      ]
    ),
  };

  return {
    ...touchEventHandlers,
    ...mouseEventHandlers,
    ...keyboardEventHandlers,
    value,
    setValue,
    dragging,
    setDragging,
    maximum,
    minimum,
    increment,
    decrement,
    draggedOnce,
    draggableRef: ref,
    percentage,
    dragPercentage,
    touchEventHandlers,
    mouseEventHandlers,
    keyboardEventHandlers,
  };
}
