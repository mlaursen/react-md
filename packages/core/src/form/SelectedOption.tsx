import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";

import { Box, type BoxProps } from "../box/Box.js";
import { cssUtils } from "../cssUtils.js";
import { type OptionProps } from "./Option.js";
import { textField } from "./textFieldStyles.js";

/**
 * @since 6.0.0
 * @internal
 */
export interface SelectedOptionProps extends BoxProps {
  option: OptionProps | undefined;
  placeholder?: ReactNode;
  disableAddon: boolean;
}

/**
 * This component is used to render the current option.
 *
 * @since 6.0.0
 * @internal
 */
export function SelectedOption(props: SelectedOptionProps): ReactElement {
  const {
    disableAddon,
    option,
    className,
    disableWrap = true,
    disablePadding = true,
    placeholder,
    ...remaining
  } = props;

  let children = remaining.children ?? (option?.children || placeholder);
  // when the children are a string or number, wrap it in additional span so
  // that overflow can be ellipsis-ed
  if (typeof children === "string" || typeof children === "number") {
    children = (
      <span className={cssUtils({ textOverflow: "ellipsis" })}>{children}</span>
    );
  }

  return (
    <Box
      {...remaining}
      className={cnb("rmd-selected-option", textField(), className)}
      disableWrap={disableWrap}
      disablePadding={disablePadding}
    >
      {!disableAddon && option?.leftAddon}
      {children}
    </Box>
  );
}
