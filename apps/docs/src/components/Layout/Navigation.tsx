import { DialogHeader, Tree, useLayoutTree } from "@react-md/core";
import type { ReactElement } from "react";
import { UnstyledLink } from "../UnstyledLink";
import { NavigationItemRenderer } from "./NavigationItemRenderer";
import { navItems } from "./navItems";

export interface NavigationProps {
  pathname: string;
}

export function Navigation(props: NavigationProps): ReactElement {
  const { pathname } = props;
  const tree = useLayoutTree({
    navItems,
    pathname,
  });

  return (
    <>
      <DialogHeader>Header</DialogHeader>
      <Tree
        aria-label="Navigation"
        {...tree}
        linkComponent={UnstyledLink}
        renderer={NavigationItemRenderer}
      />
      <DialogHeader>Footer</DialogHeader>
    </>
  );
}
