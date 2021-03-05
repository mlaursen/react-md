import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  Ref,
  RefCallback,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { dispatchChangeEvent, loop, useEnsuredRef } from "@react-md/utils";

import { TimePart, TimePeriod } from "./format";
import { RequiredTimeInputProps, TimeInputBehaviorHandlers } from "./TimeInput";

export interface TimeStringChangeEvent {
  /**
   * The next `value` for the current time part.
   */
  value: string;

  /**
   * The time part that's being changed.
   */
  part: TimePart;

  /**
   * This will only be provided if the {@link part} is the
   * {@link StandardHoursFormat} and the new value would have caused the time
   * period to change.
   *
   * @example
   * Going over 12 hours
   * ```ts
   * const inputValue = "13";
   *
   * const event: TimeStringChangeEvent = {
   *   value: "01",
   *   part: "hh",
   *   timePeriod: "PM",
   *   completed: true,
   * };
   * ```
   *
   * @example
   * Going to midnight
   * ```ts
   * const inputValue = "00";
   *
   * const event: TimeStringChangeEvent = {
   *   value: "12",
   *   part: "hh",
   *   timePeriod: "AM",
   *   completed: true,
   * };
   * ```
   */
  timePeriod?: TimePeriod;

  /**
   * Boolean if the value change would have "completed" this time part and there
   * are no other key presses allowed before restarting the value change
   * behavior.
   */
  completed?: boolean;
}

/**
 * @remarks \@since 2.7.0
 */
export interface TimeStringOptions extends TimeInputBehaviorHandlers {
  /**
   * An optional `ref` that will be merged with the ref that's required to
   * implement the `TimeInput` behavior.
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * The time part that is being rendered. This is to help implement the correct
   * behavior for "completing"/"validating" the time value.
   */
  part: TimePart;

  /**
   * The current value for the time part. This can be:
   *
   * - an empty string
   * - a placeholder string (`"--"`)
   * - a time string (`"02"`)
   */
  value: string;

  /** {@inheritDoc TimeStringChangeEvent} */
  onValueChange(event: TimeStringChangeEvent): void;

  /**
   * An optional string to use when the time part has not been filled out yet.
   *
   * @defaultValue `"--"` or `"---"`
   */
  emptyValue?: string;

  /**
   * An optional custom validation message to apply to the `TextField` when the
   * time part has not been filled out. This is so that a parent form cannot be
   * submitted until a value has been set.
   */
  emptyMessage?: string;

  /**
   * Boolean if the time part values can be looped from `min -> max` and
   * `max -> min`. This means that if the user presses the `ArrowUp` key when
   * the hour hour is `12`, the hour will change to `01` instead of being fixed
   * at `12`.
   *
   * @defaultValue `true`
   */
  loopable?: boolean;

  /**
   *
   * @defaultValue `false`
   */
  preventHorizontalKeys?: boolean;

  /**
   * Boolean if the time part is required before a form can be submitted. This
   * should be `true` if the `Time` component is required or any of the other
   * time parts have a value.
   */
  required: boolean;
}

/** @remarks \@since 2.7.0 */
export interface TimeInputStringProps extends RequiredTimeInputProps {
  ref: RefCallback<HTMLInputElement>;
}

/**
 * @remarks \@since 2.7.0
 * @internal
 */
const UPDATE_KEYS = [
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  " ",
  "Backspace",
  "Delete",
];

/**
 * @remarks \@since 2.7.0
 * @internal
 */
const STOP_KEYS = [...UPDATE_KEYS, "ArrowLeft", "ArrowRight"];

/**
 * @remarks \@since 2.7.0
 * @internal
 */
const TIME_FORMAT_SETTINGS: Record<
  TimePart,
  {
    min: number;
    max: number;
    digits: number;
    fallbackEmptyValue: string;
    firstDigitMax: number;
  }
> = {
  HH: {
    min: 0,
    max: 23,
    digits: 2,
    fallbackEmptyValue: "--",
    firstDigitMax: 2,
  },
  hh: {
    min: 1,
    max: 12,
    digits: 2,
    fallbackEmptyValue: "--",
    firstDigitMax: 1,
  },
  mm: {
    min: 0,
    max: 59,
    digits: 2,
    fallbackEmptyValue: "--",
    firstDigitMax: 5,
  },
  ss: {
    min: 0,
    max: 59,
    digits: 2,
    fallbackEmptyValue: "--",
    firstDigitMax: 5,
  },
  sss: {
    min: 0,
    max: 999,
    digits: 3,
    fallbackEmptyValue: "---",
    firstDigitMax: 9,
  },
};

/**
 * @remarks \@since 2.7.0
 */
export function useTimeString({
  ref,
  part,
  value,
  onValueChange,
  required,
  loopable = true,
  emptyValue: propEmptyValue,
  emptyMessage = "Please fill out this field.",
  onBlur: propOnBlur,
  onFocus: propOnFocus,
  onChange: propOnChange,
  onKeyDown: propOnKeyDown,
  preventHorizontalKeys = false,
}: TimeStringOptions): TimeInputStringProps {
  const {
    max,
    min,
    digits,
    firstDigitMax,
    fallbackEmptyValue,
  } = TIME_FORMAT_SETTINGS[part];
  const emptyValue = propEmptyValue ?? fallbackEmptyValue;
  const [nodeRef, nodeRefCallback] = useEnsuredRef(ref);
  const keypressCount = useRef(0);
  const onBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      propOnBlur?.(event);

      // have to do event.currentTarget.value since `value` might not have
      // updated by the time of the blur event
      if (part === "hh" && event.currentTarget.value === "00") {
        onValueChange({
          value: "12",
          part,
          timePeriod: "AM",
          completed: false,
        });
      }
    },
    [onValueChange, part, propOnBlur]
  );
  const onFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      propOnFocus?.(event);
      keypressCount.current = 0;
      event.currentTarget.setSelectionRange(
        0,
        event.currentTarget.value.length
      );
    },
    [propOnFocus]
  );
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      propOnChange?.(event);
      const currentDigit = keypressCount.current;
      if (currentDigit === -1) {
        keypressCount.current = 0;
        onValueChange({
          value: event.currentTarget.value,
          part,
          completed: false,
        });
        return;
      }

      const key = event.currentTarget.value.replace(/[^0-9]/g, "");
      let timePeriod: TimePeriod | undefined;
      let numberValue = parseFloat(key);
      if (currentDigit > 0) {
        numberValue = parseFloat(value.substring(digits - currentDigit) + key);

        // this is really only possible for `HH` or `hh` parts
        if (numberValue > max) {
          if (loopable) {
            numberValue = numberValue - max - (part === "HH" ? 1 : 0);
          } else {
            numberValue = max;
          }

          if (part === "hh") {
            timePeriod = "PM";
          }
        }
      }
      const nextValue = `${numberValue}`.padStart(digits, "0");
      event.currentTarget.value = nextValue;

      const isFirstDigitOverflow =
        currentDigit === 0 && numberValue > firstDigitMax;
      const completed = currentDigit === digits - 1 || isFirstDigitOverflow;
      if (completed) {
        keypressCount.current = 0;
      } else {
        keypressCount.current += 1;
      }

      onValueChange({
        value: nextValue,
        part,
        timePeriod,
        completed,
      });
      if (nextValue === value) {
        event.currentTarget.setSelectionRange(0, nextValue.length);
      }
    },
    [
      propOnChange,
      digits,
      firstDigitMax,
      onValueChange,
      part,
      value,
      max,
      min,
      loopable,
    ]
  );
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      propOnKeyDown?.(event);

      const keys = preventHorizontalKeys ? STOP_KEYS : UPDATE_KEYS;
      if (keys.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }

      const { value } = event.currentTarget;
      if (!UPDATE_KEYS.includes(event.key)) {
        return;
      }

      keypressCount.current = -1;
      let numberValue = parseFloat(value.replace(/[^0-9]/g, "") || "0");
      switch (event.key) {
        case "ArrowUp":
          numberValue = loop({
            increment: true,
            value: numberValue,
            min,
            max,
            minmax: !loopable,
          });
          break;
        case "ArrowDown":
          numberValue = loop({
            increment: false,
            value: numberValue,
            min,
            max,
            minmax: !loopable,
          });
          break;
        case "Home":
          numberValue = min;
          break;
        case "End":
          numberValue = max;
          break;
        case " ":
        case "Backspace":
        case "Delete":
          numberValue = NaN;
      }

      const nextValue = Number.isNaN(numberValue)
        ? emptyValue
        : `${numberValue}`.padStart(digits, "0");
      if (value !== nextValue) {
        dispatchChangeEvent(event.currentTarget, nextValue);
      }
    },
    [
      digits,
      emptyValue,
      loopable,
      max,
      min,
      preventHorizontalKeys,
      propOnKeyDown,
    ]
  );

  useEffect(() => {
    const field = nodeRef.current;
    if (!field || !required) {
      return;
    }

    if (value === emptyValue) {
      field.setCustomValidity(emptyMessage);
    }

    if (document.activeElement === field) {
      field.setSelectionRange(0, value.length);
    }

    return () => {
      field.setCustomValidity("");
    };
  }, [value, nodeRef, emptyValue, emptyMessage, required]);

  return {
    ref: nodeRefCallback,
    value,
    onBlur,
    onFocus,
    onChange,
    onKeyDown,
  };
}
