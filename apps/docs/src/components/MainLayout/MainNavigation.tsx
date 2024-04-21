import { Navigation } from "@react-md/core/navigation/Navigation";
import { usePathname } from "next/navigation.js";
import { type ReactElement } from "react";
import { LinkUnstyled } from "../LinkUnstyled.jsx";
import { navItems } from "./navItems.js";

export interface MainNavigationProps {
  className?: string;
}

export function MainNavigation(props: MainNavigationProps): ReactElement {
  const { className } = props;
  const pathname = usePathname();

  return (
    <Navigation
      data={{ pathname, linkComponent: LinkUnstyled }}
      items={navItems}
      className={className}
    />
  );
}
