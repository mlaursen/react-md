import { ReactNode } from "react";
import { SimpleListItemProps } from "@react-md/list";

export interface ListboxOptionProps extends SimpleListItemProps {
  [labelKey: string]: ReactNode;
}

export type ListboxOption = ListboxOptionProps | string | number | null;

/**
 * A type guard that simply checks if the option is considered an object of
 * list item props.
 *
 * @param option The option to check
 * @return true if the option is considered a object of list item props and will
 * ensure that the option is typed as ListboxOptionProps
 * @private
 */
export function isListboxOptionProps(
  option: ListboxOption
): option is ListboxOptionProps {
  return (
    option !== "" && option !== 0 && !!option && typeof option === "object"
  );
}

/**
 * The default way to generate a "unique" id for each option within the
 * listbox by concatenating the current index with a base id.
 *
 * Note: The index will be incremented by 1 so the ids start from 1 instead of 0.
 * This is so that it matches how paginated results work with `aria-posinset` +
 * `aria-setsize`.
 *
 * @param baseId The base id of the listbox.
 * @param index The current index of the option
 * @return a "unique" id for the option
 */
export function getOptionId(baseId: string, index: number): string {
  return `${baseId}-option-${index + 1}`;
}

/**
 * A function that will get the label for an option. The default behavior
 * is to check if the option is an object. If it is, it'll use the `labelKey`
 * property and fallback to the `children` property. If it is anything else,
 * the option itself will be returned.
 *
 * This is used in both the select's button element to show the current value
 * as well as rendering each option within the listbox component.
 *
 * @param option The option that should be converted into a renderable label element.
 * @param labelKey The object key to use to extract the label from an option object.
 * @return a renderable label to display.
 */
export function getOptionLabel(
  option: ListboxOption,
  labelKey: string
): ReactNode {
  if (isListboxOptionProps(option)) {
    const label = option[labelKey];
    return typeof label === "undefined" ? option.children || null : label;
  }

  return option;
}
