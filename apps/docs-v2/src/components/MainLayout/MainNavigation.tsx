import { RenderRecursively } from "@react-md/core/utils/RenderRecursively";
import { type ReactElement } from "react";
import { MainNavigationGroup } from "./MainNavigationGroup.jsx";
import { RenderMainNavigationItem } from "./RenderMainNavigationItem.jsx";
import { navItems } from "./navItems.js";

export interface MainNavigationProps {
  className?: string;
}

export function MainNavigation({
  className,
}: MainNavigationProps): ReactElement {
  return (
    <MainNavigationGroup depth={0} className={className}>
      <RenderRecursively items={navItems} render={RenderMainNavigationItem} />
    </MainNavigationGroup>
  );
}
