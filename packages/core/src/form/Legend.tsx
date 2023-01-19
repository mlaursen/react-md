import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import type { TypographyProps } from "../typography";
import { srOnly, Typography } from "../typography";

/**
 * @remarks \@since 6.0.0
 */
export interface LegendProps extends TypographyProps {
  /**
   * @defaultValue `false`
   */
  srOnly?: boolean;
}

/**
 * This should be used within a `Fieldset` to apply a label.
 *
 * @remarks \@since 6.0.0
 */
export const Legend = forwardRef<HTMLLegendElement, LegendProps>(
  function Legend(props, ref) {
    const {
      srOnly: isSrOnly = false,
      className,
      children,
      ...remaining
    } = props;

    return (
      <Typography
        {...remaining}
        as="legend"
        ref={ref}
        className={cnb("rmd-legend", isSrOnly && srOnly(), className)}
      >
        {children}
      </Typography>
    );
  }
);
