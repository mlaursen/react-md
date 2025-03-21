import { type ReactElement } from "react";
import { ListItemLink } from "react-md";

import { CustomLink } from "./CustomLink";

export default function Example(): ReactElement {
  return (
    <>
      <ListItemLink as={CustomLink} to="/some-path">
        Link 1
      </ListItemLink>
      <ListItemLink as="a" href="/some-path">
        Link 2
      </ListItemLink>
    </>
  );
}
