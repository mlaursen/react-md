import React, { FunctionComponent } from "react";
import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import { Divider } from "@react-md/divider";
import { ListSubheader } from "@react-md/list";
import {
  FlattenedTreeSort,
  Tree,
  TreeItem,
  TreeItemRenderer,
  useFlattenedTree,
  useTreeItemExpansion,
  useTreeItemSelect,
  FlattenedTreeData,
} from "@react-md/tree";

import routesTree, { RoutesTreeData, RoutesTree } from "constants/routesTree";

import "./navigation-tree.scss";

const L: FunctionComponent<any> = ({ href, children, ...props }) => (
  <Link href={href} prefetch scroll={false}>
    <a {...props}>{children}</a>
  </Link>
);

const itemRenderer: TreeItemRenderer = (
  props,
  { children, href, target, leftIcon, leftAvatar, subheader, divider },
  treeProps
) => {
  if (divider) {
    return <Divider key={props.key} />;
  } else if (subheader) {
    return (
      <ListSubheader key={props.key} id={props.id}>
        {children}
      </ListSubheader>
    );
  }

  return (
    <TreeItem
      {...props}
      leftIcon={leftIcon}
      leftAvatar={leftAvatar}
      href={href}
      target={target}
      contentComponent={href ? L : undefined}
    >
      {children}
    </TreeItem>
  );
};

const noop = () => {};

const sort: FlattenedTreeSort<RoutesTreeData> = data => {
  const sorted = data.slice();
  sorted.sort((a, b) => {
    if (a.index === 0) {
      return -1;
    } else if (b.index === 0) {
      return 1;
    }

    return a.index - b.index;
  });

  return sorted;
};

const getIndexes = (item: FlattenedTreeData<RoutesTreeData>) => {
  const indexes = [item.index];
  let current = routesTree[item.parentId || ""];
  while (current) {
    indexes.unshift(current.index);
    current = routesTree[current.parentId || ""];
  }

  return indexes;
};

const NavigationTree: FunctionComponent<{ router: SingletonRouter }> = ({
  router,
}) => {
  const data = useFlattenedTree<RoutesTreeData>(routesTree, null, sort);
  const { selectedIds, onItemSelect } = useTreeItemSelect(() => {
    const item = routesTree[router.pathname] || routesTree["/"];
    return [item.itemId];
  });
  const { expandedIds, onItemExpandedChange } = useTreeItemExpansion(() => {
    const item = routesTree[router.pathname] || routesTree["/"];
    return [];
  });
  return (
    <Tree
      id="main-navigation-tree"
      aria-label="Main Navigation"
      defaultActiveId="main-navigation-tree-item-0"
      data={data}
      selectedIds={selectedIds}
      expandedIds={expandedIds}
      onItemSelect={onItemSelect}
      onItemExpandedChange={onItemExpandedChange}
      itemRenderer={itemRenderer}
    />
  );
};

export default withRouter(NavigationTree);
