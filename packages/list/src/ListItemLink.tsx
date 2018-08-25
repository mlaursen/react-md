import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { StatesConsumer } from "@react-md/states";
import { IListItemBaseProps } from "./ListItem";
import ListItemLeftIcon from "./ListItemLeftIcon";
import ListItemRightIcon from "./ListItemRightIcon";

export interface IListItemLinkBaseProps extends IListItemBaseProps {
  /**
   * An optional style to apply to the `<a>` element.
   *
   * @docgen
   */
  style?: React.CSSProperties;

  /**
   * An optional class name to apply to the `<a>` element.
   *
   * @docgen
   */
  className?: string;

  /**
   * An optional style to apply to the surrounding `<li>` element. It is generally recommended
   * to not add styles to the `<li>` element but instead use the default `style` prop.
   *
   * @docgen
   */
  liStyle?: React.CSSProperties;

  /**
   * An optional className to apply to the surrounding `<li>` element. It is generally recommended
   * to not add styles to the `<li>` element but instead use the default `className` prop.
   *
   * @docgen
   */
  liClassName?: string;

  /**
   * The `href` to apply to the `<a>` tag. This is only used if you are not using another routing library
   * with the `component` prop.
   *
   * @docgen
   */
  href?: string;

  /**
   * Boolean if the link is currently disabled.
   *
   * @docgen
   */
  disabled?: boolean;

  /**
   * An optional role for the link. This will normally just be a `listitem`, but can also be `treeitem` when used
   * within the `TreeView`.
   *
   * @docgen
   */
  role?: string;

  /**
   * An optional role to apply to the surrounding `<li>`. It is generally recommended to leave this as the default
   * value.
   *
   * @docgen
   */
  liRole?: string;

  /**
   * An optional component used to render the link. If you are using a routing library like `react-router` or
   * `reach-router`, this should be the `Link` component.
   *
   * @docgen
   */
  // basically React.ReactType, but only allowing "a" instead of any string
  component?: "a" | React.ComponentType<any> | React.StatelessComponent<any>;

  /**
   * Any children to render within the link. This should normally be text.
   *
   * @docgen
   */
  children?: React.ReactNode;

  onMouseDown?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLAnchorElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLAnchorElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
}

export interface IListItemLinkWithComponentProps extends IListItemLinkBaseProps {
  [key: string]: any;
  component: React.ComponentType<any> | React.StatelessComponent<any>;
}

export interface IListItemLinkWithAnchorProps extends IListItemLinkBaseProps, React.HTMLAttributes<HTMLAnchorElement> {
  component: "a";
  href: "string";
}

export interface IListItemLinkDefaultProps {
  component: "a";
  forceIconWrap: boolean;
}

export type ListItemLinkWithDefaultProps = IListItemLinkProps & IListItemLinkDefaultProps;

export type IListItemLinkProps = IListItemLinkBaseProps | IListItemLinkWithComponentProps;

/**
 * The `ListItemLink` component is used to render links within lists. This component is really only required
 * because the accessibility specs change when rendering links within lists by changing what roles are applied.
 * This should render basically the same as the `ListItem` component.
 */
const ListItemLink: React.SFC<IListItemLinkProps> = baseProps => {
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
  } = baseProps as ListItemLinkWithDefaultProps;

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

// says it's missing attributes for some reason
// @ts-ignore
ListItemLink.propTypes = {
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

ListItemLink.defaultProps = {
  component: "a",
  forceIconWrap: false,
} as IListItemLinkDefaultProps;

export default ListItemLink;
