import * as React from "react";
import { IWithForwardedRef } from "@react-md/utils";
import { RequireAtLeastOne, IdRequired } from "../types";
import { ShowMenuRequestFunction, MenuButtonElement } from "./types";

interface IMenuButtonControls {
  "aria-controls"?: string;
  menuId?: string;
}

interface IMenuButtonExpanded {
  "aria-expanded"?: boolean | "true" | "false";
  visible?: boolean;
}

export interface IMenuButtonProps
  extends IdRequired,
    IMenuButtonControls,
    IMenuButtonExpanded {
  disabled?: boolean;
  "aria-haspopup"?: "menu" | "true";
  children?: React.ReactNode;
  component?: "button" | "div";
  onRequestShow: ShowMenuRequestFunction;
}

export type MenuButtonProps = IMenuButtonProps &
  RequireAtLeastOne<IMenuButtonControls> &
  RequireAtLeastOne<IMenuButtonExpanded> &
  IWithForwardedRef<MenuButtonElement> &
  React.HTMLAttributes<MenuButtonElement>;

export interface IMenuButtonDefaultProps {
  "aria-haspopup": "menu" | "true";
  component: "button" | "div";
}

export type MenuButtonWithDefaultProps = MenuButtonProps &
  IMenuButtonDefaultProps;

function handleClick({ onClick, onRequestShow }: MenuButtonProps) {
  return function clickHandler(event: React.MouseEvent<MenuButtonElement>) {
    if (onClick) {
      onClick(event);
    }

    onRequestShow(true, false);
  };
}

function handleKeyDown({ onKeyDown, onRequestShow }: MenuButtonProps) {
  return function keydownHandler(
    event: React.KeyboardEvent<MenuButtonElement>
  ) {
    if (onKeyDown) {
      onKeyDown(event);
    }

    const { key } = event;
    if (
      key === "Enter" ||
      key === " " ||
      key === "ArrowUp" ||
      key === "ArrowDown"
    ) {
      if (key !== "Enter") {
        // don't want the default page scrolling behavior to be triggered
        event.preventDefault();
      }

      event.stopPropagation();
      onRequestShow(key !== "ArrowUp", true);
    }
  };
}

const MenuButton: React.FunctionComponent<MenuButtonProps> = providedProps => {
  const {
    component,
    children,
    onRequestShow,
    forwardedRef,
    onClick: propOnClick,
    onKeyDown: propOnKeyDown,
    tabIndex: propTabIndex,
    "aria-controls": ariaControls,
    "aria-expanded": ariaExpanded,
    menuId,
    visible,
    role: propRole,
    disabled: propDisabled,
    ...props
  } = providedProps as MenuButtonWithDefaultProps;

  const isDiv = component === "div";
  const role = propRole || isDiv ? "button" : undefined;
  const disabled = isDiv ? undefined : propDisabled;
  const ariaDisabled = isDiv && disabled ? "true" : undefined;

  let tabIndex = propTabIndex;
  if (disabled || ariaDisabled) {
    tabIndex = undefined;
  } else if (isDiv && typeof tabIndex !== "number") {
    tabIndex = 0;
  }

  return React.createElement(
    component,
    {
      ...props,
      "aria-expanded": ariaExpanded || visible,
      "aria-controls": ariaControls || menuId,
      ref: forwardedRef,
      disabled,
      "aria-disabled": ariaDisabled,
      role,
      tabIndex,
      onClick: ariaDisabled ? undefined : handleClick(providedProps),
      onKeyDown: ariaDisabled ? undefined : handleKeyDown(providedProps),
    },
    children
  );
};

const defaultProps: IMenuButtonDefaultProps = {
  "aria-haspopup": "menu",
  component: "button",
};

MenuButton.defaultProps = defaultProps;

export default React.forwardRef<MenuButtonElement, MenuButtonProps>(
  (props, ref) => <MenuButton {...props} forwardedRef={ref} />
);
