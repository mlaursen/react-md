import React, { useState } from "react";
import { IWithForwardedRef, useHideOnOutsideClick } from "@react-md/utils";

import { IdRequired } from "../types";
import { loopByRole } from "../utils/loopByRole";
import { MenuElement, MenuButtonElement } from "./types";
import {
  useMenuNodes,
  useMenuMountEffect,
  useMenuHideFocusEffect,
  useActiveDescendateState,
} from "./hooks";

export interface IMenuLabel {
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export interface IMenuProps extends IdRequired, IMenuLabel {
  component?: "div" | "ul" | "ol";
  onRequestHide: () => void;
  defaultActiveId?: string;
  defaultFocusFirst?: boolean;
  isVisibleByKeyboard?: boolean;
}

export type MenuProps = IMenuProps &
  IWithForwardedRef<MenuElement> &
  React.HTMLAttributes<MenuElement>;

export interface IMenuDefaultProps {
  role: "menu";
  component: "div" | "ul" | "ol";
  defaultActiveId: string;
  defaultFocusFirst: boolean;
  isVisibleByKeyboard: boolean;
}

export type MenuWithDefaultProps = MenuProps & IMenuDefaultProps;

const Menu: React.FunctionComponent<MenuProps> = providedProps => {
  const {
    component,
    defaultActiveId,
    defaultFocusFirst,
    isVisibleByKeyboard,
    onRequestHide,
    forwardedRef,
    children,
    onKeyDown,
    ...props
  } = providedProps as MenuWithDefaultProps;

  const { id } = props;
  const [menuNode, menuButtonNode] = useMenuNodes(id);
  const [activeId, setActiveId] = useActiveDescendateState(
    defaultFocusFirst,
    defaultActiveId,
    menuNode
  );
  useHideOnOutsideClick(menuNode, onRequestHide, [menuButtonNode]);
  useMenuMountEffect(menuNode);
  useMenuHideFocusEffect(menuButtonNode);

  function handleKeyDown(event: React.KeyboardEvent<MenuElement>) {
    if (onKeyDown) {
      onKeyDown(event);
    }

    const { key } = event;
    switch (key) {
      case "Escape":
        onRequestHide();
        break;
      case "ArrowUp":
      case "ArrowDown":
      case "Home":
      case "End":
        const nextId = loopByRole(menuNode, {
          first: key === "Home",
          last: key === "End",
          roles: ["menuitem", "menuitemcheckbox", "menuitemradio"],
          increment: key === "ArrowDown",
        });

        if (nextId) {
          setActiveId(nextId);
        }
        break;
    }
  }

  return React.createElement(
    component,
    {
      ...props,
      "aria-activedescendant": activeId,
      tabIndex: -1,
      ref: forwardedRef,
      onKeyDown: handleKeyDown,
    },
    children
  );
};

const defaultProps: IMenuDefaultProps = {
  role: "menu",
  component: "ul",
  defaultActiveId: "",
  defaultFocusFirst: true,
  isVisibleByKeyboard: false,
};

Menu.defaultProps = defaultProps;

export default React.forwardRef<MenuElement, MenuProps>((props, ref) => (
  <Menu {...props} forwardedRef={ref} />
));
