import { FakeLink } from "@/components/FakeLink.jsx";
import { card } from "@react-md/core/card/styles";
import { Navigation } from "@react-md/core/navigation/Navigation";
import { type NavigationItem } from "@react-md/core/navigation/types";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import { type ReactElement } from "react";

const items: readonly NavigationItem[] = [
  {
    type: "route",
    href: "/",
    children: "Home",
    beforeAddon: <HomeIcon />,
  },
  {
    type: "route",
    href: "/route-1",
    children: "Route 1",
    beforeAddon: <StarIcon />,
  },
  {
    type: "route",
    href: "/route-2",
    children: "Route 2",
    beforeAddon: <FavoriteIcon />,
    afterAddon: <FavoriteIcon />,
  },
];

export default function AddingIconsExample(): ReactElement {
  return (
    <nav aria-label="Fake Navigation" className={card()}>
      <Navigation
        data={{ pathname: "/", linkComponent: FakeLink }}
        items={items}
      />
    </nav>
  );
}
