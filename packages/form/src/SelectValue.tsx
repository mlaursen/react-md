import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import type { OptionProps } from "./Option";

const styles = bem("rmd-select-value");

/**
 * @remarks \@since 6.0.0
 */
export interface SelectValueProps extends Partial<OptionProps> {
  disableAddon: boolean;
}

/**
 * This component is used to render the current option.
 *
 * @remarks \@since 6.0.0
 * @internal
 */
export function SelectValue(props: SelectValueProps): ReactElement {
  const { leftAddon, disableAddon, children: propChildren } = props;

  let children = propChildren;
  // when the children are a string or number, wrap it in additional span so
  // that overflow can be ellipsis-ed
  if (typeof children === "string" || typeof children === "number") {
    children = <span className={styles("v")}>{children}</span>;
  }

  return (
    <div className={cnb(styles())}>
      {!disableAddon && leftAddon}
      {children}
    </div>
  );
}
