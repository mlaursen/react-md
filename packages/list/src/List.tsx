import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export type ListElement = HTMLUListElement | HTMLOListElement;

export interface IListProps extends React.HTMLAttributes<ListElement> {
  /**
   * An optional className to apply.
   */
  className?: string;

  /**
   * Boolean if the "dense" spec should be applied to the list. this will just reduce
   * the vertical padding a bit by default.
   */
  dense?: boolean;

  /**
   * Boolean if the list has a specific order. This will update the list to be
   * rendered as a `<ol>` instead of `<ul>`.
   */
  ordered?: boolean;

  /**
   * Boolean if the list should be positioned inline (horizontally) instead of vertically.
   */
  inline?: boolean;

  /**
   * The children to render within the list. This should normally be the `ListItem` component, but
   * it can also be links or any other element.
   */
  children?: React.ReactNode;
}

export interface IListDefaultProps {
  role: "list";
  dense: boolean;
  inline: boolean;
  ordered: boolean;
}

export type ListWithDefaultProps = IListProps & IListDefaultProps;

const List: React.SFC<IListProps> = props => {
  const { className, dense, inline, ordered, children, ...remaining } = props as ListWithDefaultProps;
  return React.createElement(
    ordered ? "ol" : "ul",
    {
      ...remaining,
      className: cn(
        "rmd-list",
        {
          "rmd-list--dense": dense,
          "rmd-list--inline": inline,
        },
        className
      ),
    },
    children
  );
};

List.defaultProps = {
  role: "list",
  dense: false,
  inline: false,
  ordered: false,
} as IListDefaultProps;

export default List;
