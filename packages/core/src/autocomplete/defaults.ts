import { type MenuItemProps } from "../menu/MenuItem.js";
import { defaultExtractor } from "../searching/utils.js";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const defaultAutocompleteExtractor =
  <T>(name: string) =>
  (item: T): string => {
    if (
      item &&
      typeof item === "object" &&
      "label" in item &&
      typeof item.label === "string"
    ) {
      return item.label;
    }

    return defaultExtractor(name)(item);
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
