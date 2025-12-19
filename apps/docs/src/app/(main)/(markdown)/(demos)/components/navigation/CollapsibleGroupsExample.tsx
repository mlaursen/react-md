import { card } from "@react-md/core/card/styles";
import { Navigation } from "@react-md/core/navigation/Navigation";
import { type NavigationItem } from "@react-md/core/navigation/types";
import { useNavigationExpansion } from "@react-md/core/navigation/useNavigationExpansion";
import { type ReactElement } from "react";

import { FakeLink } from "@/components/FakeLink.js";

const items: readonly NavigationItem[] = [
  {
    type: "route",
    href: "/",
    children: "Home",
  },
  {
    type: "group",
    href: "/route-1",
    children: "Prefixed Href",
    items: [
      {
        type: "route",
        href: "/page-1",
        children: "Page 1",
      },
      {
        type: "route",
        href: "/page-2",
        children: "Page 2",
      },
      {
        type: "route",
        href: "/page-3",
        children: "Page 3",
      },
    ],
  },
  {
    type: "group",
    children: "No Prexed Href",
    items: [
      {
        type: "route",
        href: "/page-1",
        children: "Page 1",
      },
      {
        type: "route",
        href: "/page-2",
        children: "Page 2",
      },
      {
        type: "route",
        href: "/page-3",
        children: "Page 3",
      },
    ],
  },
  {
    type: "group",
    href: "/multi",
    children: "Multiple Levels",
    items: [
      {
        type: "route",
        href: "/page-1",
        children: "Page 1",
      },
      {
        type: "group",
        href: "/level-2",
        children: "Level 2",
        items: [
          {
            type: "route",
            href: "/page-1",
            children: "Page 1",
          },
        ],
      },
    ],
  },
];

export default function CollapsibleGroupsExample(): ReactElement {
  const { data } = useNavigationExpansion({
    pathname: "/route-1/page-2",
    linkComponent: FakeLink,
  });
  return (
    <nav aria-label="Fake Navigation" className={card()}>
      <Navigation data={data} items={items} />
    </nav>
  );
}
