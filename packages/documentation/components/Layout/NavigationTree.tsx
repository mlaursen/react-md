import React, { FunctionComponent, useRef, useEffect, memo } from "react";
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
  findAllParentIds,
  FlattenedTreeData,
  AnyRecord,
} from "@react-md/tree";

import {
  RoutesTreeData,
  RoutesTree,
  routesTree,
  RouteDivider,
  RouteSubheader,
  RouteLink,
} from "constants/routesTree";
import LinkUnstyled from "components/LinkUnstyled";

import "./navigation-tree.scss";

/**
 * A custom tree-item renderer that can also create dividers and subheader
 * components within the tree based on attributes on the item.
 */
const itemRenderer: TreeItemRenderer<AnyRecord | RoutesTreeData> = (
  props,
  item,
  treeProps
) => {
  if ((item as RouteDivider).divider) {
    return <Divider key={props.key} />;
  }

  const { leftIcon, href, target, children } = item as RouteLink;
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
      leftIcon={leftIcon}
      href={href}
      target={target}
      contentComponent={href ? LinkUnstyled : undefined}
    >
      {children}
    </TreeItem>
  );
};

const onItemSelect = () => {};

function useCustomItemExpansion(
  pathname: string,
  data: FlattenedTreeData<RoutesTreeData>[]
) {
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

const NavigationTree: FunctionComponent<{ pathname: string }> = memo(
  ({ pathname }) => {
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
  }
);

const RoutedTree: FunctionComponent<{ router: SingletonRouter }> = ({
  router,
}) => <NavigationTree pathname={router.pathname} />;

export default withRouter(RoutedTree);
