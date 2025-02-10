"use client";

import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Divider } from "@react-md/core/divider/Divider";
import { List } from "@react-md/core/list/List";
import { useCollapseTransition } from "@react-md/core/transition/useCollapseTransition";
import {
  type DefaultTreeItemNode,
  type TreeData,
} from "@react-md/core/tree/types";
import { type UseStateSetter } from "@react-md/core/types";
import { useToggle } from "@react-md/core/useToggle";
import {
  type RenderRecursiveItemsProps,
  RenderRecursively,
} from "@react-md/core/utils/RenderRecursively";
import { type ReactElement, useState } from "react";

interface Data {
  activeId: string;
  setActiveId: UseStateSetter<string>;
}

export default function SimpleExample(): ReactElement {
  const [activeId, setActiveId] = useState("/");
  return (
    <Box fullWidth disableWrap>
      <Box stacked align="stretch">
        <RenderRecursively
          // this is optional and can be any sort of info
          data={{ activeId, setActiveId }}
          items={Object.values(navItems)}
          render={Render}
        />
      </Box>
      <div>Active route: {activeId}</div>
    </Box>
  );
}

const navItems = {
  "/": {
    href: "/",
    itemId: "/",
    parentId: null,
    children: "Home",
  },
  "/route-1": {
    itemId: "/route-1",
    parentId: null,
    children: "Collapsible",
  },
  "/nested-route-1": {
    itemId: "/nested-route-1",
    parentId: "/route-1",
    children: "Child 1",
  },
  "/nested-route-2": {
    itemId: "/nested-route-2",
    parentId: "/route-2",
    children: "Child 2",
  },
  "/divider-1": {
    itemId: "/divider-1",
    parentId: null,
  },
  "/route-2": {
    itemId: "/route-2",
    parentId: null,
    children: "Route 2",
  },
} satisfies TreeData;

function Render(
  props: RenderRecursiveItemsProps<DefaultTreeItemNode, Data>
): ReactElement {
  const {
    item,
    parents,
    // this is passed down from the root `RenderRecursively`
    data,
    // this _might_ be defined based on the implementation. it's set to any
    // renderable element
    children: _children,
  } = props;
  if (item.itemId.includes("divider")) {
    return <Divider />;
  }

  if (item.items) {
    return <NestedNavigation {...props} />;
  }

  const prefix = parents.map((parent) => parent.itemId).join("/");
  const currentId = `${prefix}${item.itemId}`;
  // I haven't figured out how to manage the type safety of this yet
  const active = data?.activeId === currentId;
  // this would normally be a link, but to keep the demo simple, it's a button
  return (
    <Button
      theme={active ? "primary" : "clear"}
      themeType={active ? "contained" : "flat"}
      onClick={() => {
        data?.setActiveId(currentId);
      }}
      style={{ justifyContent: "flex-start" }}
    >
      {item.children}
    </Button>
  );
}

function NestedNavigation(
  props: RenderRecursiveItemsProps<DefaultTreeItemNode, Data>
): ReactElement {
  const {
    item,
    parents: _parents,
    // this is passed down from the root `RenderRecursively`
    data: _data,
    children,
  } = props;
  const { toggle, toggled: collapsed } = useToggle(false);
  const { elementProps } = useCollapseTransition({
    transitionIn: !collapsed,
  });

  return (
    <li>
      <Button onClick={toggle}>{item.children}</Button>
      <List {...elementProps}>{children}</List>
    </li>
  );
}
