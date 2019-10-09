import React, { FC, memo, useRef } from "react";
import { useRouter } from "next/router";
import { Divider } from "@react-md/divider";
import { ListSubheader } from "@react-md/list";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";
import {
  defaultTreeItemRenderer,
  Tree,
  TreeItemExpansion,
  TreeItemRenderer,
  TreeItemSelection,
  useTreeItemExpansion,
} from "@react-md/tree";

import { RouteItem, routesTree } from "constants/routesTree";

export interface NavigationTreeProps {
  pathname: string;
}

interface TreeState extends TreeItemSelection, TreeItemExpansion {}

const noop = (): void => {};

function getParentIds(pathname: string): string[] {
  let route = routesTree[pathname];

  const ids: string[] = [];
  while (route && route.parentId) {
    ids.push(route.parentId);
    route = routesTree[route.parentId];
  }

  return ids;
}

function useNavigation(pathname: string): TreeState {
  const {
    expandedIds,
    onItemExpansion,
    onMultiItemExpansion,
  } = useTreeItemExpansion(() => getParentIds(pathname));
  const prevPathname = useRef(pathname);
  if (pathname !== prevPathname.current) {
    prevPathname.current = pathname;
    const ids = Array.from(
      new Set([...expandedIds, ...getParentIds(pathname)])
    );

    if (ids.length !== expandedIds.length) {
      onMultiItemExpansion(ids);
    }
  }

  return {
    multiSelect: false,
    selectedIds: [pathname],
    onItemSelect: noop,
    onMultiItemSelect: noop,
    expandedIds,
    onItemExpansion,
    onMultiItemExpansion,
  };
}

const itemRenderer: TreeItemRenderer<RouteItem> = (
  itemProps,
  item,
  treeProps
) => {
  const { key } = itemProps;
  const { divider, subheader } = item;
  if (divider) {
    return <Divider key={key} />;
  }

  if (subheader) {
    return (
      <ListSubheader key={key} role="none">
        {item.children}
      </ListSubheader>
    );
  }

  return defaultTreeItemRenderer(itemProps, item, treeProps);
};

const NavigationTree: FC<NavigationTreeProps> = memo(({ pathname }) => {
  const state = useNavigation(pathname.replace(/\?.*$/, ""));
  return (
    <Tree
      id="main-navigation-tree"
      aria-label="Main Navigation"
      data={routesTree}
      labelKey="children"
      valueKey="children"
      {...state}
      expanderIcon={<KeyboardArrowDownSVGIcon />}
      itemRenderer={itemRenderer}
    />
  );
});

const RoutedTree: FC = () => {
  const router = useRouter();

  return <NavigationTree pathname={router.pathname} />;
};

export default RoutedTree;
