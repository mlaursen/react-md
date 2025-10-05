import { forwardRef } from "react";

import { Typography, type TypographyProps } from "../typography/Typography.js";
import { type LegendClassNameOptions, legend } from "./legendStyles.js";

/**
 * @since 6.0.0
 * @since 6.4.0 Extends the `LegendClassNameOptions`
 */
export interface LegendProps extends TypographyProps, LegendClassNameOptions {}

/**
 * This should be used within a `Fieldset` to apply a label.
 *
 * @example Simple Example
 * ```tsx
 * <Fieldset>
 *   <Legend>I am legend</Legend>
 *   {children}
 * </Fieldset>
 * ```
 *
 * @example Visible to Screen readers only
 * ```tsx
 * <Fieldset>
 *   <Legend srOnly>I am legend</Legend>
 *   {children}
 * </Fieldset>
 * ```
 *
 * @example Acting as a floating label
 * ```tsx
 * <Fieldset floatingLegend>
 *   <Legend floating>I am legend</Legend>
 *   {children}
 * </Fieldset>
 * ```
 *
 * @see {@link https://react-md.dev/components/fieldset | Fieldset Demos}
 * @since 6.0.0
 */
export const Legend = forwardRef<HTMLLegendElement, LegendProps>(
  function Legend(props, ref) {
    const {
      srOnly,
      floating,
      theme,
      gap,
      dense,
      active,
      error,
      disabled,
      stacked,
      reversed,
      className,
      children,
      ...remaining
    } = props;

    return (
      <Typography
        {...remaining}
        as="legend"
        ref={ref}
        className={legend({
          srOnly,
          floating,
          theme,
          gap,
          dense,
          active,
          error,
          disabled,
          stacked,
          reversed,
          className,
        })}
      >
        {children}
      </Typography>
    );
  }
);
