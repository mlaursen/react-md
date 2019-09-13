import React, { FC, forwardRef } from "react";
import cn from "classnames";
import { SimpleListItem, SimpleListItemProps } from "@react-md/list";
import { bem, WithForwardedRef } from "@react-md/utils";

export interface OptionProps extends SimpleListItemProps {
  /**
   * Boolean if the option is currently selected via aria-activedescendant
   * movement.
   */
  focused: boolean;

  /**
   * Boolean if the option's value is equal to the current listbox's value if
   * it is acting as a select component.
   */
  selected: boolean;
}

type WithRef = WithForwardedRef<HTMLLIElement>;
type DefaultProps = Required<Pick<OptionProps, "selected" | "textChildren">>;
type WithDefaultProps = OptionProps & DefaultProps & WithRef;

const block = bem("rmd-option");

/**
 * The Option component is a simple wrapper for the `SimpleListItem` that adds some required
 * a11y for behaving as the `option` role.
 */
const Option: FC<OptionProps & WithRef> = providedProps => {
  const {
    className,
    selected,
    focused,
    children,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <SimpleListItem
      {...props}
      clickable
      role="option"
      aria-selected={selected || undefined}
      ref={forwardedRef}
      className={cn(
        block({
          selected,
          focused,
        }),
        className
      )}
    >
      {children}
    </SimpleListItem>
  );
};

const defaultProps: DefaultProps = {
  selected: false,
  textChildren: true,
};

Option.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Option.displayName = "Option";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Option.propTypes = {
      className: PropTypes.string,
      focused: PropTypes.bool.isRequired,
      selected: PropTypes.bool,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      children: PropTypes.node,
      textChildren: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLLIElement, OptionProps>((props, ref) => (
  <Option {...props} forwardedRef={ref} />
));
