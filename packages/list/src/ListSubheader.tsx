import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

export interface ListSubheaderProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Boolean if the subheader should be inset to match the ListItem text keyline
   */
  inset?: boolean;
}

type WithRef = WithForwardedRef<HTMLLIElement>;
type DefaultProps = Required<Pick<ListSubheaderProps, "inset">>;
type WithDefaultProps = ListSubheaderProps & DefaultProps & WithRef;

const block = bem("rmd-list-subheader");

const ListSubheader: FC<ListSubheaderProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    inset,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <li
      {...props}
      className={cn(block({ inset }), className)}
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
