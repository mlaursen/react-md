import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { StatesConsumer } from "@react-md/states";
import { IListItemBaseProps } from "./ListItem";
import ListItemLeftIcon from "./ListItemLeftIcon";
import ListItemRightIcon from "./ListItemRightIcon";

export interface IListLinkBaseProps extends IListItemBaseProps {
  style?: React.CSSProperties;
  className?: string;
  liStyle?: React.CSSProperties;
  liClassName?: string;
  href?: string;
  disabled?: boolean;
  role?: string;
  liRole?: string;
  // basically React.ReactType, but only allowing "a" instead of any string
  component?: "a" | React.ComponentType<any> | React.StatelessComponent<any>;
  children?: React.ReactNode;

  onMouseDown?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLAnchorElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLAnchorElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
}

export interface IListLinkWithComponentProps extends IListLinkBaseProps {
  [key: string]: any;
  component: React.ComponentType<any> | React.StatelessComponent<any>;
}

export interface IListLinkWithAnchorProps extends IListLinkBaseProps, React.HTMLAttributes<HTMLAnchorElement> {
  component: "a";
  href: "string";
}

export interface IListLinkDefaultProps {
  component: "a";
  forceIconWrap: boolean;
}

export type ListLinkWithDefaultProps = IListLinkProps & IListLinkDefaultProps;

export type IListLinkProps = IListLinkBaseProps | IListLinkWithComponentProps;

const ListLink: React.SFC<IListLinkProps> = baseProps => {
  const {
    className,
    liStyle,
    liClassName,
    liRole,
    leftIcon,
    rightIcon,
    children: propChildren,
    forceIconWrap,
    component: Link,
    href,
    disabled: propDisabled,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onKeyUp,
    onKeyDown,
    ...props
  } = baseProps as ListLinkWithDefaultProps;

  let children = propChildren;
  children = (
    <ListItemLeftIcon icon={leftIcon} forceIconWrap={forceIconWrap}>
      {children}
    </ListItemLeftIcon>
  );

  children = (
    <ListItemRightIcon icon={rightIcon} forceIconWrap={forceIconWrap}>
      {children}
    </ListItemRightIcon>
  );

  let disabled = propDisabled;
  if (typeof disabled !== "boolean") {
    disabled = typeof href === "string" && !href;
  }

  return (
    <li role={liRole} style={liStyle} className={cn("rmd-list-link-item", liClassName)}>
      <StatesConsumer
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        disabled={disabled}
        pressable={!disabled}
        className={cn(
          "rmd-list-link",
          {
            "rmd-list-item--medium": !!(leftIcon || rightIcon),
            "rmd-list-item--stateful": !disabled,
          },
          className
        )}
      >
        {({ disabled: stateDisabled, ...statesProps }) =>
          React.createElement(
            Link,
            {
              ...props,
              ...statesProps,
            },
            children
          )
        }
      </StatesConsumer>
    </li>
  );
};

ListLink.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  linkStyle: PropTypes.object,
  linkClassName: PropTypes.string,
  role: PropTypes.string,
  linkRole: PropTypes.string,
  leftIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  rightIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  forceIconWrap: PropTypes.bool,
};

ListLink.defaultProps = {
  component: "a",
  forceIconWrap: false,
} as IListLinkDefaultProps;

export default ListLink;
