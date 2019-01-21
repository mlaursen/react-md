import { useState, useEffect } from "react";
import { Maybe } from "@react-md/utils";

import { MenuElement, MenuButtonElement } from "./types";

export function useMenuNodes(
  id: string
): [Maybe<MenuElement>, Maybe<MenuButtonElement>] {
  const [menuNode, setMenuNode] = useState<Maybe<MenuElement>>(null);
  // prettier-ignore
  const [menuButtonNode, setMenuButtonNode] = useState<Maybe<MenuButtonElement>>(null);

  useEffect(() => {
    const currentMenuNode = document.getElementById(id) as Maybe<MenuElement>;
    const currentMenuButtonNode = document.querySelector(
      `[aria-controls="${id}"]`
    ) as Maybe<MenuButtonElement>;
    setMenuNode(currentMenuNode);
    setMenuButtonNode(currentMenuButtonNode);

    if (process.env.NODE_ENV === "development") {
      if (!currentMenuNode) {
        console.error(`Unable to find a menu with an id: \`${id}\`.`);
        console.error(new Error().stack);
      }

      if (!currentMenuButtonNode) {
        console.error(
          "Unable to find an element on the page that controls the menu with " +
            `an id of \`${id}\`. There must be a menu button on the page that ` +
            `has an \`aria-controls="${id}"\` attribute for keyboard accessibility ` +
            "to be implemented correctly."
        );
        console.error(new Error().stack);
      }
    }
  }, []);

  return [menuNode, menuButtonNode];
}

export function useActiveDescendateState(
  defaultFocusFirst: boolean,
  defaultActiveId: string,
  menuNode: Maybe<MenuElement>
): [string, (activeId: string) => void] {
  const [activeId, setActiveId] = useState(defaultActiveId);
  useEffect(() => {
    if (!menuNode || activeId || defaultActiveId) {
      return;
    }

    const item = document.querySelector(
      `[role^="menuitem"]${
        defaultFocusFirst ? "" : ":last-child"
      }:not([aria-disabled="true"])`
    );

    if (!item || !item.id) {
      console.error(
        "The menu component is only able to manage the keyboard focus for menu " +
          "items that have the role of: `menuitem`, `menuitemcheckbox`, and " +
          "`menuitemradio` as well as an id but none were found within the menu. "
      );
      console.error(
        "The menuitem id is used to traverse the menu items using the " +
          "`aria-activedecendant` attribute."
      );
      console.error(new Error().stack);
    } else {
      setActiveId(item.id);
    }
  });

  return [activeId, setActiveId];
}
