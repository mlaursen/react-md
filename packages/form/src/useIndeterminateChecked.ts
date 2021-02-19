import { Dispatch, SetStateAction, useState } from "react";

/**
 * All the props that will be provided from the `useIndeterminateChecked` hook
 * for the root indeterminate checkbox.
 */
export interface ProvidedIndeterminateCheckboxProps {
  "aria-checked"?: "mixed";
  checked: boolean;
  onChange: () => void;
  indeterminate: boolean;
}

/**
 * All the props that will be provided for all the checkboxes that are
 * controlled by the root indeterminate checkbox.
 */
export interface ProvidedIndeterminateControlledCheckboxProps<
  T extends string
> {
  value: T;
  checked: boolean;
  onChange: () => void;
}

/**
 * The function that provides the props for each checkbox that is controlled by
 * the root indeterminate checkbox.
 */
export type GetIndeterminateControlledCheckboxProps<T extends string> = (
  value: T
) => ProvidedIndeterminateControlledCheckboxProps<T>;

export interface IndeterminateCheckedReturnValue<T extends string> {
  getProps: GetIndeterminateControlledCheckboxProps<T>;
  rootProps: ProvidedIndeterminateCheckboxProps;
  checkedValues: T[];
  setCheckedValues: Dispatch<SetStateAction<T[]>>;
}

/**
 * This hook allows you to toggle the state of multiple checkboxes in a single
 * place along with an indeterminate checkbox that can check/uncheck all
 * checkboxes at once.
 *
 * ### Examples:
 *
 * #### Simple value list with labels lookup:
 *
 * ```tsx
 * const values = ["a", "b", "c", "d"];
 * const LABELS = { a: "Label 1", b: "Label 2", c: "Label 3", d: "Label 4" };
 * const { getProps, rootProps } = useIndeterminateChecked(values);
 *
 * return (
 *   <>
 *     <Checkbox id="root-checkbox" {...rootProps} label="Root Checkbox" />
 *     {values.map((value, i) => (
 *       <Checkbox
 *         id={`child-checkbox-${i + 1}`}
 *         label={LABELS[value]}
 *         {...getProps(value)}
 *       />
 *     ))}
 *   </>
 * );
 * ```
 *
 * #### Fetch Data From Server and check first result
 * ```tsx
 * interface ServerFetchedData {
 *   id: Guid;
 *   name: string;
 * }
 *
 *
 * const [data, setData] = useState<ServerFetchedData[]>([]);
 * const { getProps, rootProps, setCheckedValues } = useIndeterminateChecked(
 *   data.map(({ id }) => id),
 * );
 *
 * useEffect(() => {
 *   let cancelled = false;
 *   (async function load() {
 *     const response = await fetch("/my-api");
 *     const json = await response.json();
 *     if (!cancelled) {
 *       // pretend validation and sanity checks
 *       setData(json as ServerFetchedData[]);
 *       setCheckedValues(json[0].id);
 *     }
 *   })();

 *   return () => {
 *     cancelled = true;
 *   };
 * }, []);
 *
 * return (
 *   <>
 *     <Checkbox id="root-checkbox" {...rootProps} label="Root Checkbox" />
 *     {data.map(({ id, name }, i) => (
 *       <Checkbox
 *         id={`child-checkbox-${i + 1}`}
 *         label={name}
 *         {...getProps(id)}
 *       />
 *     ))}
 *   </>
 * );
 * ```
 *
 * @param values - All the checkbox values that the indeterminate checkbox can
 * control. The values will **need** to be unique as they are passed to each
 * checkbox to determine if it is checked or not. This will directly map to
 * the `value` attribute for each checkbox.
 * @param defaultCheckedValues - An optional list of all the values that are
 * checked on first render. Changing this value will not update the checked
 * values.
 * @param onChange - An optional function to call whenever the checked values
 * list updates that will provide the next list of all the checked values. This
 * isn't a super helpful prop since this hook will always return the checked
 * values anyways.
 * @returns An object containing a function to get the props for each controlled
 * checkbox, the props for the root indeterminate checkbox, a list of all the
 * checked values, and a general `setCheckboxValues` function from `useState` if
 * the list of values can be changed from external sources as well.
 */
export function useIndeterminateChecked<T extends string>(
  values: T[],
  defaultCheckedValues: T[] | (() => T[]) = [],
  onChange?: (checkedValues: T[]) => void
): IndeterminateCheckedReturnValue<T> {
  const [checkedValues, setCheckedValues] = useState<T[]>(defaultCheckedValues);
  const checked = checkedValues.length > 0;
  const indeterminate = checked && checkedValues.length < values.length;

  const updateCheckedValues = (values: T[]): void => {
    if (onChange) {
      onChange(values);
    }

    setCheckedValues(values);
  };

  const rootProps: ProvidedIndeterminateCheckboxProps = {
    "aria-checked": indeterminate ? "mixed" : undefined,
    checked,
    indeterminate,
    onChange: () =>
      updateCheckedValues(
        checkedValues.length === 0 || indeterminate ? values : []
      ),
  };

  const getProps: GetIndeterminateControlledCheckboxProps<T> = (value) => ({
    value,
    checked: checkedValues.includes(value),
    onChange: () => {
      const i = checkedValues.indexOf(value);
      const nextChecked = checkedValues.slice();
      if (i === -1) {
        nextChecked.push(value);
      } else {
        nextChecked.splice(i, 1);
      }

      updateCheckedValues(nextChecked);
    },
  });

  return {
    getProps,
    rootProps,
    checkedValues,
    setCheckedValues,
  };
}
