"use client";
import { useMemo, type ReactElement, type RefObject } from "react";
import {
  triggerManualChangeEvent,
  type EditableHTMLElement,
} from "../form/utils.js";
import { ListSubheader } from "../list/ListSubheader.js";
import { MenuItem } from "../menu/MenuItem.js";
import {
  defaultAutocompleteExtractor,
  defaultAutocompleteFilter,
  defaultAutocompleteOptionProps,
} from "./defaults.js";
import { type AutocompleteOptionsProps } from "./types.js";

const noop = (): void => {
  // do nothing
};

export interface FilterAutocompleteOptionsProps<T>
  extends AutocompleteOptionsProps<T> {
  query: string;
  comboboxRef: RefObject<EditableHTMLElement>;
}

export function FilterAutocompleteOptions<T>(
  props: FilterAutocompleteOptionsProps<T>
): ReactElement {
  const {
    query,
    filter = defaultAutocompleteFilter,
    options,
    extractor = defaultAutocompleteExtractor,
    whitespace = "keep",
    comboboxRef,
    disableFilter,
    onAutocomplete = noop,
    getOptionProps = defaultAutocompleteOptionProps,
    clearOnAutocomplete,
    noOptionsChildren = <ListSubheader>No Options</ListSubheader>,
  } = props;
  const filtered = useMemo(() => {
    if (disableFilter) {
      return options;
    }

    return filter({
      list: options,
      query,
      extractor,
      whitespace,
    });
  }, [disableFilter, extractor, filter, options, query, whitespace]);

  return (
    <>
      {!filtered.length && noOptionsChildren}
      {filtered.map((option, index) => {
        const label = extractor(option);
        const optionProps = getOptionProps({
          index,
          option,
        });

        return (
          <MenuItem
            key={label}
            role="option"
            {...optionProps}
            onClick={(event) => {
              optionProps?.onClick?.(event);

              triggerManualChangeEvent(
                comboboxRef.current,
                clearOnAutocomplete ? "" : label
              );
              onAutocomplete(option);
            }}
          >
            {optionProps?.children ?? label}
          </MenuItem>
        );
      })}
    </>
  );
}
