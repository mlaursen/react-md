import {
  type AriaAttributes,
  type FocusEvent,
  type FormEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type Ref,
  type RefObject,
} from "react";

import { type FormComponentStates } from "../form/types.js";
import { type MinMaxRange, type UseStateInitializer } from "../types.js";

/**
 * @since 6.4.0
 */
export type SpinButtonEventHandlers<E extends HTMLElement = HTMLDivElement> =
  Pick<
    HTMLAttributes<E>,
    "onInput" | "onClick" | "onFocus" | "onBlur" | "onKeyDown"
  >;

/**
 * @since 6.4.0
 */
export type SpinButtonAriaAttributes = Pick<
  AriaAttributes,
  | "aria-required"
  | "aria-invalid"
  | "aria-readonly"
  | "aria-disabled"
  | "aria-valuemin"
  | "aria-valuemax"
  | "aria-valuenow"
  | "aria-valuetext"
>;

/**
 * This is a way to map a single character to a value within a spinbutton and
 * was mostly added to support time inputs. The main example is:
 *
 * @example Day Period Mapping
 * ```ts
 * const AM_PM: SpinButtonCharacterValueMap = {
 *   a: 0,
 *   p: 1,
 * };
 * ```
 *
 * **If the mapping is provided, all other input events are ignored**.
 *
 * @since 6.4.0
 */
export type SpinButtonCharacterValueMap = Readonly<Record<string, number>>;

/**
 * @since 6.4.0
 */
export type SpinButtonValue = number | null;

/**
 * @since 6.4.0
 */
export type SpinButtonGetValueText = (
  value: SpinButtonValue
) => string | undefined;

/**
 * @since 6.4.0
 */
export type SpinButtonChangeEvent<E extends HTMLElement = HTMLDivElement> =
  | FormEvent<E>
  | KeyboardEvent<E>
  | FocusEvent<E>;

/**
 * @since 6.4.0
 */
export type SpinButtonChangeReason =
  | "change"
  | "type"
  | "typed-to-completion"
  | "cleared";

/**
 * @since 6.4.0
 */
export interface SpinButtonChangeEventOptions<
  E extends HTMLElement = HTMLDivElement,
> {
  event: SpinButtonChangeEvent<E>;
  value: SpinButtonValue;
  reason: SpinButtonChangeReason;
}

/**
 * This callback will be fired whenever the spinbutton value has changed.
 *
 * The `reason` will be "typed-to-completion"` when:
 * - the `value` is not `null` and:
 *   - the user uses the `ArrowUp`, `ArrowDown`, `Home`, `End`, `PageUp`, or
 *     `PageDown` keys to change the value
 *   - the user has typed the max amount of digits based on the `max` value
 *
 * Examples with: `min=0` and `max=12`
 * - `1` -> (1, false)
 *   - `Tab` or blur (1, true)
 *   - `1` ->  (11, true)
 * - `0` - (1, false)
 *   - `Tab` or blur (0, true)
 *   - `3` (3, true)
 * - `3` -> (3, true)
 *   - there are no more characters that could have been typed
 *
 *
 * @since 6.4.0
 */
export type SpinButtonValueChange<E extends HTMLElement = HTMLDivElement> = (
  options: SpinButtonChangeEventOptions<E>
) => void;

/**
 * @since 6.4.0
 */
export interface SpinButtonUnknownValueOptions<
  E extends HTMLElement = HTMLDivElement,
> {
  value?: SpinButtonValue;
  defaultValue?: UseStateInitializer<SpinButtonValue>;
  onValueChange?: SpinButtonValueChange<E>;
}

/**
 * @since 6.4.0
 */
export interface SpinButtonControlledValueOptions<
  E extends HTMLElement = HTMLDivElement,
> {
  value: SpinButtonValue;
  defaultValue?: never;
  onValueChange: SpinButtonValueChange<E>;
}

/**
 * @since 6.4.0
 */
export interface SpinButtonUncontrolledValueOptions<
  E extends HTMLElement = HTMLDivElement,
> {
  value?: never;
  defaultValue?: UseStateInitializer<SpinButtonValue>;
  onValueChange?: SpinButtonValueChange<E>;
}

/**
 * @since 6.4.0
 */
export type SpinButtonValueOptions<E extends HTMLElement = HTMLDivElement> =
  | SpinButtonControlledValueOptions<E>
  | SpinButtonUncontrolledValueOptions<E>;

/**
 * @since 6.4.0
 */
export interface SpinButtonDigitRangeOptions {
  /**
   * This is the minimum number of digits that should be shown in the spin
   * button as the user is typing. If the current value is less than this
   * value, the {@link placeholderChar} will be used as a `padStart` value.
   *
   * @example Get Text Content Example
   * ```ts
   * const textContent1 = getTextContent({
   *   value: null,
   *   fallback: "HH",
   *   placeholderChar: "0",
   * });
   * // ^ textContent1 === "HH"
   *
   * const textContent2 = getTextContent({
   *   value: 3,
   *   fallback: "HH",
   *   placeholderChar: "0",
   * });
   * // ^ textContent2 === "03"
   *
   * const textContent3 = getTextContent({
   *   value: 12,
   *   fallback: "HH",
   *   placeholderChar: "0",
   * });
   * // ^ textContent3 === "12"
   * ```
   *
   * @example Year Example
   * ```ts
   * const textContent1 = getTextContent({
   *   value: null,
   *   fallback: "YYYY",
   *   minDigits: 4,
   * });
   * // ^ textContent1 === "YYYY"
   *
   * const textContent2 = getTextContent({
   *   value: 2,
   *   fallback: "YYYY",
   *   minDigits: 4,
   * });
   * // ^ textContent2 === "0002"
   *
   * const textContent3 = getTextContent({
   *   value: 200,
   *   fallback: "YYYY",
   *   minDigits: 4,
   * });
   * // ^ textContent3 === "0200"
   *
   * const textContent4 = getTextContent({
   *   value: 2025,
   *   fallback: "YYYY",
   *   minDigits: 4,
   * });
   * // ^ textContent4 === "2025"
   * ```
   *
   * @see {@link SpinButtonTextPlaceholderOptions.placeholderChar}
   * @defaultValue `fallback?.length ?? getNumberOfDigits(min)`
   */
  minDigits?: number;

  /**
   * This is the maximum number of digits that should be shown in the spin
   * button as the user is typing and is used to determine if the user has
   * `"typed-to-completion"`.
   *
   * @example Year Example
   * ```tsx
   * // this _could_ also be 9999
   * const max = undefined;
   * const maxDigits = 4;
   *
   * // if the current value is `null` and the user types `2`
   * onValueChange({
   *   event,
   *   reason: "change",
   *   nextValue: 2,
   * });
   *
   * // if the current value is `2` and the user types `0`
   * onValueChange({
   *   event,
   *   reason: "change",
   *   nextValue: 20,
   * });
   *
   * // if the current value is `20` and the user types `2`
   * onValueChange({
   *   event,
   *   reason: "change",
   *   nextValue: 202,
   * });
   *
   * // if the current value is `202` and the user types `5`:
   * onValueChange({
   *   event,
   *   reason: "typed-to-completion",
   *   nextValue: 2025,
   * });
   * ```
   *
   * @defaultValue `getNumberOfDigits(max)`
   */
  maxDigits?: number;
}

/**
 * @since 6.4.0
 */
export interface SpinButtonRangeOptions
  extends Partial<MinMaxRange>, SpinButtonDigitRangeOptions {}

/**
 * @since 6.4.0
 */
export interface SpinButtonTextPlaceholderOptions extends SpinButtonRangeOptions {
  /**
   * An optional fallback value to display when the spin button's value is
   * `null`. For example: if the spin button is used to set the specific hour
   * in a time field, set the fallback to `"HH"` to show that until the user
   * has typed a value.
   */
  fallback?: string;

  /**
   * This is the character to use to fill the remaining number of digits to
   * display in the spin button.
   *
   * @see {@link minDigits}
   * @defaultValue `"0"`
   */
  placeholderChar?: string;
}

/**
 * @since 6.4.0
 */
export interface GetSpinButtonTextContentOptions extends SpinButtonTextPlaceholderOptions {
  /**
   * The current value in the spin button to convert to text. **This will be
   * called with numbers outside of the allowed range**.
   */
  value: SpinButtonValue;
}

/**
 * @since 6.4.0
 */
export type GetSpinButtonTextContent = (
  options: GetSpinButtonTextContentOptions
) => string;

/**
 * @since 6.4.0
 */
export type GetSpinButtonValueText = (
  value: SpinButtonValue
) => string | undefined;

/**
 * @since 6.4.0
 */
export interface SpinButtonFormStates extends Omit<
  FormComponentStates,
  "active"
> {
  required?: boolean;
}

/**
 * @since 6.4.0
 */
export interface SpinButtonOptions<E extends HTMLElement = HTMLDivElement>
  extends
    SpinButtonEventHandlers<E>,
    SpinButtonUnknownValueOptions<E>,
    SpinButtonFormStates,
    SpinButtonTextPlaceholderOptions {
  /**
   * @defaultValue `"spinbutton-" + useId()`
   */
  id?: string;
  ref?: Ref<E>;
  form?: string;

  /**
   * The default value to use when the increment or decrement action is fired
   * from the spinbutton through keyboard events before a value has been set.
   * So when the increment action is fired, this will be
   * `defaultKeyboardValue + 1`.
   *
   * @defaultValue `min ?? max ?? 0`
   */
  defaultKeyboardValue?: UseStateInitializer<number>;

  /**
   * NOTE: This isn't actually supported yet
   *
   * @defaultValue `1`
   */
  step?: number;

  /** @see {@link SpinButtonCharacterValueMap} */
  mappings?: SpinButtonCharacterValueMap;

  /**
   * Used to provide an `aria-valuenow` string for a specific value in the
   * `SpinButton`.
   *
   * @defaultValue `(value) => value === null ? "No value selected" : undefined`
   */
  getValueText?: GetSpinButtonValueText;

  getTextContent?: GetSpinButtonTextContent;
}

/**
 * @since 6.4.0
 */
export interface ProvidedSpinButtonProps<E extends HTMLElement = HTMLDivElement>
  extends Required<SpinButtonEventHandlers<E>>, SpinButtonAriaAttributes {
  id: string;
  ref: Ref<E>;
  role: "spinbutton";
  inputMode: "numeric";
  spellCheck: boolean;
  autoCapitalize: "none";
  autoCorrect: "off";
  tabIndex: number | undefined;
  contentEditable: boolean | undefined;
  suppressContentEditableWarning: boolean;
}

/**
 * @since 6.4.0
 */
export interface SpinButtonImplementation<
  E extends HTMLElement = HTMLDivElement,
> {
  value: SpinButtonValue;
  setValue: (value: SpinButtonValue) => void;
  spinButtonRef: RefObject<E | null>;
  spinButtonProps: Readonly<ProvidedSpinButtonProps<E>>;
}
