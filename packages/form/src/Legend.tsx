import type { TypographyProps } from "@react-md/core";
import { srOnly, Typography } from "@react-md/core";
import { cnb } from "cnbuilder";
import { forwardRef } from "react";

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
