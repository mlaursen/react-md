import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import { box } from "../box/styles.js";
import { bem } from "../utils/bem.js";
import { type ConfigurableTextFieldAddonProps } from "./types.js";

const styles = bem("rmd-text-field-addon");

/** @since 6.0.0 */
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
 * @since 6.0.0
 */
export function textFieldAddon(
  options: TextFieldAddonClassNameOptions = {}
): string {
  const { className, after, presentational } = options;

  return cnb(
    styles({
      before: !after,
      after,
      presentational,
    }),
    box({ disablePadding: true }),
    className
  );
}

/**
 * @since 6.0.0 Split props into `ConfigurableTextFieldAddonProps`
 */
export interface TextFieldAddonProps extends ConfigurableTextFieldAddonProps {
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
}

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
