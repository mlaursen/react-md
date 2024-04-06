import { navItems } from "@/constants/navItems.js";
import { RenderRecursively } from "react-md";
import { type ReactElement } from "react";
import { NavigationItemGroup } from "./NavigationItemGroup.jsx";
import { RenderNavigationItem } from "./RenderNavigationItem.jsx";

export interface NavigationProps {
  className?: string;
}

export function Navigation(props: NavigationProps): ReactElement {
  const { className } = props;

  return (
    <NavigationItemGroup depth={0} className={className}>
      <RenderRecursively items={navItems} render={RenderNavigationItem} />
    </NavigationItemGroup>
  );
}
