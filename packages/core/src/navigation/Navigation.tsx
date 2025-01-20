import { type ComponentType, type ReactElement } from "react";

import { type ListProps } from "../list/List.js";
import {
  type RecursiveItem,
  type RecursiveItemKeyOptions,
  type RenderRecursiveItemsProps,
  RenderRecursively,
  getRecursiveItemKey,
} from "../utils/RenderRecursively.js";
import { DefaultNavigationRenderer } from "./DefaultNavigationRenderer.js";
import { NavGroup } from "./NavGroup.js";
import { type NavigationItem, type NavigationRenderData } from "./types.js";

/**
 * The default implementation for the nav item keys. It will attempt to set the
 * key in the following order:
 * - `href` if it exists and has length
 * - `children` if it's a string and has length
 * - default {@link getRecursiveItemKey} behavior of `${depth}-${index}`
 *
 * @since 6.0.0
 */
export function getRecursiveNavItemKey<
  Item extends NavigationItem = NavigationItem,
>(options: RecursiveItemKeyOptions<Item>): string {
  const { item } = options;
  // if it's a route, try setting the key to the href since they are generally
  // unique
  if ("href" in item && item.href) {
    return item.href;
  }

  // if children exist in the item (group, route, subheader), try to set that as
  // the key since they are usually unique
  if (
    "children" in item &&
    typeof item.children === "string" &&
    item.children
  ) {
    return item.children;
  }

  // use the default key behavior if all else fails
  return getRecursiveItemKey(options);
}

/**
 * @since 6.0.0
 */
export interface NavigationProps<
  Item extends NavigationItem = NavigationItem,
  Data extends NavigationRenderData = NavigationRenderData,
> extends Omit<ListProps, "children"> {
  data: Data;
  items: readonly RecursiveItem<Item>[];

  /** @see {@link DefaultNavigationRenderer} */
  render?: ComponentType<RenderRecursiveItemsProps<Item, Data>>;

  /** @see {@link getRecursiveNavItemKey} */
  getItemKey?: (options: RecursiveItemKeyOptions<Item>) => string;
}

/**
 * **Client Component**
 *
 * @since 6.0.0
 */
export function Navigation<
  Item extends NavigationItem,
  Data extends NavigationRenderData,
>(props: NavigationProps<Item, Data>): ReactElement {
  const {
    data,
    items,
    render = DefaultNavigationRenderer,
    getItemKey = getRecursiveNavItemKey,
    ...remaining
  } = props;

  return (
    <NavGroup depth={0} {...remaining}>
      <RenderRecursively
        data={data}
        items={items}
        render={render}
        getItemKey={getItemKey}
      />
    </NavGroup>
  );
}
