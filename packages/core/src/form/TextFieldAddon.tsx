import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { bem } from "../utils/bem";

const styles = bem("rmd-text-field-addon");

/** @remarks \@since 6.0.0 */
export interface TextFieldAddonClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  after?: boolean;

  /**
   *
   * @defaultValue `true`
   */
  presentational?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function textFieldAddon(
  options: TextFieldAddonClassNameOptions = {}
): string {
  const { className, after = false, presentational = false } = options;

  return cnb(
    styles({
      before: !after,
      after,
      presentational,
    }),
    className
  );
}

export interface TextFieldAddonProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * @defaultValue `false`
   */
  after?: boolean;

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
 * **Client Component**
 *
 * This component is used to add an an icon before or after the text field with
 * correct styling.
 */
export const TextFieldAddon = forwardRef<HTMLSpanElement, TextFieldAddonProps>(
  function TextFieldAddon(props, ref) {
    const {
      after = false,
      children,
      className,
      disabled = false,
      pointerEvents = false,
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
