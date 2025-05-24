import { type ReactElement } from "react";

import { CircularProgress } from "../progress/CircularProgress.js";
import { type AutocompleteCircularProgressProps } from "./types.js";

/**
 * An internal component used to handle the styling and minimal accessibility
 * for the `CircularProgress` within the `Autocomplete`
 *
 * @see {@link https://react-md.dev/components/autocomplete | Autocomplete Demos}
 * @internal
 * @since 6.0.0
 */
export function AutocompleteCircularProgress(
  props: AutocompleteCircularProgressProps
): ReactElement {
  const {
    "aria-labelledby": ariaLabelledby,
    "aria-label": ariaLabel = ariaLabelledby ? undefined : "Loading",
    theme = "current-color",
    ...remaining
  } = props;

  return (
    <CircularProgress
      {...remaining}
      aria-label={ariaLabel as string}
      aria-labelledby={ariaLabelledby}
      theme={theme}
    />
  );
}
