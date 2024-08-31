"use client";
import { LinkUnstyled } from "@/components/LinkUnstyled.jsx";
import { Navigation } from "@react-md/core/navigation/Navigation";
import { type NavigationItem } from "@react-md/core/navigation/types";
import { useNavigationExpansion } from "@react-md/core/navigation/useNavigationExpansion";
import { usePathname } from "next/navigation.js";
import { type ReactElement } from "react";

const items: readonly NavigationItem[] = [
  {
    type: "route",
    href: "/",
    children: "Home",
  },
  {
    type: "route",
    href: "/page-1",
    children: "Page 1",
  },
];

export function MainNavigation(): ReactElement {
  const pathname = usePathname();
  const { data } = useNavigationExpansion({
    pathname,
    linkComponent: LinkUnstyled,
  });
  return (
    <nav aria-label="Navigation">
      <Navigation data={data} items={items} />
    </nav>
  );
}
