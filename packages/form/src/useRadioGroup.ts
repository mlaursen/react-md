import type { UseStateInitializer, UseStateSetter } from "@react-md/core";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useCallback, useRef, useState } from "react";

const noop = (): void => {
  // do nothing
};

/** @remarks \@since 6.0.0 */
export interface RadioGroupOptions<T extends string | number> {
  /**
   * A `name` to apply to all the radios within the group. This is required if
   * unless {@link menu} is set to `true`.
   */
  name?: string;

  /**
   * Set this to `true` if using the `MenuItemRadio` component instead of the
   * `Radio` so the correct props can be provided.
   *
   * @defaultValue `false`
   */
  menu?: boolean;

  /**
   * The value of a radio that should be checked by default. If you want to
   * force the user to select one of the radios, keep this as the empty string
   * or set it to a string or number that does not represent a valid radio
   * value.
   *
   * @defaultValue `""`
   */
  defaultValue?: UseStateInitializer<T>;

  /**
   * Set this to `true` if one of the radios within the group must be checked before
   * a form can be submitted.
   *
   * This option is invalid and will be ignored if {@link menu} is `true`.
   *
   * @defaultValue `false`
   */
  required?: boolean;

  /**
   * If you need to prevent the default behavior in a radio group for some
   * reason, you can provide a custom `onCHange` event handler and call
   * `event.stopPropagation()`. This will be called whenever a new radio button
   * is checked.
   *
   * This option is invalid and will be ignored if {@link menu} is `true`.
   *
   * @defaultValue `() => {}`
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * If the radio group has {@link required} set to `true`, the radios will gain
   * the `error` state if a form is submitted wiithout a checked radio. If you
   * want to prevent that behavior for some reason, you can provide this
   * function and call `event.stopPropagation()`.
   *
   * This option is invalid and will be ignored if {@link menu} is `true`.
   *
   * @defaultValue `() => {}`
   */
  onInvalid?: FormEventHandler<HTMLInputElement>;
}

/** @remarks \@since 6.0.0 */
export interface ProvidedRadioGroupProps<V extends string | number> {
  name: string;
  value: V;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error: boolean;
  required: boolean;
  onInvalid: FormEventHandler<HTMLInputElement>;
}

/** @remarks \@since 6.0.0 */
export interface RadioGroupImplementation<V extends string | number> {
  reset(): void;
  value: V;
  setValue: UseStateSetter<V>;
  getRadioProps(value: V): Readonly<ProvidedRadioGroupProps<V>>;
}

/** @remarks \@since 6.0.0 */
export interface MenuItemRadioGroupImplementation<V extends string | number> {
  reset(): void;
  value: V;
  setValue: UseStateSetter<V>;
  getCheckboxProps(value: V): {
    checked: boolean;
    onCheckedChange(): void;
  };
}

/** @remarks \@since 6.0.0 */
export interface CombinedRadioGroupReturnValue<V extends string | number> {
  reset(): void;
  value: V;
  setValue: UseStateSetter<V>;
  getRadioProps?(value: V): {
    name?: string;
    value?: V;
    checked: boolean;
    error?: boolean;
    required?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onCheckedChange?(): void;
    onInvalid?: FormEventHandler<HTMLInputElement>;
  };
}

// Note: These overrides are set up so that the value will default to any
// string.

/**
 * @example
 * Generic Number Example
 * ```tsx
 * const { value, getRadioProps } = useRadioGroup<number>({
 *   name: "group",
 *   defaultValue: -1
 * });
 *
 *
 * return (
 *   <>
 *     <Radio {...getRadioProps(0)} label="First" />
 *     <Radio {...getRadioProps(1)} label="Second" />
 *     <Radio {...getRadioProps(2)} label="Third" />
 *   </>
 * );
 * ```
 * @remarks \@since 6.0.0
 */
export function useRadioGroup<V extends number>(
  options: RadioGroupOptions<V> & {
    menu?: false;
    name: string;
    defaultValue: UseStateInitializer<V>;
  }
): RadioGroupImplementation<V>;
export function useRadioGroup<V extends number>(
  options: RadioGroupOptions<V> & {
    menu: true;
    name?: never;
    required?: never;
    onChange?: never;
    onInvalid?: never;
    defaultValue: UseStateInitializer<V>;
  }
): MenuItemRadioGroupImplementation<V>;
/**
 * @example
 * Generic String Example
 * ```tsx
 * const { value, getRadioProps } = useRadioGroup({ name: "group" });
 *
 * return (
 *   <>
 *     <Radio {...getRadioProps("a")} label="First" />
 *     <Radio {...getRadioProps("b")} label="Second" />
 *     <Radio {...getRadioProps("c")} label="Third" />
 *   </>
 * );
 * ```
 *
 * @example
 * String Union Example
 * ```tsx
 * const values = [
 *   { label: "First", value: "a" },
 *   { label: "Second", value: "b" },
 *   { label: "Third", value: "c" },
 * ] as const;
 *
 * type Values = typeof values[number]["value"];
 * //   ^ "a" | "b" | "c"
 *
 * const { value, getRadioProps } = useRadioGroup<Values | "">({
 *   name: "group",
 *   defaultValue: "",
 * });
 *
 *
 * return (
 *   <>
 *     {values.map(({ label, value }) => (
 *       <Radio {...getRadioProps(value)} key={value} label={label} />
 *     ))}
 *   </>
 * );
 * ```
 * @remarks \@since 6.0.0
 */
export function useRadioGroup<V extends string>(
  options: RadioGroupOptions<V> & {
    menu?: false;
    name: string;
    defaultValue?: UseStateInitializer<V>;
  }
): RadioGroupImplementation<V>;
export function useRadioGroup<V extends string>(
  options: RadioGroupOptions<V> & {
    menu: true;
    name?: never;
    required?: never;
    onChange?: never;
    onInvalid?: never;
    defaultValue?: UseStateInitializer<V>;
  }
): MenuItemRadioGroupImplementation<V>;
/**
 * @example
 * Strict Union Example
 * ```tsx
 * type ValidValues = 1 | 2 | 3 | 4 | "" | "a" | "b";
 *
 * const { value, getRadioProps } = useRadioGroup<ValidValues>({
 *   name: "group",
 *   defaultValue: ""
 * });
 *
 *
 * return (
 *   <>
 *     <Radio {...getRadioProps(1)} label="First" />
 *     <Radio {...getRadioProps(2)} label="Second" />
 *     <Radio {...getRadioProps(3)} label="Third" />
 *     <Radio {...getRadioProps(4)} label="Forth" />
 *     <Radio {...getRadioProps("a")} label="Fifth" />
 *     <Radio {...getRadioProps("b")} label="Sixth" />
 *     <Radio {...getRadioProps("c")} label="Seventh" />
 *   </>
 * );
 * ```
 * @remarks \@since 6.0.0
 */
export function useRadioGroup<V extends string | number>(
  options: RadioGroupOptions<V>
): CombinedRadioGroupReturnValue<V> {
  const {
    name,
    defaultValue,
    menu = false,
    required,
    onChange = noop,
    onInvalid = noop,
  } = options;
  const [value, setValue] = useState<V>(() => {
    if (typeof defaultValue === "function") {
      return defaultValue();
    }

    return defaultValue ?? ("" as V);
  });
  const initial = useRef(value);
  const [error, setError] = useState(false);

  return {
    reset: useCallback(() => {
      setError(false);
      setValue(initial.current);
    }, []),
    value: value,
    setValue,
    getRadioProps(radioValue) {
      const checked = value === radioValue;
      if (menu) {
        return {
          checked,
          onCheckedChange() {
            setError(false);
            setValue(radioValue);
          },
        };
      }

      return {
        name,
        value: radioValue,
        error,
        checked,
        required,
        onChange(event) {
          onChange(event);
          if (event.isPropagationStopped()) {
            return;
          }

          setError(false);
          setValue(radioValue);
        },
        onInvalid(event) {
          onInvalid(event);
          if (event.isPropagationStopped()) {
            return;
          }
          setError(true);
        },
      };
    },
  };
}
