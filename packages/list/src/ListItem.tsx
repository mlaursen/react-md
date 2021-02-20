import React, { forwardRef } from "react";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";

import { getListItemHeight, SimpleListItemProps } from "./getListItemHeight";
import { ListItemChildren } from "./ListItemChildren";
import { SimpleListItem } from "./SimpleListItem";

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
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
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
      disabled = false,
      tabIndex = disabled ? -1 : 0,
      ...props
    },
    ref
  ) {
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
        disabled={disabled}
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
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ListItem.propTypes = {
      role: PropTypes.string,
      tabIndex: PropTypes.number,
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
    };
  } catch (e) {}
}
