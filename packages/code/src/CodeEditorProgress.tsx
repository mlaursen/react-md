import {
  LinearProgress,
  type LinearProgressProps,
} from "@react-md/core/progress/LinearProgress";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

export type CodeEditorProgressProps = LinearProgressProps;

export function CodeEditorProgress(
  props: CodeEditorProgressProps
): ReactElement {
  const {
    className,
    "aria-label": ariaLabel = "Loading",
    theme = "current-color",
    ...remaining
  } = props;

  return (
    <LinearProgress
      {...remaining}
      aria-label={ariaLabel}
      theme={theme}
      className={cnb("code-editor__progress", className)}
    />
  );
}
