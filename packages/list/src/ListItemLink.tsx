import React, {
  forwardRef,
  FunctionComponent,
  ReactType,
  HTMLAttributes,
  createElement,
} from "react";
import cn from "classnames";
import { withStates } from "@react-md/states";
import { IWithForwardedRef } from "@react-md/utils";

import { ListItemHeight, ISimpleListItemProps } from "./SimpleListItem";
import ListItemChildren, { IListItemChildrenProps } from "./ListItemChildren";
import getListItemHeight from "./getListItemHeight";

export interface IListItemLinkProps
  extends HTMLAttributes<HTMLAnchorElement>,
    IListItemChildrenProps,
    Pick<ISimpleListItemProps, "threeLines" | "height">,
    IWithForwardedRef<HTMLAnchorElement> {
  /**
   * An id for the link. This is really just required since this component
   * needs the keyboard focus only states enabled.
   */
  id: string;

  /**
   * An optional component to render as. This should really only be used if you are using a
   * router library like [react-router](https://github.com/ReactTraining/react-router) or
   * [@reach/router](https://github.com/reach/router). This will call `createElement` with
   * this value and provide all props and class name.
   */
  component?: ReactType;

  /**
   * I'm not really sure of a good way to implement this, but when the `component` prop is provided,
   * all valid props from that component should also be allowed.
   */
  [key: string]: any;
}

export interface IListItemLinkDefaultProps {
  height: ListItemHeight;
}

type ListItemLinkWithDefaultProps = IListItemLinkProps &
  IListItemLinkDefaultProps;

const LinkWithStates = withStates<IListItemLinkProps>(
  (providedProps: IListItemLinkProps) => {
    const { component, ...props } = providedProps as IListItemLinkProps & {
      component: ReactType;
    };

    return createElement(component, props);
  }
);

LinkWithStates.defaultProps = {
  component: "a",
};

const ListItemLink: FunctionComponent<IListItemLinkProps> = providedProps => {
  const {
    className,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    children,
    forwardedRef,
    leftIcon,
    leftAvatar,
    rightIcon,
    rightAvatar,
    forceIconWrap,
    height: propHeight,
    threeLines,
    ...props
  } = providedProps as ListItemLinkWithDefaultProps;

  const height = getListItemHeight(providedProps);
  return (
    <LinkWithStates
      {...props}
      disableSpacebarClick
      ref={forwardedRef}
      className={cn(
        "rmd-list-item rmd-list-item--clickable rmd-list-item--link",
        {
          [`rmd-list-item--${height}`]:
            height !== "auto" && height !== "normal",
          "rmd-list-item--three-lines": !!secondaryText && threeLines,
        },
        className
      )}
      enableKeyboardClick
    >
      <ListItemChildren
        textClassName={textClassName}
        secondaryTextClassName={secondaryTextClassName}
        textChildren={textChildren}
        primaryText={primaryText}
        secondaryText={secondaryText}
        leftIcon={leftIcon}
        leftAvatar={leftAvatar}
        rightIcon={rightIcon}
        rightAvatar={rightAvatar}
        forceIconWrap={forceIconWrap}
      >
        {children}
      </ListItemChildren>
    </LinkWithStates>
  );
};
const defaultProps: IListItemLinkDefaultProps = {
  height: "auto",
};

ListItemLink.defaultProps = defaultProps;
if (process.env.NODE_ENV !== "production") {
  ListItemLink.displayName = "ListItemLink";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    ListItemLink.propTypes = {
      id: PropTypes.string.isRequired,
      height: PropTypes.oneOf([
        "auto",
        "normal",
        "medium",
        "large",
        "extra-large",
      ]),
    };
  }
}

export default forwardRef<HTMLAnchorElement, IListItemLinkProps>(
  (props, ref) => <ListItemLink {...props} forwardedRef={ref} />
);
