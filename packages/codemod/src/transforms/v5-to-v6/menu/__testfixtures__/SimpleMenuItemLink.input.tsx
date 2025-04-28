import type { ReactElement } from "react";
import { DropdownMenu, MenuItemLink, Link } from "react-md";

export default function SimpleExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Options...">
      <MenuItemLink href="/link-1" component={Link}>
        Link 1
      </MenuItemLink>
      <MenuItemLink
        href="#link-2"
        liProps={{ className: "container-class-name" }}
        className="link-class-name"
      >
        Link 2
      </MenuItemLink>
    </DropdownMenu>
  );
}

