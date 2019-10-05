import React, { FC, memo, useRef } from "react";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";
import {
  Tree,
  TreeItemExpansion,
  TreeItemSelection,
  useTreeItemExpansion,
} from "@react-md/tree";
import { SingletonRouter, withRouter } from "next/router";

import { routesTree } from "constants/routesTree";

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
    />
  );
});

const RoutedTree: FC<{ router: SingletonRouter }> = ({ router }) => (
  <NavigationTree pathname={router.pathname} />
);

export default withRouter(RoutedTree);
