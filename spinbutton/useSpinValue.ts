import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  RefCallback,
  useCallback,
  useRef,
} from "react";

import { dispatchChangeEvent } from "../../events";
import { loop } from "../../loop";
import { useEnsuredRef } from "../../useEnsuredRef";
import { useIsomorphicLayoutEffect } from "../../useIsomorphicLayoutEffect";
import { tryToSubmitRelatedForm } from "../tryToSubmitRelatedForm";
import {
  BaseSpinButtonOptions,
  EditableSpinButtonOptions,
  ProvidedEditableSpinButtonProps,
  ProvidedSpinButtonProps,
  ProvidedUseSpinButtonProps,
  SpinButtonOptions,
} from "./types";

/**
 * @remarks \@since 2.7.0
 * @internal
 */
function getValue<E extends HTMLElement>(element: E): string {
  const value = ((element as unknown) as HTMLInputElement).value;
  if (value !== undefined) {
    return value;
  }

  const valueNow = element.getAttribute("aria-valuenow");
  if (valueNow === null) {
    throw new Error("Unable to find a value with `value` or `aria-valuenow`");
  }

  return valueNow;
}

/**
 * @remarks \@since 2.7.0
 * @internal
 */
const VALUE_CHANGE_KEYS = ["ArrowUp", "ArrowDown", "Home", "End"];

/**
 * @remarks \@since 2.7.0
 * @internal
 */
const INPUT_STOP_DEFAULT_KEYS = [
  ...VALUE_CHANGE_KEYS,
  "ArrowLeft",
  "ArrowRight",
];

/**
 * When the `isInput` option is enabled, the `useSpinValue` will be updated to
 * work with the `TextField` component.
 *
 * @typeParam D - This is any additional data that should be returned with the
 * result of the {@link GetSpinValueNextResult} function.
 * @remarks \@since 2.7.0
 */
export function useSpinValue<D = Record<string, unknown>>(
  options: EditableSpinButtonOptions<D>
): ProvidedEditableSpinButtonProps;

/**
 * If the `isInput` option is omitted or `false`, the `useSpinValue` will be
 * updated to work with the `SpinButton` component.
 *
 * @typeParam D - This is any additional data that should be returned with the
 * result of the {@link GetSpinValueNextResult} function.
 * @remarks \@since 2.7.0
 */
export function useSpinValue<D = Record<string, unknown>>(
  options: BaseSpinButtonOptions<HTMLSpanElement, D> & {
    isInput?: false;
  }
): ProvidedSpinButtonProps<HTMLSpanElement>;

/**
 * @example
 * 12-hour Time Picker Example
 * ```tsx
 * interface Data {
 *   period: TimePeriod;
 * }
 *
 * const suggestHours: GetSpinValueNextResult<Data> = (keys, value) => {
 *   let period: TimePeriod = "am";
 *   if (keys.length === 1) {
 *     return {
 *       value,
 *       period,
 *       // if the first key is > 1, it's an invalid 12-time since "valid" first
 *       // digits are either 0 or 1
 *       completed: keys[0] > 1,
 *     }
 *   }
 *
 *   const [prevKey, key] = keys;
 *
 *   let nextValue = `${prevKey}${key}`;
 *   const total = parseInt(nextValue, 10):
 *   if (total > 12) {
 *     period = "pm";
 *     nextValue = `${total - 12}`.padStart(2, "0");
 *   } else if (total === 0) {
 *     nextValue = "12";
 *   }
 *
 *   return {
 *     value: nextValue,
 *     completed: true,
 *     period,
 *   };
 * };
 *
 * const [timePeriod, setTimePeriod] = useState<TimePeriodValue>("")
 * const [hours, setHours] = useState("");
 * const onCompleted: SpinValueCompletedCallback<Data> = (result) => {
 *   setTimePeriod(prev => prev || result.period);
 *   setHours(result.value);
 * };
 * const hoursProps = useSpinValue({
 *   isInput: true,
 *   min: 1,
 *   max: 12,
 *   onSuggest,
 *   onCompleted,
 * });
 *
 * return (
 *   <>
 *     <div
 *       aria-labelledby="hours-label time-period"
 *       role="group"
 *     >
 *       <TextField id="hours" {...hoursProps} />
 *       <RadioGroup
 *         aria-label="AM/PM"
 *         id="time-period"
 *         value={timePeriod}
 *         onChange={setTimePeriod}
 *         items={[{ value: "am", children: "AM"}, { value: "pm", children: "PM" }]}
 *       />
 *     </div>
 *     <label id="hours-label" htmlFor="hours">Hours</label>
 *   </>
 * );
 * ```
 *
 * @param options - All of the options required for rendering a spinbutton.
 * @returns the props to be passed to either the `TextField` or `SpinButton`
 * component so that they can behave as a `role="spinbutton"`.
 * @typeParam E - The `HTMLElement` that is being rendered as a
 * `role="spinbutton"`.
 * @typeParam D - This is any additional data that should be returned with the
 * result of the {@link GetSpinValueNextResult} function.
 * @remarks \@since 2.7.0
 */
export function useSpinValue<
  E extends HTMLElement,
  D = Record<string, unknown>
>({
  min,
  max,
  ref: propRef,
  isInput = false,
  required: isRequired = false,
  placeholder: providedPlaceholder,
  emptyMessage = "Please fill out this field.",
  onFocus,
  onChange,
  onKeyDown,
  onSuggest,
  onCompleted,
}: SpinButtonOptions<E, D>): ProvidedUseSpinButtonProps<E> {
  const digits = `${max}`.length;
  let placeholder = providedPlaceholder ?? "";
  if (isInput && typeof providedPlaceholder === "undefined") {
    placeholder = "-".repeat(digits);
  }

  const [nodeRef, nodeRefCallback] = useEnsuredRef(propRef);
  const prevValue = useRef("");
  const keypressCount = useRef(0);
  const handleFocus = useCallback(
    (event: FocusEvent<E>) => {
      onFocus?.(event);

      keypressCount.current = 0;
      if (isInput) {
        const target = event.currentTarget as E & HTMLInputElement;
        if (
          process.env.NODE_ENV !== "production" &&
          !(event.currentTarget instanceof HTMLInputElement)
        ) {
          throw new Error("Target is not an HTMLInputElement");
        }

        target.setSelectionRange(0, digits);
      }
    },
    [digits, onFocus, isInput]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<E>) => {
      onChange?.(event);

      if (event.isPropagationStopped()) {
        return;
      }

      const target = event.currentTarget as E & HTMLInputElement;
      const isInput = target.tagName === "INPUT";
      if (!getValue(target)) {
        keypressCount.current = 0;

        if (isInput) {
          target.value = placeholder;
          target.setSelectionRange(0, digits);
          target.setCustomValidity(emptyMessage);
        }

        return;
      }

      if (keypressCount.current >= digits) {
        keypressCount.current = 0;
        return;
      }

      const currentValue = getValue(target)
        .replace(/[^0-9]/g, "")
        .substring(0, digits)
        .padStart(digits, "0");

      const key = parseInt(currentValue.charAt(digits - 1), 10);
      const keys = prevValue.current
        .replace(/[^0-9]/g, "0")
        .split("")
        .reverse()
        .slice(0, keypressCount.current)
        .map((key) => parseInt(key, 10));
      keys.push(key);

      keypressCount.current += 1;
      const result = onSuggest(keys, currentValue);
      const { value: nextValue, completed } = result;

      if (isInput) {
        target.setCustomValidity("");
        target.value = nextValue;
        target.setSelectionRange(0, digits);
      } else {
        target.setAttribute("aria-valuenow", nextValue);
      }

      if (completed) {
        keypressCount.current = 0;
        onCompleted?.({
          ...result,
          target,
        });
      }
    },
    [emptyMessage, digits, onChange, onCompleted, onSuggest, placeholder]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<E>) => {
      onKeyDown?.(event);

      if (event.isPropagationStopped()) {
        return;
      }

      if (isInput ? event.key === "Enter" : tryToSubmitRelatedForm(event)) {
        return;
      }

      const value = getValue(event.currentTarget);
      prevValue.current = value;
      const target = event.currentTarget as E & HTMLInputElement;
      const keys = isInput ? INPUT_STOP_DEFAULT_KEYS : VALUE_CHANGE_KEYS;
      if (keys.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (!VALUE_CHANGE_KEYS.includes(event.key)) {
        return;
      }

      keypressCount.current = digits;
      const numberValue = parseFloat(value.replace(/[^0-9]/g, "") || "0");
      let nextValue = numberValue;
      switch (event.key) {
        case "ArrowUp":
          nextValue = loop({
            increment: true,
            value: numberValue,
            min,
            max,
          });
          break;
        case "ArrowDown":
          nextValue = loop({
            increment: false,
            value: numberValue,
            min,
            max,
          });
          break;
        case "Home":
          nextValue = min;
          break;
        case "End":
          nextValue = max;
          break;
      }

      if (nextValue !== numberValue) {
        const stringified = `${nextValue}`.padStart(2, "0");
        if (isInput) {
          dispatchChangeEvent(target, stringified);
          target.setSelectionRange(0, digits);
        } else {
          target.setAttribute("aria-valuenow", stringified);
        }
      }
    },
    [digits, max, min, onKeyDown, isInput]
  );

  useIsomorphicLayoutEffect(() => {
    const node = nodeRef.current as E & HTMLInputElement;
    if (
      !isInput ||
      !node ||
      !emptyMessage ||
      node.tagName !== "INPUT" ||
      getValue(node) !== placeholder
    ) {
      return;
    }

    node.setCustomValidity(emptyMessage);
    return () => {
      node.setCustomValidity("");
    };
  }, [isInput, emptyMessage, placeholder]);

  let ref: RefCallback<E> | undefined;
  let required: boolean | undefined;
  let defaultValue: string | undefined;
  if (isInput) {
    ref = nodeRefCallback;
    required = isRequired;
    defaultValue = placeholder;
  }

  return {
    ref,
    required,
    defaultValue,
    onFocus: handleFocus,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
  };
}
