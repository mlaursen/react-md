import type { ReactElement } from "react";
import { DropdownMenu, Link, ListItemLink } from "react-md";

export default function SimpleExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Options...">
      <ListItemLink href="/link-1" as={Link} role="menuitem">
        Link 1
      </ListItemLink>
      <ListItemLink
        href="#link-2"
        liProps={{ className: "container-class-name" }}
        className="link-class-name"
        role="menuitem">
        Link 2
      </ListItemLink>
    </DropdownMenu>
  );
}

