"use client";
import { type MouseEventHandler, type ReactElement } from "react";
import { Button, type ButtonProps } from "../button/Button.js";
import { getIcon } from "../icon/iconConfig.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { autocompleteClearButton } from "./autocompleteStyles.js";

/**
 * @since 6.0.0
 */
export interface ConfigurableAutocompleteClearButtonProps extends ButtonProps {
  /** @defaultValue `"Clear"` */
  "aria-label"?: string;

  /** @defaultValue `"autocomplete-clear-" + useId()` */
  id?: string;
}

/**
 * @internal
 * @since 6.0.0
 */
export interface AutocompleteClearButtonProps
  extends ConfigurableAutocompleteClearButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * An internal component used for to clear the value from the `Autocomplete`.
 *
 * @internal
 * @since 6.0.0
 */
export function AutocompleteClearButton(
  props: AutocompleteClearButtonProps
): ReactElement {
  const {
    id: propId,
    className,
    children,
    buttonType = "icon",
    "aria-labelledby": ariaLabelledBy,
    "aria-label": ariaLabel = buttonType === "text" || ariaLabelledBy
      ? undefined
      : "Clear",
    ...remaining
  } = props;
  const id = useEnsuredId(propId, "autocomplete-clear");

  return (
    <Button
      {...remaining}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      id={id}
      className={autocompleteClearButton({ className })}
      tabIndex={-1}
      buttonType={buttonType}
    >
      {getIcon("clear", children)}
    </Button>
  );
}
