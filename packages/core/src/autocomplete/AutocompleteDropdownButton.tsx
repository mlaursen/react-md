"use client";

import { type ReactElement } from "react";

import { Button } from "../button/Button.js";
import { IconRotator } from "../icon/IconRotator.js";
import { getIcon } from "../icon/config.js";
import { type LabelRequiredForA11y } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { autocompleteDropdownButton } from "./autocompleteStyles.js";
import { type AutocompleteDropdownButtonProps } from "./types.js";

/**
 * This is a simple `Button` wrapper to be used as a dropdown button within the
 * `Autocomplete`.
 *
 * @since 6.0.0
 */
export function AutocompleteDropdownButton(
  props: LabelRequiredForA11y<AutocompleteDropdownButtonProps>
): ReactElement {
  const {
    id: propId,
    icon,
    visible,
    iconRotatorProps,
    className,
    ...remaining
  } = props;

  const id = useEnsuredId(propId, "autocomplete-dropdown");

  return (
    <Button
      {...remaining}
      id={id}
      aria-expanded={visible}
      tabIndex={-1}
      buttonType="icon"
      className={autocompleteDropdownButton({ className })}
    >
      <IconRotator {...iconRotatorProps} rotated={visible}>
        {getIcon("dropdown", icon)}
      </IconRotator>
    </Button>
  );
}
