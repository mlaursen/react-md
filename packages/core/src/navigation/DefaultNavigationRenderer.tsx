import { type ReactElement } from "react";

import { Divider } from "../divider/Divider.js";
import { type RenderRecursiveItemsProps } from "../utils/RenderRecursively.js";
import { CollapsibleNavGroup } from "./CollapsibleNavGroup.js";
import { NavItemLink } from "./NavItemLink.js";
import { NavSubheader } from "./NavSubheader.js";
import { type NavigationItem, type NavigationRenderData } from "./types.js";
import { getHrefFromParents, getNavigationGroupId } from "./utils.js";

/**
 * @since 6.0.0
 */
export type DefaultNavigationRendererProps<
  Item extends NavigationItem = NavigationItem,
  Data extends NavigationRenderData = NavigationRenderData,
> = RenderRecursiveItemsProps<Item, Data>;

/**
 * **Client Component**
 *
 * The default behavior is attempt to render in order:
 * - `const { type, items, ...props } = item`
 * - `type === "divider"` - `<Divider {...props} />`
 * - `type === "subheader"` - `<NavSubheader {...props} />`
 * - `type === "group"` - `<><NavSubheader {...props} />{children}</>`
 * - `!!items` - `<CollapsibleNavGroup />`
 * - `<NavItemLink {...item} as={linkComponent} active={pathname === href} />`
 *
 * @see {@link https://next.react-md.dev/components/navigation | Navigation Demos}
 * @since 6.0.0
 */
export function DefaultNavigationRenderer<
  Item extends NavigationItem,
  Data extends NavigationRenderData,
>(props: DefaultNavigationRendererProps<Item, Data>): ReactElement {
  const { item, data, children, parents } = props;
  switch (item.type) {
    case "divider": {
      const { type: _type, items: _items, ...divider } = item;
      return <Divider {...divider} />;
    }
    case "subheader": {
      const { type: _type, items: _items, ...subheader } = item;
      return <NavSubheader {...subheader} />;
    }
  }

  if (item.items) {
    const nextParents = [item, ...parents];
    const id = getNavigationGroupId(item, nextParents);
    return (
      <CollapsibleNavGroup
        depth={nextParents.length}
        collapsed={!data?.expandedItems.has(id)}
        buttonChildren={item.children}
        toggleCollapsed={() => {
          data?.toggleExpandedItem(id);
        }}
      >
        {children}
      </CollapsibleNavGroup>
    );
  }

  const href = `${getHrefFromParents(parents)}${item.href}`;
  return (
    <NavItemLink
      {...item}
      as={data?.linkComponent}
      active={("active" in item && !!item.active) || data?.pathname === href}
      href={href}
    />
  );
}
