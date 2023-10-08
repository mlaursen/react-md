import { navItems } from "@/constants/navItems.js";
import { RenderRecursively } from "@react-md/core";
import { type ReactElement } from "react";
import { NavigationItemGroup } from "./NavigationItemGroup.jsx";
import { RenderNavigationItem } from "./RenderNavigationItem.jsx";

export function Navigation(): ReactElement {
  return (
    <NavigationItemGroup depth={0}>
      <RenderRecursively items={navItems} render={RenderNavigationItem} />
    </NavigationItemGroup>
  );
}
