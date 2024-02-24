import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement } from "react";
import { bem } from "../utils/bem.js";
import { type OptionProps } from "./Option.js";

const styles = bem("rmd-selected-option");

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface SelectedOptionProps extends HTMLAttributes<HTMLDivElement> {
  option: OptionProps | undefined;
  disableAddon: boolean;
}

/**
 * **Server Component**
 *
 * This component is used to render the current option.
 *
 * @remarks \@since 6.0.0
 * @internal
 */
export function SelectedOption(props: SelectedOptionProps): ReactElement {
  const { disableAddon, option, className, ...remaining } = props;

  let children = option?.children;
  // when the children are a string or number, wrap it in additional span so
  // that overflow can be ellipsis-ed
  if (typeof children === "string" || typeof children === "number") {
    children = <span className={styles("v")}>{children}</span>;
  }

  return (
    <div {...remaining} className={cnb(styles(), className)}>
      {!disableAddon && option?.leftAddon}
      {children}
    </div>
  );
}
