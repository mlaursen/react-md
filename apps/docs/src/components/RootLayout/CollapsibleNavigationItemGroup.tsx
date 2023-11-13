"use client";
import {
  type NavigationGroupItem,
  type NavigationItem,
} from "@/constants/navItems.js";
import {
  Button,
  IconRotator,
  getIcon,
  useCollapseTransition,
  useToggle,
  type RenderRecursiveItemsProps,
} from "@react-md/core";
import { usePathname } from "next/navigation.js";
import { type ReactElement } from "react";
import { NavigationItemGroup } from "./NavigationItemGroup.jsx";
import { getHrefFromParents } from "./getHrefFromParents.js";

export function CollapsibleNavigationItemGroup(
  props: RenderRecursiveItemsProps<NavigationItem>
): ReactElement {
  const { item, parents, children } = props;
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
        <NavigationItemGroup depth={parents.length} {...elementProps}>
          {children}
        </NavigationItemGroup>
      )}
    </li>
  );
}
