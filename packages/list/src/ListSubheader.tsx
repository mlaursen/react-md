import React, { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

export interface IListSubheaderProps
  extends HTMLAttributes<HTMLLIElement>,
    IWithForwardedRef<HTMLLIElement> {
  /**
   * Boolean if the subheader should be inset to match the ListItem text keyline
   */
  inset?: boolean;
}

interface IListSubheaderDefaultProps {
  inset: boolean;
}

type ListSubheaderWithDefaultProps = IListSubheaderProps &
  IListSubheaderDefaultProps;

const ListSubheader: FunctionComponent<IListSubheaderProps> = providedProps => {
  const {
    className,
    forwardedRef,
    inset,
    ...props
  } = providedProps as ListSubheaderWithDefaultProps;

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

const defaultProps: IListSubheaderDefaultProps = {
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
export default forwardRef<HTMLLIElement, IListSubheaderProps>((props, ref) => (
  <ListSubheader {...props} forwardedRef={ref} />
));
