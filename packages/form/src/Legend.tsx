import type { TypographyProps } from "@react-md/core";
import { srOnly, Typography } from "@react-md/core";
import { cnb } from "cnbuilder";
import { forwardRef } from "react";

export interface LegendProps extends TypographyProps {
  /**
   * @defaultValue `false`
   */
  srOnly?: boolean;
}

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
