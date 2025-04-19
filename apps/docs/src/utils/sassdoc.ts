import {
  type TableOfContentsHeading,
  type TableOfContentsHeadings,
} from "@react-md/core/navigation/types";
import {
  type FormattedItem,
  type FormattedSassDocItem,
  type FormattedVariableItem,
  type ItemReferenceLink,
} from "sassdoc-generator/types";

import { slug } from "@/utils/slug.js";

export const getGroupName = (itemOrGroup: FormattedItem | string): string => {
  const group =
    typeof itemOrGroup === "string" ? itemOrGroup : itemOrGroup.group;
  return group.replace(/^core\./, "");
};

export function isFormattedVariableItem(
  item: FormattedSassDocItem
): item is FormattedVariableItem {
  return item.type !== "mixin" && item.type !== "function";
}

export function getSassDocLink(
  item: FormattedSassDocItem | ItemReferenceLink
): string {
  let { type } = item;
  const { name, group } = item;
  if ("originalName" in item && isFormattedVariableItem(item)) {
    type = "variable";
  }

  return `/sassdoc/${getGroupName(group)}#${type}s-${name}`;
}

export function createTOC(
  lookup: ReadonlyMap<string, FormattedSassDocItem>,
  children: string
): TableOfContentsHeadings {
  const toc: TableOfContentsHeading[] = [];
  if (!lookup.size) {
    return toc;
  }

  const baseId = slug(children);
  toc.push({ id: baseId, depth: 1, children });
  lookup.forEach((item) => {
    const itemId = slug(`${baseId}-${item.name}`);
    toc.push({
      id: itemId,
      depth: 2,
      children: item.name,
    });
    if ("returns" in item && item.returns) {
      toc.push({
        id: `${itemId}-returns`,
        depth: 3,
        children: "Returns",
      });
    }

    if ("parameters" in item && item.parameters?.length) {
      toc.push({
        id: `${itemId}-parameters`,
        depth: 3,
        children: "Parameters",
      });
    }

    if ("throws" in item && item.throws?.length) {
      toc.push({
        id: `${itemId}-throws`,
        depth: 3,
        children: "Throws",
      });
    }

    if (item.examples?.length) {
      toc.push({
        id: `${itemId}-examples`,
        depth: 3,
        children: "Examples",
      });

      item.examples.forEach((example) => {
        if (!example.description) {
          return;
        }

        toc.push({
          id: slug(`${itemId}-example-${example.description}`),
          depth: 4,
          children: example.description,
        });
      });
    }
  });

  return toc;
}
