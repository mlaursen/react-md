import { forwardRef } from "react";

import { textFieldAddon } from "./textFieldAddonStyles.js";
import { type TextFieldAddonProps } from "./types.js";

/**
 * This component is used to add an icon before or after the text field with
 * correct styling.
 */
export const TextFieldAddon = forwardRef<HTMLSpanElement, TextFieldAddonProps>(
  function TextFieldAddon(props, ref) {
    const {
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
);
