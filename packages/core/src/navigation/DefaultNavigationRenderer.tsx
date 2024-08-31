import { type ReactElement } from "react";
import { Divider } from "../divider/Divider.js";
import { type RenderRecursiveItemsProps } from "../utils/RenderRecursively.js";
import { CollapsibleNavGroup } from "./CollapsibleNavGroup.js";
import { NavItemLink } from "./NavItemLink.js";
import { NavSubheader } from "./NavSubheader.js";
import { getHrefFromParents } from "./utils.js";
import { type NavigationItem, type NavigationRenderData } from "./types.js";

/**
 * @since 6.0.0
 */
export interface DefaultNavigationRendererProps<
  Item extends NavigationItem = NavigationItem,
  Data extends NavigationRenderData = NavigationRenderData,
> extends RenderRecursiveItemsProps<Item, Data> {}

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
    const href = getHrefFromParents(nextParents);
    return (
      <CollapsibleNavGroup
        depth={nextParents.length}
        collapsed={!data?.expandedItems.has(href)}
        buttonChildren={item.children}
        toggleCollapsed={() => {
          data?.toggleExpandedItem(href);
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
