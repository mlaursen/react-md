"use client";
import { Button } from "@react-md/core/button/Button";
import { IconRotator } from "@react-md/core/icon/IconRotator";
import { getIcon } from "@react-md/core/icon/iconConfig";
import { useCollapseTransition } from "@react-md/core/transition/useCollapseTransition";
import { useToggle } from "@react-md/core/useToggle";
import { type RenderRecursiveItemsProps } from "@react-md/core/utils/RenderRecursively";
import { usePathname } from "next/navigation.js";
import { type ReactElement } from "react";
import { MainNavigationGroup } from "./MainNavigationGroup.jsx";
import { getHrefFromParents } from "./getHrefFromParents.js";
import { type NavigationGroupItem, type NavigationItem } from "./navItems.js";

export function CollapsibleMainNavigationGroup({
  item,
  parents,
  children,
}: RenderRecursiveItemsProps<NavigationItem>): ReactElement {
  const pathname = usePathname();
  const { toggled: collapsed, toggle } = useToggle(
    () => !pathname.includes(getHrefFromParents(parents))
  );

  const { rendered, elementProps } = useCollapseTransition({
    transitionIn: !collapsed,
  });

  return (
    <li>
      <Button onClick={toggle}>
        {(item as NavigationGroupItem).children}
        <IconRotator rotated={!collapsed}>{getIcon("dropdown")}</IconRotator>
      </Button>
      {rendered && (
        <MainNavigationGroup depth={parents.length} {...elementProps}>
          {children}
        </MainNavigationGroup>
      )}
    </li>
  );
}
