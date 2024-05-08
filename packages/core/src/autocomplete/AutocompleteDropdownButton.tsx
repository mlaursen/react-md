"use client";
import {
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from "react";
import { Button, type ButtonProps } from "../button/Button.js";
import { IconRotator, type IconRotatorProps } from "../icon/IconRotator.js";
import { getIcon } from "../icon/iconConfig.js";
import { useEnsuredId } from "../useEnsuredId.js";

/**
 * @since 6.0.0
 */
export interface ConfigurableAutocompleteDropdownButtonProps
  extends ButtonProps {
  /** @defaultValue `AutocompleteProps.menuLabel` */
  "aria-label"?: string;
  /** @defaultValue `AutocompleteProps.menuLabelledby` */
  "aria-labelledby"?: string;

  /** @defaultValue `"autocomplete-dropdown-" + useId()` */
  id?: string;

  /** @defaultValue `getIcon("dropdown")` */
  icon?: ReactNode;
  iconRotatorProps?: Omit<IconRotatorProps, "rotated">;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteDropdownButtonProps
  extends ConfigurableAutocompleteDropdownButtonProps {
  "aria-controls": string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  visible: boolean;
}

/**
 * This is a simple `Button` wrapper to be used as a dropdown button within the
 * `Autocomplete`.
 *
 * @since 6.0.0
 */
export function AutocompleteDropdownButton(
  props: AutocompleteDropdownButtonProps
): ReactElement {
  const { id: propId, icon, visible, iconRotatorProps, ...remaining } = props;

  const id = useEnsuredId(propId, "autocomplete-dropdown");

  return (
    <Button
      {...remaining}
      id={id}
      aria-expanded={visible}
      tabIndex={-1}
      buttonType="icon"
    >
      <IconRotator {...iconRotatorProps} rotated={visible}>
        {getIcon("dropdown", icon)}
      </IconRotator>
    </Button>
  );
}
