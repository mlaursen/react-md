import { type ReactElement } from "react";

import { type HighlightTextComponentProps } from "./HighlightText.js";
import { Mark, type MarkProps } from "./Mark.js";

/**
 * @since 6.0.0
 */
export interface HighlightTextMarkProps
  extends HighlightTextComponentProps,
    Omit<MarkProps, "children"> {}

/**
 * This is the default implementation for the `HighlightText` component that
 * just omits the `match` prop from {@link HighlightTextComponentProps} and
 * passes the rest to the {@link Mark}.
 *
 * @since 6.0.0
 */
export function HighlightTextMark(
  props: Readonly<HighlightTextMarkProps>
): ReactElement {
  const { match: _match, ...remaining } = props;
  return <Mark {...remaining} />;
}
