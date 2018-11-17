import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface IListItemTextProps {
  className?: string;
  secondaryTextClassName?: string;
  children: React.ReactNode;
  secondaryText?: React.ReactNode;
}

export default class ListItemText extends React.Component<IListItemTextProps> {
  public static propTypes = {
    className: PropTypes.string,
    secondaryTextClassName: PropTypes.string,
    children: PropTypes.node.isRequired,
    secondaryText: PropTypes.node,
  };

  public render() {
    const { className, secondaryTextClassName, children, secondaryText } = this.props;

    let content;
    if (secondaryText) {
      content = (
        <span className={cn("rmd-list-item__secondary-text", secondaryTextClassName)}>
          {secondaryText}
        </span>
      );
    }

    return (
      <span className={cn("rmd-list-item__text", className)}>
        {children}
        {content}
      </span>
    );
  }
}
