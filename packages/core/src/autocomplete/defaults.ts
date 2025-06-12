import { type MenuItemProps } from "../menu/MenuItem.js";
import { caseInsensitiveSearch } from "../searching/caseInsensitive.js";
import { defaultExtractor } from "../searching/utils.js";
import {
  type AutocompleteFilterOptions,
  type AutocompleteGetOptionPropsOptions,
  type AutocompleteOption,
} from "./types.js";

/**
 * @since 6.0.0
 * @since 6.2.0 Added support for `item.name` and provide better error messaging.
 * @internal
 */
export const defaultAutocompleteExtractor = defaultExtractor(
  "Autocomplete",
  "getOptionLabel"
);

/**
 * @since 6.0.0
 * @internal
 */
export const defaultAutocompleteFilter = <Option extends AutocompleteOption>(
  options: AutocompleteFilterOptions<Option>
): readonly Option[] => caseInsensitiveSearch({ ...options, startsWith: true });

/**
 * @since 6.0.0
 */
export const noopAutocompleteFilter = <Option extends AutocompleteOption>(
  options: AutocompleteFilterOptions<Option>
): readonly Option[] => options.list;

/**
 * @since 6.0.0
 * @internal
 */
const isProbablyMenuItemProps = (
  item: unknown
): item is Partial<MenuItemProps> => !!item && typeof item === "object";

/**
 * @since 6.0.0
 * @internal
 */
export const defaultAutocompleteGetOptionProps = <T extends AutocompleteOption>(
  options: AutocompleteGetOptionPropsOptions<T>
): Partial<MenuItemProps> | undefined => {
  const { option } = options;
  if (isProbablyMenuItemProps(option)) {
    const {
      leftAddon,
      rightAddon,
      className,
      children,
      disabled,
      height,
      textProps,
      textClassName,
      primaryText,
      secondaryText,
      secondaryTextClassName,
      multiline,
      disableTextChildren,
    } = option;

    return {
      children,
      leftAddon,
      rightAddon,
      className,
      disabled,
      height,
      textProps,
      textClassName,
      primaryText,
      secondaryText,
      secondaryTextClassName,
      multiline,
      disableTextChildren,
    };
  }
  return;
};
