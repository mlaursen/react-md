import { type ReactElement } from "react";
import { ListItemLink } from "react-md";

import { CustomLink } from "./CustomLink";

export default function Example(): ReactElement {
  return (
    <>
      <ListItemLink component={CustomLink} to="/some-path">
        Link 1
      </ListItemLink>
      <ListItemLink component="a" href="/some-path">
        Link 2
      </ListItemLink>
    </>
  );
}
