import { type ElementType, type ReactElement, type ReactNode } from "react";

/**
 * @remarks \@since 6.0.0
 */
export type RecursiveItem<T = Record<string, unknown>> = T & {
  items?: readonly RecursiveItem<T>[];
};

/**
 * @remarks \@since 6.0.0
 */
export interface RenderRecursiveItemsProps<T = Record<string, unknown>> {
  /**
   * The current item to render.
   */
  item: RecursiveItem<T>;

  /**
   * The list of parent items which can be used to determine the depth or "share
   * props" if the items contained props.
   */
  parents: readonly RecursiveItem<T>[];

  /**
   * This will be provided if the {@link item} had child items and will be the
   * rendered content.
   */
  children?: ReactNode;
}

/**
 * @remarks \@since 6.0.0
 */
export interface RenderRecursivelyProps<T = Record<string, unknown>> {
  items: readonly RecursiveItem<T>[];

  /**
   * The renderer for each item.
   */
  render: ElementType<RenderRecursiveItemsProps<T>>;

  /**
   * This should not be used for external users. This is used to build the
   * {@link RenderRecursiveItemsProps.parents} list.
   *
   * @internal
   * @defaultValue `[]`
   */
  parents?: readonly RecursiveItem<T>[];

  /**
   * Gets a React `key` for a specific item. This should be provided if the
   * items can be moved around to improve performance.
   *
   * @example
   * ```ts
   * getItemKey={(item) => item.id}
   * ```
   *
   * @defaultValue `() => ${parents.length}-${index}`.
   */
  getItemKey?(item: RecursiveItem<T>): string;
}

/**
 * Helper component for recursively rendering specific data structures (mostly
 * trees). The main use-case is for rendering site navigation and the `Tree`
 * component.
 *
 * @example
 * ```tsx
 * import {
 *   buildTree,
 *   List,
 *   ListItem,
 *   ListItemLink,
 *   RenderRecursively,
 *   TreeData,
 *   type DefaultTreeItemNode,
 *   type RenderRecursiveItemsProps,
 * } from "@react-md/core";
 * import { type ReactElement } from "react";
 *
 * const navItems = {
 *   "/": {
 *     href: "/",
 *     itemId: "/",
 *     parentId: null,
 *     children: "Home",
 *   },
 *   "/route-1": {
 *     itemId: "/route-1",
 *     parentId: null,
 *     children: "Collapsible",
 *   },
 *   "/nested-route-1": {
 *     itemId: "/nested-route-1",
 *     parentId: "/route-1",
 *     children: "Child 1",
 *   },
 *   "/nested-route-2": {
 *     itemId: "/nested-route-2",
 *     parentId: "/route-2",
 *     children: "Child 2",
 *   },
 *   "/divider-1": {
 *     itemId: "/divider-1",
 *     parentId: null
 *   },
 *   "/route-2": {
 *     itemId: "/route-2"
 *     parentId: null,
 *     children: "Route 2",
 *   },
 * } satisfies TreeData;
 *
 * function NestedNavigation(props: RenderRecursiveItemsProps<DefaultTreeItemNode>): ReactElement {
 *   const { item, parents, children } = props;
 *   const { toggle, toggled: collapsed } = useToggle(false);
 *   const { elementProps } = useCollapseTransition({
 *     transitionIn: !collapsed,
 *   });
 *
 *   return (
 *     <li>
 *       <Button onClick={toggle}>{item.children}</Button>
 *       <List {...elementProps}>{children}</List>
 *     </li>
 *   ):
 * }
 *
 *
 * function Render(props: RenderRecursiveItemsProps<DefaultTreeItemNode>): ReactElement {
 *   const { item, parents } = props;
 *   if (item.itemId.includes("divider")) {
 *     return <Divider />;
 *   }
 *
 *   if (item.items) {
 *     return <NestedNavigation {...props} />
 *   }
 *
 *   const prefix = parents.map((parent) => parent.itemId).join("/");
 *   return (
 *     <Link href={`${prefix}${item.itemId}`}>
 *       {item.children}
 *     </Link>
 *   );
 * }
 * ```
 *
 *
 * @remarks \@since 6.0.0
 */
export function RenderRecursively<T>(
  props: RenderRecursivelyProps<T>
): ReactElement {
  const { items, render: Render, getItemKey, parents = [] } = props;

  return (
    <>
      {items.map((item, index) => {
        let children: ReactNode;
        const depth = parents.length;
        if (item.items?.length) {
          children = (
            <RenderRecursively
              items={item.items}
              render={Render}
              getItemKey={getItemKey}
              parents={[...parents, item]}
            />
          );
        }

        return (
          <Render
            key={getItemKey ? getItemKey(item) : `${depth}-${index}`}
            item={item}
            parents={parents}
          >
            {children}
          </Render>
        );
      })}
    </>
  );
}
