import { cnb } from "cnbuilder";
import { forwardRef } from "react";

import { cssUtils } from "../cssUtils.js";
import { Typography, type TypographyProps } from "../typography/Typography.js";

/**
 * @since 6.0.0
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
 * @see {@link https://react-md.dev/components/fieldset | Fieldset Demos}
 * @since 6.0.0
 */
export const Legend = forwardRef<HTMLLegendElement, LegendProps>(
  function Legend(props, ref) {
    const { srOnly = false, className, children, ...remaining } = props;

    return (
      <Typography
        {...remaining}
        as="legend"
        ref={ref}
        className={cnb("rmd-legend", cssUtils({ srOnly }), className)}
      >
        {children}
      </Typography>
    );
  }
);
