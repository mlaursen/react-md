"use client";
import { type ReactElement } from "react";
import {
  NavigationItemList,
  type NavigationItem,
} from "./NavigationItemList.jsx";

const items: readonly NavigationItem[] = [
  {
    href: "/getting-started",
    children: "Getting Started",
    items: [
      {
        href: "/installation",
        children: "Installation",
      },
      {
        href: "/create-a-layout",
        children: "Create a layout",
      },
      {
        href: "/example-projects",
        children: "Example projects",
      },
    ],
  },
  {
    href: "/components",
    children: "Components",
    items: [
      {
        key: "inputs",
        type: "group",
        children: "Inputs",
        items: [
          {
            href: "/button",
            children: "Button",
          },
        ],
      },
    ],
  },
  {
    href: "/customization",
    children: "Customization",
    items: [
      {
        href: "/theme",
        children: "Theme",
      },
      {
        href: "/color-palette",
        children: "Color Palette",
      },
      {
        href: "/dark-mode",
        children: "Dark Mode",
      },
      {
        href: "/theme-builder",
        children: "Theme Builder",
      },
      {
        href: "/breakpoints",
        children: "Breakpoints",
      },
      {
        href: "/transitions",
        children: "Transitions",
      },
    ],
  },
];

export function Navigation(): ReactElement {
  return <NavigationItemList items={items} depth={0} />;
}
