"use client";
import { useCallback, useRef, useState } from "react";
import { type UseStateInitializer, type UseStateSetter } from "../types.js";

const EMPTY_LIST = [] as const;

/** @since 6.0.0 */
export interface CheckboxGroupOptions<V> {
  /**
   * A `name` to apply to all the checkboxes within the group. This is required
   * if the {@link menu} option is set to `true`.
   */
  name?: string;

  /**
   * Set this to `true` if using the `MenuItemCheckbox` component instead of the
   * `Checkbox` so the correct props can be provided.
   *
   * @defaultValue `false`
   */
  menu?: boolean;

  /**
   * This prop **must** be defined to enable the indeterminate checkbox feature
   * from the hook. This should be a list of all the possible checkbox values in
   * the group. This will be used to select all values when the indeterminate
   * checkbox is checked and determine if all the checkboxes have manually be
   * selected.
   *
   * @example Indeterminate Behavior
   * ```tsx
   * const OPTIONS = [
   *   { label: "First", value: "a" },
   *   { label: "Second", value: "b" },
   *   { label: "Third", value: "c" },
   * ] as const:
   * const VALUES = OPTIONS.map(({ value }) => value) as const;
   *
   * const {
   *   getCheckboxProps,
   *   getIndeterminateProps,
   *   checkedValues,
   * } = useCheckboxGroup({ name: "group", values: VALUES });
   * ```
   */
  values?: readonly V[];

  /**
   * Set this to a list of checkbox values that should be checked by default.
   *
   * @defaultValue `[]`
   */
  defaultCheckedValues?: UseStateInitializer<readonly V[]>;
}

/** @since 6.0.0 */
export interface CheckboxGroupImplementation<V extends string> {
  reset(): void;
  checkedValues: ReadonlySet<V>;
  setCheckedValues: UseStateSetter<ReadonlySet<V>>;
  getCheckboxProps(value: V): {
    name: string;
    value: V;
    checked: boolean;
    onChange(): void;
  };
}

/** @since 6.0.0 */
export interface IndeterminateCheckboxGroupImplementation<V extends string>
  extends CheckboxGroupImplementation<V> {
  getIndeterminateProps(): {
    "aria-checked": "mixed" | undefined;
    name: string;
    checked: boolean;
    indeterminate: boolean;
    onChange(): void;
  };
}

/** @since 6.0.0 */
export interface MenuItemCheckboxGroupImplementation<V extends string> {
  reset(): void;
  checkedValues: ReadonlySet<V>;
  setCheckedValues: UseStateSetter<ReadonlySet<V>>;
  getCheckboxProps(value: V): {
    checked: boolean;
    onCheckedChange(): void;
  };
}

/** @since 6.0.0 */
export interface IndeterminateMenuItemCheckboxGroupImplementation<
  V extends string,
> extends MenuItemCheckboxGroupImplementation<V> {
  getIndeterminateProps(): {
    "aria-checked": "mixed" | undefined;
    checked: boolean;
    indeterminate: boolean;
    onCheckedChange(): void;
  };
}

/** @since 6.0.0 */
export interface CombinedCheckboxGroupReturnValue<V extends string> {
  reset(): void;
  checkedValues: ReadonlySet<V>;
  setCheckedValues: UseStateSetter<ReadonlySet<V>>;
  getCheckboxProps(value: V): {
    name?: string;
    value?: V;
    checked: boolean;
    onChange?(): void;
    onCheckedChange?(): void;
  };
  getIndeterminateProps?(): {
    "aria-checked": "mixed" | undefined;
    name?: string;
    checked: boolean;
    indeterminate: boolean;
    onChange?(): void;
    onCheckedChange?(): void;
  };
}

/**
 * @example Checkbox Group
 * ```tsx
 * const { getCheckboxProps, checkedValues } = useCheckboxGroup({ name: "example" });
 *
 * return (
 *   <>
 *     <Checkbox {...getCheckboxProps("a")}>
 *       First
 *     </Checkbox>
 *     <Checkbox {...getCheckboxProps("b")}>
 *       Second
 *     </Checkbox>
 *     <Checkbox {...getCheckboxProps("c")}>
 *       Third
 *     </Checkbox>
 *   </>
 * );
 * ```
 *
 * @since 6.0.0
 */
export function useCheckboxGroup<V extends string>(
  options: CheckboxGroupOptions<V> & {
    menu?: false;
    name: string;
    values?: never;
  }
): CheckboxGroupImplementation<V>;
/**
 * @example Indeterminate Checkbox Group
 * ```tsx
 * const OPTIONS = [
 *   { label: "First", value: "a" },
 *   { label: "Second", value: "b" },
 *   { label: "Third", value: "c" },
 * ] as const:
 * const VALUES = OPTIONS.map(({ value }) => value) as const;
 *
 * const {
 *   getCheckboxProps,
 *   getIndeterminateProps,
 *   checkedValues
 * } = useCheckboxGroup({
 *     name: "example",
 *     values: VALUES,
 *   });
 *
 * return (
 *   <>
 *     <Checkbox {...getIndeterminateProps()} label="Select all" />
 *     {VALUES.map(({ label, value }) => (
 *       <Checkbox key={value} label={label} {...getCheckboxProps(value)} />
 *     ))}
 *   </>
 * );
 * ```
 *
 * @since 6.0.0
 */
export function useCheckboxGroup<V extends string>(
  options: CheckboxGroupOptions<V> & {
    menu?: false;
    name: string;
    values: readonly V[];
  }
): IndeterminateCheckboxGroupImplementation<V>;
/**
 * @example MenuItemCheckbox Group
 * ```tsx
 * const { getCheckboxProps, checkedValues } = useCheckboxGroup({ menu: true });
 *
 * return (
 *   <>
 *     <MenuItemCheckbox {...getCheckboxProps("a")}>
 *       First
 *     </MenuItemCheckbox>
 *     <MenuItemCheckbox {...getCheckboxProps("b")}>
 *       Second
 *     </MenuItemCheckbox>
 *     <MenuItemCheckbox {...getCheckboxProps("c")}>
 *       Third
 *     </MenuItemCheckbox>
 *   </>
 * );
 * ```
 *
 * @since 6.0.0
 */
export function useCheckboxGroup<V extends string>(
  options: CheckboxGroupOptions<V> & {
    menu: true;
    name?: never;
    values?: never;
  }
): MenuItemCheckboxGroupImplementation<V>;
/**
 * @example Indeterminate MenuItemCheckbox Group
 * ```tsx
 * const OPTIONS = [
 *   { label: "First", value: "a" },
 *   { label: "Second", value: "b" },
 *   { label: "Third", value: "c" },
 * ] as const:
 * const VALUES = OPTIONS.map(({ value }) => value) as const;
 *
 * const { getCheckboxProps, getIndeterminateProps, checkedValues } = useCheckboxGroup({
 *   menu: true,
 *   values: VALUES,
 * });
 *
 * return (
 *   <>
 *     <MenuItemCheckbox {...getIndeterminateProps()}>
 *       All
 *     <MenuItemCheckbox>
 *     {OPTIONS.map(({ label, value }) => (
 *       <MenuItemCheckbox key={value} {...getCheckboxProps(value)}>
 *         {label}
 *       </MenuItemCheckbox>
 *     ))}
 *   </>
 * );
 * ```
 *
 * @since 6.0.0
 */
export function useCheckboxGroup<V extends string>(
  options: CheckboxGroupOptions<V> & {
    menu: true;
    name?: never;
    values: readonly V[];
  }
): IndeterminateMenuItemCheckboxGroupImplementation<V>;
export function useCheckboxGroup<V extends string>(
  options: CheckboxGroupOptions<V>
): CombinedCheckboxGroupReturnValue<V> {
  const {
    name,
    menu = false,
    values,
    defaultCheckedValues = EMPTY_LIST,
  } = options;
  const [checkedValues, setCheckedValues] = useState<ReadonlySet<V>>(() => {
    if (typeof defaultCheckedValues === "function") {
      return new Set(defaultCheckedValues());
    }

    return new Set(defaultCheckedValues);
  });
  const initial = useRef(checkedValues);

  let getIndeterminateProps: CombinedCheckboxGroupReturnValue<V>["getIndeterminateProps"];
  if (values) {
    getIndeterminateProps = () => {
      const checked = checkedValues.size > 0;
      const indeterminate = checked && checkedValues.size < values.length;

      return {
        "aria-checked": indeterminate ? "mixed" : undefined,
        name,
        checked,
        indeterminate,
        [menu ? "onCheckedChange" : "onChange"]() {
          setCheckedValues(() => {
            if (checkedValues.size === 0 || indeterminate) {
              return new Set(values);
            }

            return new Set();
          });
        },
      };
    };
  }

  return {
    reset: useCallback(() => {
      setCheckedValues(initial.current);
    }, []),
    checkedValues,
    setCheckedValues,
    getIndeterminateProps,
    getCheckboxProps(value) {
      return {
        name,
        value: menu ? undefined : value,
        checked: checkedValues.has(value),
        [menu ? "onCheckedChange" : "onChange"]() {
          setCheckedValues((prevValues) => {
            const nextValues = new Set(prevValues);
            if (prevValues.has(value)) {
              nextValues.delete(value);
            } else {
              nextValues.add(value);
            }

            return nextValues;
          });
        },
      };
    },
  };
}
