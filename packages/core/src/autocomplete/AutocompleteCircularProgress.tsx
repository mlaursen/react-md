import { type ReactElement } from "react";
import {
  CircularProgress,
  type CircularProgressProps,
} from "../progress/CircularProgress.js";
import { type ProgressTheme } from "../progress/types.js";

/**
 * @since 6.0.0
 */
export interface AutocompleteCircularProgressProps
  extends CircularProgressProps {
  /** @defaultValue `"Loading"` */
  "aria-label"?: string;

  /** @defaultValue `"current-color"` */
  theme?: ProgressTheme;
}

/**
 * An internal component used to handle the styling and minimal accessibility
 * for the `CircularProgress` within the `Autocomplete`
 *
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
