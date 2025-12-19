import {
  type NavigationItemStringChildrenRoute,
  createNavItems,
  sortNavItems,
} from "docs-generator/utils/createNavItems";
import { type GeneratedSassDoc } from "sassdoc-generator";

import { titleCase } from "../../src/utils/strings.js";
import { GENERATED_SASSDOC_NAV_ITEMS_FILE } from "../constants.js";

export async function generateNavItems(
  options: GeneratedSassDoc
): Promise<void> {
  const { mixins, functions, variables } = options;
  const groups = new Set<string>();
  for (const [, item] of mixins) {
    groups.add(item.group);
  }
  for (const [, item] of functions) {
    groups.add(item.group);
  }
  for (const [, item] of variables) {
    groups.add(item.group);
  }

  const components: NavigationItemStringChildrenRoute[] = [];
  const remainingItems: NavigationItemStringChildrenRoute[] = [];
  for (const group of groups) {
    if (group.startsWith("core.")) {
      const withoutCore = group.replace("core.", "");
      if (withoutCore === "form") {
        components.push({
          type: "route",
          href: "/form",
          children: "Form",
        });
      } else {
        remainingItems.push({
          type: "route",
          href: `/${withoutCore}`,
          children: titleCase(withoutCore, "-"),
        });
      }
    } else {
      components.push({
        type: "route",
        href: `/${group}`,
        children: titleCase(group, "-"),
      });
    }
  }

  await createNavItems({
    name: "SASSDOC_NAV_ITEMS",
    href: "/sassdoc",
    children: "Sass API Docs",
    fileName: GENERATED_SASSDOC_NAV_ITEMS_FILE,
    items: [
      { type: "subheader", children: "Core" },
      ...sortNavItems(remainingItems),
      { type: "subheader", children: "Components" },
      ...sortNavItems(components),
    ],
  });
}
