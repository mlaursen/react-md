import { createElement, ReactNode } from "react";
import { TextIconSpacing } from "@react-md/icon";
import { SimpleListItemProps } from "@react-md/list";

export interface ListboxOptionProps extends SimpleListItemProps {
  [labelKey: string]: ReactNode;
}

export type ListboxOption = ListboxOptionProps | string | number | null;

/**
 * A type guard that simply checks if the option is considered an object of list
 * item props.
 *
 * @param option - The option to check
 * @returns true if the option is considered a object of list item props and
 * will ensure that the option is typed as ListboxOptionProps
 * @internal
 */
export function isListboxOptionProps(
  option: ListboxOption
): option is ListboxOptionProps {
  return (
    option !== "" && option !== 0 && !!option && typeof option === "object"
  );
}

/**
 * The default implementation to check if an option is disabled. It will just
 * check if the option is an object and if it has the disabled prop enabled.
 *
 * @param option - The option to check
 * @returns true if the option is disabled
 * @internal
 */
export function defaultIsOptionDisabled(option: ListboxOption): boolean {
  return isListboxOptionProps(option) && !!option.disabled;
}

/**
 * The default way to generate a "unique" id for each option within the listbox
 * by concatenating the current index with a base id.
 *
 * Note: The index will be incremented by 1 so the ids start from 1 instead of
 * 0. This is so that it matches how paginated results work with `aria-posinset`
 * + `aria-setsize`.
 *
 * @param baseId - The base id of the listbox.
 * @param index - The current index of the option
 * @returns a "unique" id for the option
 */
export function getOptionId(baseId: string, index: number): string {
  return `${baseId}-option-${index + 1}`;
}

/**
 * A function that will get the label for an option. The default behavior is to
 * check if the option is an object. If it is, it'll use the `labelKey` property
 * and fallback to the `children` property. If it is anything else, the option
 * itself will be returned.
 *
 * This is used in both the select's button element to show the current value as
 * well as rendering each option within the listbox component.
 *
 * @param option - The option that should be converted into a renderable label
 * element.
 * @param labelKey - The object key to use to extract the label from an option
 * object.
 * @returns a renderable label to display.
 */
export function getOptionLabel(
  option: ListboxOption,
  labelKey: string
): ReactNode {
  if (isListboxOptionProps(option)) {
    if (typeof option.children !== "undefined") {
      return option.children;
    }

    const label = option[labelKey];
    return typeof label === "undefined" ? null : label;
  }

  return option;
}

/**
 * A function that will get the display value for the `Select` field based on
 * the current selected option. The default behavior will be to return null if
 * an option is not currently selected so the placeholder text can be shown
 * instead. If there is an option selected, it will:
 * - get the option's label using the general `getOptionLabel` util
 * - check if includeLeft is enabled and the option is an object with
 *   `leftAddon`
 *   - if there is a `leftAddon`, use the `TextIconSpacing` of
 *     the label + the icon or avatar.
 *
 * @param option - The option to get a display label for
 * @param labelKey - The key to use to extract a label from the option when it
 * is an object
 * @param includeLeft - Boolean if a `leftAddon` should be added with
 * `TextIconSpacing` to the result.
 * @returns A renderable node to display in a `Select` field.
 */
export function getDisplayLabel(
  option: ListboxOption,
  labelKey: string,
  includeLeft: boolean
): ReactNode {
  if (!option && option !== 0) {
    return null;
  }

  const label = getOptionLabel(option, labelKey);
  if (!includeLeft || !isListboxOptionProps(option)) {
    return label;
  }

  const { leftAddon } = option;

  return createElement(TextIconSpacing, { icon: leftAddon }, label);
}
