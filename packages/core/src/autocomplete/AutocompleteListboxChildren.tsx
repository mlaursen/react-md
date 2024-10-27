import { type ReactElement, type ReactNode } from "react";
import { Option } from "../form/Option.js";
import {
  type AutocompleteGetOptionLabel,
  type AutocompleteGetOptionProps,
  type AutocompleteOption,
} from "./types.js";

/**
 * @since 6.0.0
 * @internal
 */
export interface AutocompleteListboxChildrenProps<
  Option extends AutocompleteOption,
> {
  query: string;
  options: readonly Option[];
  getOptionLabel: AutocompleteGetOptionLabel<Option>;
  getOptionProps: AutocompleteGetOptionProps<Option>;
  children: ReactNode;
  noOptionsChildren: ReactNode;
}

/**
 * NOTE: This was moved to a second component to improve performance so
 * that the availableOptions aren't looped until the listbox is visible
 *
 * @since 6.0.0
 * @internal
 */
export function AutocompleteListboxChildren<Option extends AutocompleteOption>(
  props: AutocompleteListboxChildrenProps<Option>
): ReactElement {
  const {
    children,
    query,
    options: availableOptions,
    noOptionsChildren,
    getOptionLabel,
    getOptionProps,
  } = props;

  return (
    <>
      {children}
      {!availableOptions.length && noOptionsChildren}
      {availableOptions.map((option, index) => {
        const label = getOptionLabel(option);
        const optionProps = getOptionProps({
          query,
          index,
          option,
        });

        return (
          <Option key={label} value={option} {...optionProps}>
            {optionProps?.children ?? label}
          </Option>
        );
      })}
    </>
  );
}
