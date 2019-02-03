import React, {
  createElement,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
} from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

type ListElement = HTMLUListElement | HTMLOListElement;
export interface IListProps
  extends HTMLAttributes<ListElement>,
    IWithForwardedRef<ListElement> {
  /**
   * Boolean if the dense spec should be applied to the list.
   */
  dense?: boolean;

  /**
   * Boolean if the list's order is important. This will update the list to be rendered as
   * an `<ol>` instead of `<ul>`.
   */
  ordered?: boolean;

  /**
   * Boolean if the list should appear horizontally instead of vertically.
   */
  horizontal?: boolean;
}

export interface IListDefaultProps {
  dense: boolean;
  ordered: boolean;
  horizontal: boolean;
}

type ListWithDefaultProps = IListProps & IListDefaultProps;

/**
 * Creates an unordered or ordered list.
 */
const List: FunctionComponent<IListProps> = providedProps => {
  const {
    dense,
    horizontal,
    ordered,
    forwardedRef,
    className,
    children,
    ...props
  } = providedProps as ListWithDefaultProps;

  return createElement(
    ordered ? "ol" : "ul",
    {
      ...props,
      ref: forwardedRef,
      className: cn(
        "rmd-list",
        {
          "rmd-list--dense": dense,
          "rmd-list--horizontal": horizontal,
        },
        className
      ),
    },
    children
  );
};

const defaultProps: IListDefaultProps = {
  dense: false,
  horizontal: false,
  ordered: false,
};

List.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  // there's a problem with forwardedRef components that set the `displayName` to `undefined`
  List.displayName = "List";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    List.propTypes = {
      dense: PropTypes.bool,
      horizontal: PropTypes.bool,
      ordered: PropTypes.bool,
    };
  }
}

export default forwardRef<ListElement, IListProps>((props, ref) => (
  <List {...props} forwardedRef={ref} />
));
