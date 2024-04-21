"use client";
import { forwardRef, type LiHTMLAttributes, type ReactNode } from "react";
import { type ButtonProps } from "../button/Button.js";
import { useCollapseTransition } from "../transition/useCollapseTransition.js";
import { type PropsWithRef, type UseStateInitializer } from "../types.js";
import { useToggle } from "../useToggle.js";
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

  /**
   * The children to render in the {@link NavItemButton} that toggles the
   * collapsed state
   */
  buttonChildren: ReactNode;

  /**
   * The content that should be rendered in the non-collapsed {@link NavGroup}.
   */
  children: ReactNode;

  /** @defaultValue `false` */
  defaultCollapsed?: UseStateInitializer<boolean>;
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
    defaultCollapsed,
    ...remaining
  } = props;

  const { toggled: collapsed, toggle } = useToggle(defaultCollapsed);
  const { rendered, elementProps } = useCollapseTransition({
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
          toggle();
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
