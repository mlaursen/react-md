import type { HTMLAttributes, KeyboardEvent, MouseEvent } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { getPercentage } from "./getPercentage";
import type { UseStateInitializer, UseStateSetter } from "./types";
import { withinRange } from "./withinRange";

const noop = (): void => {
  // do nothing
};

export interface WIndowSplitterOptions<E extends HTMLElement> {
  /**
   * A number less than {@link max} and greater thanor equal to 0.
   *
   * @defaultValue `0`
   */
  min?: number;

  /**
   * A number greater than the {@link min} and less than or equal to 100.
   *
   * @defaultValue `100`
   */
  max?: number;

  /**
   * The amount to increment or decrement the value with arrow keys.
   *
   * @defaultValue `1`
   */
  step?: number;

  /**
   * @defaultValue `50`
   */
  defaultValue?: UseStateInitializer<number>;

  /**
   * @defaultValue `false`
   */
  vertical?: boolean;
  onKeyDown?(event: KeyboardEvent<E>): void;
  onMouseDown?(event: MouseEvent<E>): void;
}

export interface WindowSplitterWidgetProps<E extends HTMLElement>
  extends HTMLAttributes<E> {
  "aria-orientation": "vertical" | undefined;
  "aria-valuenow": number;
  "aria-valuemin": number;
  "aria-valuemax": number;
  id: string;
  role: "separator";
  tabIndex: number;
  onKeyDown(event: KeyboardEvent<E>): void;
  onMouseDown(event: MouseEvent<E>): void;
}

export interface WindowSplitterImplementation<E extends HTMLElement> {
  value: number;
  setValue: UseStateSetter<number>;
  dragging: boolean;
  minValue(): void;
  maxValue(): void;
  increment(): void;
  decrement(): void;
  splitterProps: Readonly<WindowSplitterWidgetProps<E>>;
}

/**
 * TODO:
 * - connect into useLocalStorage hook
 *   - definitely need to do manual behavior because of dragging
 * - maybe add a default implementation into the Layout component?
 * - figure out the best way to "reset" it?
 * - should I implement a default component for this?
 * - need to provide an `aria-controls`, `aria-label`/`aria-labelledby`
 */
export function useWindowSplitter<E extends HTMLElement>(
  options: WIndowSplitterOptions<E>
): WindowSplitterImplementation<E> {
  const {
    min = 0,
    max = 100,
    step = 1,
    vertical = false,
    defaultValue = 50,
    onKeyDown = noop,
    onMouseDown = noop,
  } = options;

  const id = `${useId()}-splitter`;
  const [value, setValue] = useState(defaultValue);
  const [dragging, setDragging] = useState(false);
  const prevExpandedValue = useRef(value);

  const maxValue = useCallback(() => {
    setValue(max);
  }, [max]);
  const minValue = useCallback(() => {
    setValue(min);
  }, [min]);
  const increment = useCallback(() => {
    setValue((prevValue) => withinRange(prevValue + step, min, max));
  }, [max, min, step]);
  const decrement = useCallback(() => {
    setValue((prevValue) => withinRange(prevValue - step, min, max));
  }, [max, min, step]);

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const updatePosition = (event: globalThis.MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      setValue(withinRange((event.pageX / window.innerWidth) * 100, min, max));
    };

    const stopDragging = (event: globalThis.MouseEvent): void => {
      updatePosition(event);
      setDragging(false);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [dragging, max, min]);

  return {
    value,
    dragging,
    setValue,
    maxValue,
    minValue,
    increment,
    decrement,
    splitterProps: {
      "aria-orientation": vertical ? "vertical" : undefined,
      "aria-valuenow":
        getPercentage({
          min,
          max,
          value,
        }) * 100,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      id,
      role: "separator",
      tabIndex: 0,
      onKeyDown(event) {
        onKeyDown(event);

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
            minValue();
            break;
          case "End":
            event.preventDefault();
            maxValue();
            break;
          case "Enter":
            event.preventDefault();
            event.stopPropagation();
            setValue((prevValue) => {
              if (prevValue === min) {
                return prevExpandedValue.current;
              }

              prevExpandedValue.current = prevValue;
              return min;
            });
            break;
        }
      },
      onMouseDown(event) {
        onMouseDown(event);

        if (
          event.button === 0 &&
          !event.altKey &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey
        ) {
          setDragging(true);
        }
      },
    },
  };
}
