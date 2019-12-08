import React, { ElementType, FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { WithForwardedRef } from "@react-md/utils";

import getListItemHeight, { SimpleListItemProps } from "./getListItemHeight";
import ListItemChildren, { ListItemChildrenProps } from "./ListItemChildren";

export interface ListItemLinkProps
  extends HTMLAttributes<HTMLAnchorElement>,
    ListItemChildrenProps,
    Pick<SimpleListItemProps, "threeLines" | "height">,
    InteractionStatesOptions<HTMLAnchorElement> {
  /**
   * An optional component to render as. This should really only be used if you are using a
   * router library like [react-router](https://github.com/ReactTraining/react-router) or
   * [@reach/router](https://github.com/reach/router). This will call `createElement` with
   * this value and provide all props and class name.
   */
  component?: ElementType;
}

export interface ListItemLinkWithComponentProps extends ListItemLinkProps {
  component: ElementType;

  /**
   * I'm not really sure of a good way to implement this, but when the `component` prop is provided,
   * all valid props from that component should also be allowed.
   */
  [key: string]: unknown;
}

type WithRef = WithForwardedRef<HTMLAnchorElement | ElementType>;
type DefaultProps = Required<Pick<ListItemLinkProps, "height" | "component">>;
type WithDefaultProps = ListItemLinkProps & DefaultProps & WithRef;

const ListItemLink: FC<ListItemLinkProps & WithRef> = providedProps => {
  const {
    className: propClassName,
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
    height: _height,
    threeLines,
    component: Component,
    disableSpacebarClick,
    disableRipple,
    disableProgrammaticRipple,
    disablePressedFallback,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    ...props
  } = providedProps as WithDefaultProps;

  const height = getListItemHeight(providedProps);
  const { ripples, className, handlers } = useInteractionStates({
    className: propClassName,
    handlers: props,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    disableSpacebarClick,
    disablePressedFallback,
  });
  return (
    <Component
      {...props}
      {...handlers}
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
      {ripples}
    </Component>
  );
};

const defaultProps: DefaultProps = {
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
      component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
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

export default forwardRef<
  HTMLAnchorElement | ElementType,
  ListItemLinkProps | ListItemLinkWithComponentProps
>((props, ref) => <ListItemLink {...props} forwardedRef={ref} />);
