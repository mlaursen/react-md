import { forwardRef } from "react";

import type { SrOnlyClassNameOptions } from "./styles";
import { getSrOnlyClassName } from "./styles";
import type {
  CustomTypographyComponent,
  TypographyHTMLElement,
  TypographyProps,
} from "./Typography";
import { Typography } from "./Typography";

export interface SrOnlyProps extends TypographyProps, SrOnlyClassNameOptions {
  /** @defaultValue `"span"` */
  as?: CustomTypographyComponent;
}

export const SrOnly = forwardRef<TypographyHTMLElement, SrOnlyProps>(
  function SrOnly(props, ref) {
    const {
      as = "span",
      className,
      focusable,
      children,
      tabIndex,
      ...remaining
    } = props;

    return (
      <Typography
        {...remaining}
        as={as}
        ref={ref}
        tabIndex={tabIndex ?? (focusable ? 0 : undefined)}
        className={getSrOnlyClassName({ focusable, className })}
      >
        {children}
      </Typography>
    );
  }
);
