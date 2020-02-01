import React, { forwardRef, ReactElement, Ref } from "react";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";

import getListItemHeight, { SimpleListItemProps } from "./getListItemHeight";
import ListItemChildren from "./ListItemChildren";
import SimpleListItem from "./SimpleListItem";

export interface ListItemProps
  extends SimpleListItemProps,
    InteractionStatesOptions<HTMLLIElement> {
  tabIndex?: number;
}

function ListItem(
  {
    className: propClassName,
    textClassName,
    secondaryTextClassName,
    textChildren = true,
    primaryText,
    secondaryText,
    children,
    leftIcon,
    leftAvatar,
    leftMedia,
    leftMediaLarge,
    leftPosition = "middle",
    rightIcon,
    rightAvatar,
    rightMedia,
    rightMediaLarge,
    rightPosition = "middle",
    forceIconWrap,
    height: propHeight = "auto",
    disableSpacebarClick = false,
    disableRipple = false,
    disableProgrammaticRipple = false,
    disablePressedFallback = false,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    role = "button",
    tabIndex = 0,
    ...props
  }: ListItemProps,
  ref?: Ref<HTMLLIElement>
): ReactElement {
  const { disabled } = props;

  const { ripples, className, handlers } = useInteractionStates({
    className: propClassName,
    handlers: props,
    disabled,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    disableSpacebarClick,
    disablePressedFallback,
  });

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

  return (
    <SimpleListItem
      {...props}
      {...handlers}
      ref={ref}
      tabIndex={tabIndex}
      role={role}
      className={className}
      clickable
      height={height}
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
        leftPosition={leftPosition}
        rightIcon={rightIcon}
        rightAvatar={rightAvatar}
        rightMedia={rightMedia}
        rightMediaLarge={rightMediaLarge}
        rightPosition={rightPosition}
        forceIconWrap={forceIconWrap}
      >
        {children}
      </ListItemChildren>
      {ripples}
    </SimpleListItem>
  );
}

const ForwardedListItem = forwardRef<HTMLLIElement, ListItemProps>(ListItem);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedListItem.propTypes = {
      role: PropTypes.string,
      tabIndex: PropTypes.number,
      height: PropTypes.oneOf([
        "auto",
        "normal",
        "medium",
        "large",
        "extra-large",
      ]),
      leftPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
      rightPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
      disabled: PropTypes.bool,
      disableSpacebarClick: PropTypes.bool,
      disablePressedFallback: PropTypes.bool,
      textChildren: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedListItem;
