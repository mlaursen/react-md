/* eslint-disable @typescript-eslint/no-use-before-define */
"use client";
import {
  LinkUnstyled,
  type LinkUnstyledProps,
} from "@/components/LinkUnstyled.jsx";
import {
  Divider,
  IconRotator,
  ListSubheader,
  cssUtils,
  typography,
  useCollapseTransition,
  useElementInteraction,
  getIcon,
  useToggle,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import { type ReactElement, type ReactNode } from "react";
import styles from "./NavigationItemList.module.scss";

export interface Route {
  href: string;
  children: ReactNode;
  items?: readonly NavigationItem[];
}

export type NavigationItem =
  | Route
  | (
      | { key: string; type: "divider" }
      | { key: string; type: "subheader"; children: ReactNode }
      | {
          key: string;
          type: "group";
          children: ReactNode;
          items: readonly NavigationItem[];
        }
    );

export interface NavigationItemListProps {
  items: readonly NavigationItem[];
  depth: number;
  collapsed?: boolean;
  hrefPrefix?: string;
}

export function NavigationItemList(
  props: NavigationItemListProps
): ReactElement {
  const { items, hrefPrefix = "", collapsed, depth } = props;
  const { elementProps } = useCollapseTransition({
    temporary: false,
    transitionIn: !collapsed,
    className: typography({ className: styles.list, type: "subtitle-1" }),
    style: {
      "--rmd-tree-depth": depth,
    },
  });

  return (
    <ul {...elementProps}>
      {items.map((item) => (
        <RenderRoute
          key={"key" in item ? item.key : item.href}
          item={item}
          depth={depth}
          hrefPrefix={hrefPrefix}
        />
      ))}
    </ul>
  );
}

interface RenderRouteProps {
  item: NavigationItem;
  depth: number;
  hrefPrefix: string;
}

function RenderRoute(props: RenderRouteProps): ReactElement {
  const { item, depth, hrefPrefix } = props;
  if ("type" in item) {
    switch (item.type) {
      case "divider":
        return <Divider />;
      case "subheader":
        return (
          <ListSubheader className={styles.item}>{item.children}</ListSubheader>
        );
      case "group":
        return (
          <NavigationItemGroup
            depth={depth}
            items={item.items}
            hrefPrefix={hrefPrefix}
          >
            {item.children}
          </NavigationItemGroup>
        );
    }
  }

  const { children, href, items } = item;
  if (items) {
    return (
      <NestedNavigationItem
        href={`${hrefPrefix}${href}`}
        items={items}
        depth={depth}
      >
        {children}
      </NestedNavigationItem>
    );
  }

  return (
    <NavigationItemLink href={`${hrefPrefix}${href}`}>
      {children}
    </NavigationItemLink>
  );
}

function NavigationItemLink(props: LinkUnstyledProps): ReactNode {
  const { children, href } = props;

  const { handlers, ripples } = useElementInteraction();
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <li>
      <LinkUnstyled
        {...handlers}
        href={href}
        className={cnb(
          styles.item,
          styles.link,
          active && styles.active,
          cssUtils({
            fontWeight: active ? "bold" : undefined,
            textDecoration: "none",
          })
        )}
      >
        {children}
        {ripples}
      </LinkUnstyled>
    </li>
  );
}

function NavigationItemGroup(props: {
  children: ReactNode;
  items: readonly NavigationItem[];
  hrefPrefix: string;
  depth: number;
}): ReactElement {
  const { items, depth, hrefPrefix, children } = props;
  return (
    <>
      <ListSubheader className={cnb(styles.item, styles.subheader)}>
        {children}
      </ListSubheader>
      {items.map((item) => (
        <RenderRoute
          key={"key" in item ? item.key : item.href}
          item={item}
          depth={depth}
          hrefPrefix={hrefPrefix}
        />
      ))}
    </>
  );
}

interface NestedNavigationItemProps extends Route {
  depth: number;
  items: readonly NavigationItem[];
}

function NestedNavigationItem(props: NestedNavigationItemProps): ReactElement {
  const { children, href, items, depth } = props;
  const pathname = usePathname();
  const { toggled: collapsed, toggle } = useToggle(
    () => !pathname.includes(href)
  );
  const dropdownIcon = getIcon("dropdown");

  return (
    <li>
      <button
        type="button"
        onClick={toggle}
        className={cnb(styles.button, styles.item)}
      >
        {children}
        <IconRotator rotated={!collapsed}>{dropdownIcon}</IconRotator>
      </button>
      <NavigationItemList
        items={items}
        depth={depth + 1}
        hrefPrefix={href}
        collapsed={collapsed}
      />
    </li>
  );
}
