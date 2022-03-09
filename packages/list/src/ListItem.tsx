import { forwardRef } from "react";
import type { InteractionStatesOptions } from "@react-md/states";
import { useInteractionStates } from "@react-md/states";

import type { SimpleListItemProps } from "./getListItemHeight";
import { getListItemHeight } from "./getListItemHeight";
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
      disableEnterClick,
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
      disableEnterClick,
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
