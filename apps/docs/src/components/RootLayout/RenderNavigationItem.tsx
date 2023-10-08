import { type NavigationItem } from "@/constants/navItems.js";
import {
  Avatar,
  Divider,
  ListSubheader,
  cssUtils,
  type RenderRecursiveItemsProps,
  type ThemeColor,
} from "@react-md/core";
import { type ReactElement } from "react";
import { CollapsibleNavigationItemGroup } from "./CollapsibleNavigationItemGroup.jsx";
import { NavigationItemLink } from "./NavigationItemLink.jsx";
import { getHrefFromParents } from "./getHrefFromParents.js";

export function RenderNavigationItem(
  props: RenderRecursiveItemsProps<NavigationItem>
): ReactElement | null {
  const { item, data, children, parents } = props;
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
      <CollapsibleNavigationItemGroup
        data={data}
        item={item}
        parents={[item, ...parents]}
      >
        {children}
      </CollapsibleNavigationItemGroup>
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
    <NavigationItemLink
      href={`${getHrefFromParents(parents)}${item.href}`}
      leftAddon={leftAddon}
    >
      {item.children}
    </NavigationItemLink>
  );
}
