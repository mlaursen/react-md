import {
  type ItemQuickReference,
  type ItemReference,
  type ItemRequire,
} from "sassdoc";

import { getItemName, getItemPublicName } from "./formatBaseItem.js";
import { type FullItemReferenceLink, type ItemReferenceLink } from "./types.js";

type ReferenceLink = ItemReference | ItemRequire | ItemQuickReference;

const isItemRequire = (item: ReferenceLink): item is ItemRequire =>
  typeof (item as ItemRequire).item !== "undefined";

export function getItemReferenceLinks(
  items: readonly ReferenceLink[] | undefined,
  referenceLinks: ReadonlyMap<string, FullItemReferenceLink>
): ItemReferenceLink[] | undefined {
  if (!items) {
    return undefined;
  }

  const added = new Set<string>();
  const links = items.reduce<ItemReferenceLink[]>((list, item) => {
    let name: string;
    if (isItemRequire(item)) {
      name = getItemName(item.item);
    } else if ("group" in item) {
      const group = item.group?.[0];
      if (!group) {
        throw new Error("Invalid reference link group");
      }

      name = getItemPublicName(item.context.name, group);
    } else {
      throw new Error("Unable to get referenc elink name");
    }

    const link = referenceLinks.get(name);
    if (!link) {
      throw new Error("Unable to find link");
    }

    if (!added.has(name)) {
      added.add(name);
      const { private: _private, ...remaining } = link;
      list.push(remaining);
    }

    return list;
  }, []);

  return links.length ? links : undefined;
}
