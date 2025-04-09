import { searchClient } from "@algolia/client-search";
import { parseMdx } from "docs-generator/scripts/algolia/parseMdx";
import { type IndexedItem } from "docs-generator/scripts/algolia/types";
import { log } from "docs-generator/utils/log";
import { config } from "dotenv";
import { glob } from "glob";
import { join } from "node:path";
import { generate } from "sassdoc-generator";
import {
  type FormattedFunctionItem,
  type FormattedMixinItem,
  type FormattedSassDocItem,
  type FormattedVariableItem,
} from "sassdoc-generator/types";

import { titleCase } from "../src/utils/strings.js";
import { CORE_SRC } from "./constants.js";

const BASE_URL = "https://next.react-md.dev";

async function indexMdxPages(): Promise<readonly IndexedItem[]> {
  const mdxPages = await glob("src/app/**/page.mdx");
  return await Promise.all(
    mdxPages.map(async (mdxFilePath) => {
      try {
        return parseMdx({
          baseUrl: BASE_URL,
          mdxFilePath,
        });
      } catch (e) {
        console.error(`Error parsing: ${mdxFilePath}`);
        throw e;
      }
    })
  );
}

interface SassDocGroup {
  mixins: Map<string, FormattedMixinItem>;
  functions: Map<string, FormattedFunctionItem>;
  variables: Map<string, FormattedVariableItem>;
}

async function indexSassDocPages(): Promise<readonly IndexedItem[]> {
  const { mixins, functions, variables } = await generate({ src: CORE_SRC });

  const grouped = new Map<string, SassDocGroup>();
  const getGroupName = (itemOrGroup: FormattedSassDocItem | string): string => {
    const group =
      typeof itemOrGroup === "string" ? itemOrGroup : itemOrGroup.group;
    return group.replace(/^core\./, "");
  };
  const getSassDocLink = (item: FormattedSassDocItem): string => {
    let type: string = item.type;
    const { name, group } = item;
    if (
      "originalName" in item &&
      item.type !== "function" &&
      item.type !== "mixin"
    ) {
      type = "variable";
    }

    return `/sassdoc/${getGroupName(group)}#${type}s-${name}`;
  };
  const getByGroupName = (groupName: string): SassDocGroup => {
    return (
      grouped.get(groupName) || {
        mixins: new Map(),
        functions: new Map(),
        variables: new Map(),
      }
    );
  };
  mixins.forEach((item) => {
    if (!item || item.private) {
      return;
    }
    const groupName = getGroupName(item);
    const group = getByGroupName(groupName);
    group.mixins.set(item.name, item);
    grouped.set(groupName, group);
  });
  functions.forEach((item) => {
    if (!item || item.private) {
      return;
    }
    const groupName = getGroupName(item);
    const group = getByGroupName(groupName);
    group.functions.set(item.name, item);
    grouped.set(groupName, group);
  });
  variables.forEach((item) => {
    if (!item || item.private) {
      return;
    }
    const groupName = getGroupName(item);
    const group = getByGroupName(groupName);
    group.variables.set(item.name, item);
    grouped.set(groupName, group);
  });

  const items: IndexedItem[] = [];
  grouped.forEach((item, group) => {
    const groupTitle = titleCase(group, "-");
    const pathname = `/sassdoc/${getGroupName(group)}`;
    const url = `${BASE_URL}${pathname}`;
    items.push({
      objectID: url,
      url,
      pathname,
      type: "page",
      title: `${groupTitle} - Sass API Docs`,
      docGroup: "Sass",
      docType: "API Docs",
      description: `Provides the Sass documentation for the ${groupTitle} group of items`,
      headings: [],
      keywords: ["sass", "sassdoc", "function", "variable", "mixin"],
    });

    [
      ...item.mixins.values(),
      ...item.functions.values(),
      ...item.variables.values(),
    ].forEach((sassdocItem) => {
      const { name, description, type } = sassdocItem;
      const itemPathname = getSassDocLink(sassdocItem);
      const url = `${BASE_URL}${itemPathname}`;
      const itemType =
        type === "mixin" || type === "function" ? type : "variable";

      items.push({
        objectID: url,
        url,
        pathname: itemPathname,
        type: "sassdoc",
        itemType,
        name: itemType === "variable" ? `$${name}` : name,
        group: groupTitle,
        description,
      });
    });
  });

  return items;
}

async function run(): Promise<void> {
  config({ path: join(process.cwd(), ".env.development.local") });
  config({ path: join(process.cwd(), ".env.local") });

  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
  const apiKey = process.env.ALGOLIA_WRITE_API_KEY;
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
  if (!appId || !apiKey || !indexName) {
    throw new Error(
      `The .env.local is missing the NEXT_PUBLIC_ALGOLIA_APP_ID and/or ALGOLIA_WRITE_API_KEY and/or NEXT_PUBLIC_ALGOLIA_INDEX_NAME`
    );
  }

  const client = searchClient(appId, apiKey);
  const indexes: IndexedItem[] = [];
  indexes.push(
    ...(await log(indexMdxPages(), "Indexing MDX pages", "MDX pages indexed")),
    ...(await log(
      indexSassDocPages(),
      "Indexing SassDoc pages",
      "SassDoc pages indexed"
    ))
  );
  indexes.push({
    type: "page",
    title: "Material Icons and Symbols",
    description:
      "This page is used to help find icons available in react-md using Material Symbols or Material Icons svg components. Icons can be filtered by type, group, or name.",
    objectID: `${BASE_URL}/components/material-icons-and-symbols`,
    url: `${BASE_URL}/components/material-icons-and-symbols`,
    pathname: "/components/material-icons-and-symbols",
    headings: [],
    keywords: ["icon", "material", "component"],
    docType: "Explore",
    docGroup: "Components",
    group: "Presentation",
    components: ["FontIcon", "MaterialSymbol", "SVGIcon"],
  });

  console.log(`There are ${indexes.length} items added to the search index.`);
  // await client.clearObjects({ indexName });
  await client.saveObjects({
    indexName,
    objects: indexes as unknown as Record<string, unknown>[],
  });
}

await log(
  run(),
  "Indexing the documentation site",
  "Documentation site indexed!"
);
