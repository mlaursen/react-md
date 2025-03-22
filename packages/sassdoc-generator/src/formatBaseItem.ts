import { type Item } from "sassdoc";

import { formatDescription } from "./formatDescription.js";
import { formatExamples } from "./formatExamples.js";
import { isPrivateItem } from "./isPrivateItem.js";
import { type FormattedItem, type FormattedItemLink } from "./types.js";

export function getItemPublicName(name: string, group: string): string {
  let itemName = name;
  if (!group.startsWith("core.")) {
    itemName = `${group}-${name}`;
  }

  return itemName;
}

export function getItemGroup(item: Item): string {
  const [group] = item.group;
  if (!group) {
    throw new Error(
      `${item.context.name} in ${item.file.path} does not have a \`@group\` annotation`
    );
  }
  return group;
}

export function getItemName(item: Item): string {
  const { name } = item.context;
  const group = getItemGroup(item);

  return getItemPublicName(name, group);
}

export interface FormatBaseItemOptions {
  src: string;
  item: Item;
}

export async function formatBaseItem(
  options: FormatBaseItemOptions
): Promise<FormattedItem> {
  const { src, item } = options;
  const {
    context: { name: originalName, line },
    description = "",
    file: { path },
    link,
    example,
    since,
  } = item;

  const group = getItemGroup(item);
  const examples = await formatExamples({
    src,
    name: originalName,
    path,
    examples: example,
  });

  let links: FormattedItemLink[] | undefined;
  if (link) {
    links = link.map(({ url, caption }) => ({
      name: caption || "",
      href: url,
    }));
  }

  let source = `packages/core/src/${path}`;
  if (typeof line.start === "number") {
    source += `#L${line.start}`;
  }

  if (line.start !== line.end && typeof line.end === "number") {
    source += `-L${line.end}`;
  }

  let name = originalName;
  if (!group.startsWith("core.")) {
    name = `${group}-${originalName}`;
  }

  return {
    name,
    originalName,
    group,
    description: formatDescription(description),
    source,
    since: since?.[0]?.version,
    links,
    examples,
    private: isPrivateItem(item),
  };
}
