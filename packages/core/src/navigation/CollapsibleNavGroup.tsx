"use client";
import { forwardRef, type LiHTMLAttributes, type ReactNode } from "react";
import { type ButtonProps } from "../button/Button.js";
import {
  type CollapseTransitionHookOptions,
  useCollapseTransition,
} from "../transition/useCollapseTransition.js";
import { type PropsWithRef } from "../types.js";
import { NavGroup, type NavGroupProps } from "./NavGroup.js";
import { NavItem } from "./NavItem.js";
import {
  NavItemButton,
  type NavItemButtonRotatorProps,
} from "./NavItemButton.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export interface CollapsibleNavGroupProps
  extends NavGroupProps,
    NavItemButtonRotatorProps {
  liProps?: PropsWithRef<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
  buttonProps?: PropsWithRef<ButtonProps, HTMLButtonElement>;
  collapseOptions?: Omit<
    CollapseTransitionHookOptions<HTMLUListElement>,
    "nodeRef" | "className" | "transitionIn"
  >;

  /**
   * The children to render in the {@link NavItemButton} that toggles the
   * collapsed state
   */
  buttonChildren: ReactNode;

  /**
   * The content that should be rendered in the non-collapsed {@link NavGroup}.
   */
  children: ReactNode;

  collapsed: boolean;
  toggleCollapsed: () => void;
}

/**
 * **Client Component**
 *
 * @since 6.0.0
 */
export const CollapsibleNavGroup = forwardRef<
  HTMLUListElement,
  CollapsibleNavGroupProps
>(function CollapsibleNavGroup(props, ref) {
  const {
    liProps,
    buttonProps,
    buttonChildren,
    icon,
    iconRotatorProps,
    disableIconRotator,
    className,
    children,
    collapsed,
    toggleCollapsed,
    collapseOptions,
    ...remaining
  } = props;

  const { rendered, elementProps } = useCollapseTransition({
    ...collapseOptions,
    nodeRef: ref,
    className,
    transitionIn: !collapsed,
  });
  const onButtonClick = buttonProps?.onClick ?? noop;

  return (
    <NavItem {...liProps}>
      <NavItemButton
        {...buttonProps}
        onClick={(event) => {
          onButtonClick(event);
          toggleCollapsed();
        }}
        collapsed={collapsed}
        icon={icon}
        iconRotatorProps={iconRotatorProps}
        disableIconRotator={disableIconRotator}
      >
        {buttonChildren}
      </NavItemButton>
      {rendered && (
        <NavGroup {...remaining} {...elementProps}>
          {children}
        </NavGroup>
      )}
    </NavItem>
  );
});
