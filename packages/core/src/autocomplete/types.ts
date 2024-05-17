import { type ReactNode } from "react";
import { type MenuItemProps } from "../menu/MenuItem.jsx";
import {
  type BaseSearchOptions,
  type WhitespaceFilter,
} from "../searching/types.js";
import { type RequireAtLeastOne, type TextExtractor } from "../types.js";

/**
 * @since 6.0.0
 */
export type AutocompleteMenuLabel<
  T extends { menuLabel?: string; menuLabelledBy?: string },
> = RequireAtLeastOne<T, "menuLabel" | "menuLabelledBy">;

/**
 * @since 6.0.0
 */
export type AutocompleteFilterOptions<T> = Pick<
  Required<BaseSearchOptions<T>>,
  "list" | "query" | "extractor" | "whitespace"
>;

/**
 * @since 6.0.0
 */
export interface AutocompleteGetOptionPropsOptions<T> {
  index: number;
  option: T;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteOptionsProps<T> {
  /**
   * This list of options to display and will be filtered based on the current
   * value in the text box unless {@link disableFilter} is `true`.
   *
   * When this is not a list of strings or a list of objects with a
   * `{ label: string }`, the {@link extractor} is required to pull a searchable
   * string from each option.
   */
  options: readonly T[];

  /**
   * This controls how the {@link options} are filtered based on the current
   * value in the text box.
   *
   * @example Fuzzy Search
   * ```tsx
   * import { fuzzySearch } from "@react-md/core/searching/fuzzy";
   *
   * <Autocomplete
   *   {...props}
   *   filter={fuzzySearch}
   * />
   * ```
   *
   * @defaultValue `caseInsensitiveSearch`
   */
  filter?(options: AutocompleteFilterOptions<T>): readonly T[];

  /**
   * @example
   * ```tsx
   * <Autocomplete
   *   options={[{ children: "Apple" }, { children = "Banana" }]}
   *   extractor={(option) => option.children}
   *   {...props}
   * />
   * ```
   */
  extractor?: TextExtractor<T>;

  /**
   * This can be used to add additional props to each option.
   *
   * @example Simple Example
   * ```tsx
   * getOptionProps={({ option }) => {
   *   return {
   *     disabled: option === "",
   *     className: cnb(option === "a" && styles.blue),
   *     leftAddon: option === value && <CheckIcon />,
   *   };
   * }}
   * ```
   */
  getOptionProps?(
    options: AutocompleteGetOptionPropsOptions<T>
  ): Partial<MenuItemProps> | undefined;

  /**
   * The children to display when there are no {@link options} due to the
   * current text box value.
   *
   * @defaultValue `<ListSubheader>No options</ListSubheader`
   */
  noOptionsChildren?: ReactNode;

  /**
   * This will be called whenever one of the options are selected or reset.
   */
  onAutocomplete?(option: T | null): void;

  /**
   * @defaultValue `false`
   */
  clearOnAutocomplete?: boolean;

  /**
   * Set this to `true` to disable the built-in filtering of the
   * {@link options}. This will always be `true` if `aria-autocomplete="none"`.
   *
   * @defaultValue `false`
   */
  disableFilter?: boolean;

  /** @defaultValue `"keep"` */
  whitespace?: WhitespaceFilter;
}
