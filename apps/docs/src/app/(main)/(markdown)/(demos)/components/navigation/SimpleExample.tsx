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
    type: "route",
    href: "/route-1",
    children: "Route 1",
  },
  {
    type: "route",
    href: "/route-2",
    children: "Route 2",
  },
];

export default function SimpleExample(): ReactElement {
  const { data } = useNavigationExpansion({
    pathname: "/",
    linkComponent: FakeLink,
  });
  return (
    <nav aria-label="Fake Navigation" className={card()}>
      <Navigation data={data} items={items} />
    </nav>
  );
}
