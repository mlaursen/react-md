import React, {
  ElementType,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  Ref,
} from "react";
import cn from "classnames";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";

import getListItemHeight, { SimpleListItemProps } from "./getListItemHeight";
import ListItemChildren, { ListItemChildrenProps } from "./ListItemChildren";

export interface ListItemLinkProps
  extends HTMLAttributes<HTMLAnchorElement>,
    ListItemChildrenProps,
    Pick<SimpleListItemProps, "threeLines" | "height">,
    InteractionStatesOptions<HTMLAnchorElement> {
  /**
   * An optional component to render as. This should really only be used if you
   * are using a router library like
   * [react-router](https://github.com/ReactTraining/react-router) or
   * [@reach/router](https://github.com/reach/router). This will call
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

function ListItemLink(
  {
    className: propClassName,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    children,
    leftIcon,
    leftAvatar,
    leftMedia,
    leftMediaLarge,
    rightIcon,
    rightAvatar,
    rightMedia,
    rightMediaLarge,
    forceIconWrap,
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
  }: ListItemLinkProps,
  ref?: Ref<HTMLAnchorElement | ElementType>
): ReactElement {
  const height = getListItemHeight({
    height: propHeight,
    leftIcon,
    rightIcon,
    leftAvatar,
    rightAvatar,
    leftMedia,
    rightMedia,
    leftMediaLarge,
    rightMediaLarge,
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
        leftIcon={leftIcon}
        leftAvatar={leftAvatar}
        leftMedia={leftMedia}
        leftMediaLarge={leftMediaLarge}
        rightIcon={rightIcon}
        rightAvatar={rightAvatar}
        rightMedia={rightMedia}
        rightMediaLarge={rightMediaLarge}
        forceIconWrap={forceIconWrap}
      >
        {children}
      </ListItemChildren>
      {ripples}
    </Component>
  );
}

const ForwardedListItemLink = forwardRef<
  HTMLAnchorElement | ElementType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ListItemLinkProps & Record<string, any>
>(ListItemLink);

if (process.env.NODE_ENV !== "production") {
  ListItemLink.displayName = "ListItemLink";

  try {
    const PropTypes = require("prop-types");

    ForwardedListItemLink.propTypes = {
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
  } catch (e) {}
}

export default ForwardedListItemLink;
