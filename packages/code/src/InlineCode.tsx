import { bem } from "@react-md/core/utils/bem";
import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement } from "react";

const styles = bem("inline-code");

export interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
  as?: "kbd" | "code";
  disableTicks?: boolean;
}

/**
 * This is used to render inline code that is surrounded by backticks.
 */
export function InlineCode(props: InlineCodeProps): ReactElement {
  const {
    as: Component = "code",
    className,
    disableTicks,
    ...remaining
  } = props;

  return (
    <Component
      {...remaining}
      className={cnb(styles({ ticked: !disableTicks }), className)}
    />
  );
}
