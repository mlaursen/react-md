import type { AnchorHTMLAttributes, ElementType } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import type { InteractionStatesOptions } from "@react-md/states";
import { useInteractionStates } from "@react-md/states";

import type { SimpleListItemProps } from "./getListItemHeight";
import { getListItemHeight } from "./getListItemHeight";
import type { ListItemChildrenProps } from "./ListItemChildren";
import { ListItemChildren } from "./ListItemChildren";

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
