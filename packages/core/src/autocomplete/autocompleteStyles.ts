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
  disableDropdownButton?: boolean;
}

/**
 * @since 6.0.0
 */
export function autocomplete(
  options: AutocompleteClassNameOptions = {}
): string {
  const { className, loading, disableDropdownButton } = options;

  return cnb(
    styles({
      // all other configurations must be set manually

      // right-addon-1: dropdown button only
      ra1: !loading && !disableDropdownButton,
      // right-addon-2: circular progress and dropdown button
      ra2: loading && !disableDropdownButton,
      // right-addon-3: circular progress only
      ra3: loading && disableDropdownButton,
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
