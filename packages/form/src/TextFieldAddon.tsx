import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/core";

const styles = bem("rmd-text-field-addon");

export interface TextFieldAddonClassNameOptions {
  className?: string;
  /**
   *
   * @defaultValue `true`
   */
  presentational?: boolean;
}

export function textFieldAddon(
  options: TextFieldAddonClassNameOptions = {}
): string {
  const { className, presentational = false } = options;

  return cnb(styles({ presentational }), className);
}

export interface TextFieldAddonProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Set this to `true` if the addon should not be wrapped in a `<span>` with some
   * additional styles.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Boolean if the addon should be presentational only and prevent pointer
   * events.
   *
   * @defaultValue `false`
   */
  pointerEvents?: boolean;
}

/**
 * This component is used to add an an icon before or after the text field with
 * correct styling.
 */
export const TextFieldAddon = forwardRef<HTMLSpanElement, TextFieldAddonProps>(
  function TextFieldAddon(props, ref) {
    const {
      children,
      className,
      disabled = false,
      pointerEvents = false,
      ...remaining
    } = props;

    if (!children || disabled) {
      return null;
    }

    return (
      <span
        {...remaining}
        ref={ref}
        className={textFieldAddon({
          presentational: !pointerEvents,
          className,
        })}
      >
        {children}
      </span>
    );
  }
);
