import React, {
  createElement,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactType,
} from "react";
import cn from "classnames";
import {
  IInteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { IWithForwardedRef } from "@react-md/utils";

import getListItemHeight from "./getListItemHeight";
import ListItemChildren, { IListItemChildrenProps } from "./ListItemChildren";
import { ISimpleListItemProps, ListItemHeight } from "./SimpleListItem";

export interface IListItemLinkProps
  extends HTMLAttributes<HTMLAnchorElement>,
    IListItemChildrenProps,
    Pick<ISimpleListItemProps, "threeLines" | "height">,
    IInteractionStatesOptions<HTMLAnchorElement>,
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
  component: ReactType;
}

type ListItemLinkWithDefaultProps = IListItemLinkProps &
  IListItemLinkDefaultProps;

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
    component,
    ...props
  } = providedProps as ListItemLinkWithDefaultProps;

  const height = getListItemHeight(providedProps);
  return createElement(
    component,
    {
      ...props,
      disableSpacebarClick: true,
      ref: forwardedRef,
      className: cn(
        "rmd-list-item rmd-list-item--clickable rmd-list-item--link",
        {
          [`rmd-list-item--${height}`]:
            height !== "auto" && height !== "normal",
          "rmd-list-item--three-lines": !!secondaryText && threeLines,
        },
        className
      ),
      enableKeyboardClick: true,
    },
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
  );
};

const defaultProps: IListItemLinkDefaultProps = {
  height: "auto",
  component: "a",
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
