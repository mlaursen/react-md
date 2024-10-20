import { cnb } from "cnbuilder";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-autocomplete");

/**
 * @since 6.0.0
 */
export interface AutocompleteClassNameOptions {
  className?: string;

  loading?: boolean;
  disableClearButton?: boolean;
  disableDropdownButton?: boolean;
}

/**
 * @since 6.0.0
 */
export function autocomplete(
  options: AutocompleteClassNameOptions = {}
): string {
  const { className, loading, disableClearButton, disableDropdownButton } =
    options;

  return cnb(
    styles({
      cb: !disableClearButton,
      db: !disableDropdownButton,
      cp: loading,
    }),
    className
  );
}

/**
 * @since 6.0.0
 */
export interface AutocompleteRightAddonClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function autocompleteRightAddon(
  options: AutocompleteRightAddonClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(
    styles("right-addon"),
    cssUtils({ backgroundColor: "current-color" }),
    className
  );
}
/**
 * @since 6.0.0
 */
export interface AutocompleteDropdownButtonClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function autocompleteDropdownButton(
  options: AutocompleteDropdownButtonClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("dropdown-button"), className);
}

/**
 * @since 6.0.0
 */
export interface AutocompleteClearButtonClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function autocompleteClearButton(
  options: AutocompleteClearButtonClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("clear-button"), className);
}
