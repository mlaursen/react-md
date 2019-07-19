import React, { FC, memo, useEffect, useRef } from "react";
import { SingletonRouter, withRouter } from "next/router";
import { Divider } from "@react-md/divider";
import { ListSubheader } from "@react-md/list";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";
import {
  AnyRecord,
  findAllParentIds,
  FlattenedTreeData,
  Tree,
  TreeItem,
  TreeItemRenderer,
  useFlattenedTree,
  useTreeItemExpansion,
  OnItemExpandedChange,
} from "@react-md/tree";

import LinkUnstyled from "components/LinkUnstyled";
import {
  RouteDivider,
  RouteLink,
  routesTree,
  RoutesTreeData,
  RouteSubheader,
} from "constants/routesTree";

import "./NavigationTree.scss";

/**
 * A custom tree-item renderer that can also create dividers and subheader
 * components within the tree based on attributes on the item.
 */
const itemRenderer: TreeItemRenderer<AnyRecord | RoutesTreeData> = (
  props,
  item,
  _treeProps
) => {
  if ((item as RouteDivider).divider) {
    return <Divider key={props.key} />;
  }

  const { leftIcon, href, rel, target, children } = item as RouteLink;
  if ((item as RouteSubheader).subheader) {
    return (
      <ListSubheader key={props.key} id={props.id} role="none">
        {children}
      </ListSubheader>
    );
  }

  return (
    <TreeItem
      {...props}
      expanderIcon={<KeyboardArrowDownSVGIcon />}
      leftIcon={leftIcon}
      href={href}
      rel={rel}
      target={target}
      contentComponent={href ? LinkUnstyled : undefined}
    >
      {children}
    </TreeItem>
  );
};

const onItemSelect = (): void => {};

interface CustomExpansionReturnValue {
  expandedIds: string[];
  onItemExpandedChange: OnItemExpandedChange;
}

function useCustomItemExpansion(
  pathname: string,
  data: FlattenedTreeData<RoutesTreeData>[]
): CustomExpansionReturnValue {
  const {
    expandedIds,
    onItemExpandedChange,
    onMultipleItemExpansion,
  } = useTreeItemExpansion(() => findAllParentIds(data, [pathname]));

  const pathnameRef = useRef(pathname);
  if (pathname !== pathnameRef.current) {
    const nextIds = findAllParentIds(data, [pathname]).filter(
      id => !expandedIds.includes(id)
    );

    if (nextIds.length) {
      onMultipleItemExpansion([...expandedIds, ...nextIds]);
    }
  }

  useEffect(() => {
    pathnameRef.current = pathname;
  });

  return { expandedIds, onItemExpandedChange };
}

const NavigationTree: FC<{ pathname: string }> = memo(({ pathname }) => {
  const data = useFlattenedTree<RoutesTreeData>(routesTree, null);
  const { expandedIds, onItemExpandedChange } = useCustomItemExpansion(
    pathname,
    data
  );

  return (
    <Tree
      id="main-navigation-tree"
      aria-label="Main Navigation"
      defaultActiveId="main-navigation-tree-item-0"
      data={data}
      selectedIds={[pathname]}
      expandedIds={expandedIds}
      onItemSelect={onItemSelect}
      onItemExpandedChange={onItemExpandedChange}
      itemRenderer={itemRenderer}
    />
  );
});

const RoutedTree: FC<{ router: SingletonRouter }> = ({ router }) => (
  <NavigationTree pathname={router.pathname} />
);

export default withRouter(RoutedTree);
