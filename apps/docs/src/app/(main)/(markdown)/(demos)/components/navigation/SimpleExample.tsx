import { FakeLink } from "@/components/FakeLink.jsx";
import { card } from "@react-md/core/card/styles";
import { Navigation } from "@react-md/core/navigation/Navigation";
import { type NavigationItem } from "@react-md/core/navigation/types";
import { type ReactElement } from "react";

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
  return (
    <nav aria-label="Fake Navigation" className={card()}>
      <Navigation
        data={{ pathname: "/", linkComponent: FakeLink }}
        items={items}
      />
    </nav>
  );
}
