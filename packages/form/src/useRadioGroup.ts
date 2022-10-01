import type { UseStateInitializer, UseStateSetter } from "@react-md/core";
import type { ChangeEventHandler } from "react";
import { useCallback, useRef, useState } from "react";

/** @remarks \@since 6.0.0 */
export interface RadioGroupOptions<T extends string | number> {
  /**
   * A `name` to apply to all the radios within the group. This is required if
   * the {@link menu} option is set to `true`.
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
   * If you need custom `onChange` behavior for your `Radio` components, you can
   * use this prop. Calling `event.stopPropagation()` will prevent the checked
   * state from updating.
   *
   * @defaultValue `() => {}`
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

/** @remarks \@since 6.0.0 */
export interface RadioGroupImplementation<V extends string | number> {
  reset(): void;
  value: V;
  setValue: UseStateSetter<V>;
  getRadioProps(value: V): {
    name: string;
    value: V;
    checked: boolean;
    onChange(): void;
  };
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
    value: V;
    checked: boolean;
    onChange?(): void;
    onCheckedChange?(): void;
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
  const { name, defaultValue, menu = false } = options;
  const [value, setValue] = useState<V>(() => {
    if (typeof defaultValue === "function") {
      return defaultValue();
    }

    return defaultValue ?? ("" as V);
  });
  const initial = useRef(value);

  return {
    reset: useCallback(() => {
      setValue(initial.current);
    }, []),
    value: value,
    setValue,
    getRadioProps(radioValue) {
      return {
        name,
        value: radioValue,
        checked: value === radioValue,
        [menu ? "onCheckedChange" : "onChange"]() {
          setValue(radioValue);
        },
      };
    },
  };
}
