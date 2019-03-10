import React, { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export interface ListSubheaderProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Boolean if the subheader should be inset to match the ListItem text keyline
   */
  inset?: boolean;
}

type WithRef = WithForwardedRef<HTMLLIElement>;
type DefaultProps = Required<Pick<ListSubheaderProps, "inset">>;
type WithDefaultProps = ListSubheaderProps & DefaultProps & WithRef;

const ListSubheader: FunctionComponent<
  ListSubheaderProps & WithRef
> = providedProps => {
  const {
    className,
    forwardedRef,
    inset,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <li
      {...props}
      className={cn(
        "rmd-list-subheader",
        {
          "rmd-list-subheader--inset": inset,
        },
        className
      )}
      ref={forwardedRef}
    />
  );
};

const defaultProps: DefaultProps = {
  inset: false,
};

ListSubheader.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  ListSubheader.displayName = "ListSubheader";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    ListSubheader.propTypes = {
      className: PropTypes.string,
      inset: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}
export default forwardRef<HTMLLIElement, ListSubheaderProps>((props, ref) => (
  <ListSubheader {...props} forwardedRef={ref} />
));
