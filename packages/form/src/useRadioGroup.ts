import type { UseStateInitializer, UseStateSetter } from "@react-md/core";
import type { ChangeEventHandler } from "react";
import { useCallback, useRef, useState } from "react";

const noop = (): void => {
  // do nothing
};

/** @remarks \@since 6.0.0 */
export interface RadioGroupOptions<T extends string | number> {
  /**
   * The name to apply to each radio within the group.
   */
  name: string;

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
export interface ProvidedRadioProps {
  name: string;
  value: string | number;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

/** @remarks \@since 6.0.0 */
export interface RadioGroupReturnValue<T extends string | number> {
  value: T;
  setValue: UseStateSetter<T>;
  reset(): void;
  getRadioProps(value: T): ProvidedRadioProps;
}

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
export function useRadioGroup<T extends number>(
  options: RadioGroupOptions<T> & { defaultValue: UseStateInitializer<T> }
): RadioGroupReturnValue<T>;
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
export function useRadioGroup<T extends string>(
  options: RadioGroupOptions<T> & { defaultValue?: UseStateInitializer<T> }
): RadioGroupReturnValue<T>;
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
export function useRadioGroup<T extends string | number>(
  options: RadioGroupOptions<T>
): RadioGroupReturnValue<T> {
  const { name, defaultValue, onChange = noop } = options;
  const [value, setValue] = useState<T>(() => {
    if (typeof defaultValue === "function") {
      return defaultValue();
    }

    return defaultValue ?? ("" as T);
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
        onChange(event) {
          onChange?.(event);
          if (!event.isPropagationStopped()) {
            setValue(radioValue);
          }
        },
      };
    },
  };
}
