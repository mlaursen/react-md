import React, { useState } from "react";
import {
  IWithForwardedRef,
  useHideOnOutsideClick,
  Maybe,
} from "@react-md/utils";

import { IdRequired } from "../types";
import { loopByQuerySelector } from "../utils";
import { MenuElement, MenuButtonElement } from "./types";
import {
  useMenuNodes,
  useMenuShowFocusEffect,
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

const MENU_ITEM_QUERY = '[role^="menuitem"]:not([aria-disabled="true"])';

function clickActiveDescendant(menuNode: Maybe<MenuElement>) {
  if (!menuNode) {
    return;
  }
}

const Menu: React.FunctionComponent<MenuProps> = providedProps => {
  const {
    component,
    defaultActiveId,
    defaultFocusFirst,
    isVisibleByKeyboard,
    onRequestHide,
    forwardedRef,
    children,
    onClick,
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
  useMenuShowFocusEffect(menuNode);
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
        const nextId = loopByQuerySelector(menuNode, {
          first: key === "Home",
          last: key === "End",
          query: MENU_ITEM_QUERY,
          increment: key === "ArrowDown",
        });

        if (nextId) {
          setActiveId(nextId);
        }
        break;
    }
  }

  function handleOnClick(event: React.MouseEvent<MenuElement>) {
    if (onClick) {
      onClick(event);
    }

    const target = event.target as Maybe<HTMLElement>;
    if (target && target.closest(MENU_ITEM_QUERY)) {
      window.requestAnimationFrame(onRequestHide);
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
      onClick: handleOnClick,
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
