import React, { forwardRef, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
import { SimpleListItem, SimpleListItemProps } from "@react-md/list";
import { bem } from "@react-md/utils";

export interface OptionProps extends SimpleListItemProps {
  /**
   * Boolean if the option is currently selected via aria-activedescendant
   * movement.
   */
  focused: boolean;

  /**
   * Boolean if the option's value is equal to the current listbox's value if it
   * is acting as a select component.
   */
  selected: boolean;
}

const block = bem("rmd-option");

/**
 * The Option component is a simple wrapper for the `SimpleListItem` that adds
 * some required a11y for behaving as the `option` role.
 */
function Option(
  {
    className,
    selected = false,
    focused,
    children,
    textChildren = true,
    ...props
  }: OptionProps,
  ref?: Ref<HTMLLIElement>
): ReactElement {
  return (
    <SimpleListItem
      {...props}
      ref={ref}
      role="option"
      aria-selected={selected || undefined}
      clickable
      className={cnb(
        block({
          selected,
          focused,
        }),
        className
      )}
      textChildren={textChildren}
    >
      {children}
    </SimpleListItem>
  );
}

const ForwardedOption = forwardRef<HTMLLIElement, OptionProps>(Option);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedOption.propTypes = {
      className: PropTypes.string,
      focused: PropTypes.bool.isRequired,
      selected: PropTypes.bool,
      children: PropTypes.node,
      textChildren: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedOption;
