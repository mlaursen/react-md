"use client";

import { type ReactElement } from "react";

import { Button } from "../button/Button.js";
import { getIcon } from "../icon/config.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { autocompleteClearButton } from "./autocompleteStyles.js";
import { type AutocompleteClearButtonProps } from "./types.js";

/**
 * An internal component used for to clear the value from the `Autocomplete`.
 *
 * @see {@link https://react-md.dev/components/autocomplete | Autocomplete Demos}
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
    visibility,
    ...remaining
  } = props;
  const id = useEnsuredId(propId, "autocomplete-clear");

  return (
    <Button
      {...remaining}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      id={id}
      className={autocompleteClearButton({ className, visibility })}
      tabIndex={-1}
      buttonType={buttonType}
    >
      {getIcon("clear", children)}
    </Button>
  );
}
