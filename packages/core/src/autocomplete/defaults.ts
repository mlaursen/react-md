import { type MenuItemProps } from "../menu/MenuItem.js";
import { caseInsensitiveSearch } from "../searching/caseInsensitive.js";
import { defaultExtractor } from "../searching/utils.js";
import { type AutocompleteFilterOptions } from "./types.js";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const defaultAutocompleteExtractor = <T>(item: T): string => {
  if (
    item &&
    typeof item === "object" &&
    "label" in item &&
    typeof item.label === "string"
  ) {
    return item.label;
  }

  return defaultExtractor("Autocomplete")(item);
};

/**
 * @remarks \@since 6.0.0
 * @internal
 */
const isProbablyMenuItemProps = (
  item: unknown
): item is Partial<MenuItemProps> => !!item && typeof item === "object";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const defaultAutocompleteOptionProps = <T>(options: {
  option: T;
}): Partial<MenuItemProps> | undefined => {
  const { option } = options;
  if (isProbablyMenuItemProps(option)) {
    const {
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
    } = option;

    return {
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

/**
 * This is just the {@link caseInsensitiveSearch} but requires
 * the options to start with the current query.
 *
 * @since 6.0.0
 */
export function defaultAutocompleteFilter<T>(
  options: AutocompleteFilterOptions<T>
): readonly T[] {
  return caseInsensitiveSearch({ ...options, startsWith: true });
}
