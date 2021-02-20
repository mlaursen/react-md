import React, { AnchorHTMLAttributes, ElementType, forwardRef } from "react";
import cn from "classnames";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";

import { getListItemHeight, SimpleListItemProps } from "./getListItemHeight";
import { ListItemChildren, ListItemChildrenProps } from "./ListItemChildren";

export interface ListItemLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    ListItemChildrenProps,
    Pick<SimpleListItemProps, "threeLines" | "height">,
    InteractionStatesOptions<HTMLAnchorElement> {
  /**
   * An optional component to render as. This should really only be used if you
   * are using a router library like
   * {@link https://github.com/ReactTraining/react-router|react-router} or
   * {@link https://github.com/reach/router|@reach/router}. This will call
   * `createElement` with this value and provide all props and class name.
   */
  component?: ElementType;
}

export interface ListItemLinkWithComponentProps extends ListItemLinkProps {
  component: ElementType;

  /**
   * I'm not really sure of a good way to implement this, but when the
   * `component` prop is provided, all valid props from that component should
   * also be allowed.
   */
  [key: string]: unknown;
}

/**
 * This component is a really bad attempt at creating a `Link` within a `List`
 * that has the main `ListItem` styles. It will probably be better to just use
 * the `ListItemChildren` within your `Link` component instead.
 */
export const ListItemLink = forwardRef<
  HTMLAnchorElement | ElementType,
  ListItemLinkProps | ListItemLinkWithComponentProps
>(function ListItemLink(
  {
    className: propClassName,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    children,
    leftAddon,
    leftAddonType = "icon",
    leftAddonPosition = "middle",
    rightAddon,
    rightAddonType = "icon",
    rightAddonPosition = "middle",
    forceAddonWrap,
    height: propHeight = "auto",
    threeLines = false,
    component: Component = "a",
    disableSpacebarClick,
    disableRipple,
    disableProgrammaticRipple,
    disablePressedFallback,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    ...props
  },
  ref
) {
  const height = getListItemHeight({
    height: propHeight,
    leftAddon,
    leftAddonType,
    rightAddon,
    rightAddonType,
    secondaryText,
  });
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
      ref={ref}
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
        leftAddon={leftAddon}
        leftAddonType={leftAddonType}
        leftAddonPosition={leftAddonPosition}
        rightAddon={rightAddon}
        rightAddonType={rightAddonType}
        rightAddonPosition={rightAddonPosition}
        forceAddonWrap={forceAddonWrap}
      >
        {children}
      </ListItemChildren>
      {ripples}
    </Component>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

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
      children: PropTypes.node,
      className: PropTypes.string,
      textClassName: PropTypes.string,
      secondaryTextClassName: PropTypes.string,
      primaryText: PropTypes.node,
      secondaryText: PropTypes.node,
      forceAddonWrap: PropTypes.bool,
      leftAddon: PropTypes.node,
      leftAddonType: PropTypes.oneOf([
        "icon",
        "avatar",
        "media",
        "large-media",
      ]),
      leftAddonPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
      rightAddon: PropTypes.node,
      rightAddonType: PropTypes.oneOf([
        "icon",
        "avatar",
        "media",
        "large-media",
      ]),
      rightAddonPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
      disabled: PropTypes.bool,
      disableRipple: PropTypes.bool,
      disableProgrammaticRipple: PropTypes.bool,
      rippleTimeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          appear: PropTypes.number,
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      rippleClassNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          appear: PropTypes.string,
          appearActive: PropTypes.string,
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
          exitDone: PropTypes.string,
        }),
      ]),
      rippleClassName: PropTypes.string,
      rippleContainerClassName: PropTypes.string,
      enablePressedAndRipple: PropTypes.bool,
      disableSpacebarClick: PropTypes.bool,
      disablePressedFallback: PropTypes.bool,
      textChildren: PropTypes.bool,
      threeLines: PropTypes.bool,
    };
  } catch (e) {}
}
