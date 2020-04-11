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
  /**
   * An optional `tabIndex` for the clickable and focusable item.
   */
  tabIndex?: number;
}

/**
 * The `ListItem` creates a clickable and focusable `<li>` within a `List` that
 * can optionally render addons to the left and right of the `children` or text.
 */
function ListItem(
  {
    className: propClassName,
    textClassName,
    secondaryTextClassName,
    textChildren = true,
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
    leftAddon,
    leftAddonType,
    rightAddon,
    rightAddonType,
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
      leftAddonPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
      rightAddonPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
      disabled: PropTypes.bool,
      disableSpacebarClick: PropTypes.bool,
      disablePressedFallback: PropTypes.bool,
      textChildren: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedListItem;
