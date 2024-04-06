import { Avatar } from "@react-md/core/avatar/Avatar";
import { cssUtils, type ThemeColor } from "@react-md/core/cssUtils";
import { Divider } from "@react-md/core/divider/Divider";
import { ListSubheader } from "@react-md/core/list/ListSubheader";
import { type RenderRecursiveItemsProps } from "@react-md/core/utils/RenderRecursively";
import { type ReactElement } from "react";
import { CollapsibleMainNavigationGroup } from "./CollapsibleMainNavigationGroup.jsx";
import { MainNavigationLink } from "./MainNavigationLink.jsx";
import { getHrefFromParents } from "./getHrefFromParents.js";
import { type NavigationItem } from "./navItems.js";

export function RenderMainNavigationItem({
  item,
  data,
  children,
  parents,
}: RenderRecursiveItemsProps<NavigationItem>): ReactElement {
  if ("type" in item) {
    if (item.type === "divider") {
      return <Divider />;
    }

    if (item.type === "subheader") {
      return <ListSubheader>{item.children}</ListSubheader>;
    }

    if (item.type === "group") {
      return (
        <>
          <ListSubheader>{item.children}</ListSubheader>
          {children}
        </>
      );
    }
  }

  if (item.items) {
    return (
      <CollapsibleMainNavigationGroup
        data={data}
        item={item}
        parents={[item, ...parents]}
      >
        {children}
      </CollapsibleMainNavigationGroup>
    );
  }

  const { isClient } = item;
  let leftAddon: ReactElement | undefined;
  if (typeof isClient === "boolean") {
    const theme: ThemeColor = isClient ? "warning" : "success";
    leftAddon = (
      <Avatar
        size="icon"
        className={cssUtils({
          textColor: `on-${theme}`,
          backgroundColor: theme,
        })}
      >
        {isClient ? "C" : "S"}
      </Avatar>
    );
  }

  return (
    <MainNavigationLink
      href={`${getHrefFromParents(parents)}${item.href}`}
      leftAddon={leftAddon}
    >
      {item.children}
    </MainNavigationLink>
  );
}
