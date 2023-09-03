import type { TreeItemRendererProps } from "@react-md/core";
import {
  DefaultTreeItemRenderer,
  Divider,
  ListSubheader,
} from "@react-md/core";
import type { ReactElement } from "react";
import type { LayoutNavigationItem } from "./navItems";

export function NavigationItemRenderer(
  props: TreeItemRendererProps<LayoutNavigationItem>
): ReactElement {
  const { item } = props;
  const { divider, subheader } = item;
  if (divider) {
    return <Divider />;
  }

  if (subheader) {
    return (
      <ListSubheader role="none">{item.name ?? item.children}</ListSubheader>
    );
  }

  return <DefaultTreeItemRenderer {...props} />;
}
