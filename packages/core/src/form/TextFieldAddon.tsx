import { type ReactElement } from "react";

import { textFieldAddon } from "./textFieldAddonStyles.js";
import { type TextFieldAddonProps } from "./types.js";

/**
 * This component is used to add an icon before or after the text field with
 * correct styling.
 */
export function TextFieldAddon(
  props: TextFieldAddonProps
): ReactElement | null {
  const {
    ref,
    after,
    disabled,
    pointerEvents,
    children,
    className,
    ...remaining
  } = props;

  if (!children) {
    return null;
  }

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <span
      {...remaining}
      ref={ref}
      className={textFieldAddon({
        after,
        presentational: !pointerEvents,
        className,
      })}
    >
      {children}
    </span>
  );
}
