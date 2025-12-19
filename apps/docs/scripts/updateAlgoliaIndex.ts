import { searchClient } from "@algolia/client-search";
import confirm from "@inquirer/confirm";
import { parseMdx } from "docs-generator/scripts/algolia/parseMdx";
import {
  type HeadingWithDescription,
  type IndexedItem,
} from "docs-generator/scripts/algolia/types";
import { log } from "docs-generator/utils/log";
import { config } from "dotenv";
import { glob } from "glob";
import { join, resolve } from "node:path";
import { generate } from "sassdoc-generator";
import {
  type FormattedFunctionItem,
  type FormattedMixinItem,
  type FormattedSassDocItem,
  type FormattedVariableItem,
} from "sassdoc-generator/types";

import { getBlogs } from "../src/app/(main)/(markdown)/blog/data.js";
import { titleCase } from "../src/utils/strings.js";
import { CORE_SRC } from "./constants.js";

async function indexMdxPages(baseUrl: string): Promise<readonly IndexedItem[]> {
  const mdxPages = await glob("src/app/**/page.mdx");
  return await Promise.all(
    mdxPages.map(async (mdxFilePath) => {
      try {
        return parseMdx({
          baseUrl,
          mdxFilePath,
        });
      } catch (error) {
        console.error(`Error parsing: ${mdxFilePath}`);
        throw error;
      }
    })
  );
}

interface SassDocGroup {
  mixins: Map<string, FormattedMixinItem>;
  functions: Map<string, FormattedFunctionItem>;
  variables: Map<string, FormattedVariableItem>;
}

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

async function indexSassDocPages(
  baseUrl: string
): Promise<readonly IndexedItem[]> {
  const { mixins, functions, variables } = await generate({ src: CORE_SRC });

  const grouped = new Map<string, SassDocGroup>();
  const getByGroupName = (groupName: string): SassDocGroup => {
    return (
      grouped.get(groupName) || {
        mixins: new Map(),
        functions: new Map(),
        variables: new Map(),
      }
    );
  };
  for (const [, item] of mixins) {
    if (!item || item.private) {
      continue;
    }
    const groupName = getGroupName(item);
    const group = getByGroupName(groupName);
    group.mixins.set(item.name, item);
    grouped.set(groupName, group);
  }
  for (const [, item] of functions) {
    if (!item || item.private) {
      continue;
    }
    const groupName = getGroupName(item);
    const group = getByGroupName(groupName);
    group.functions.set(item.name, item);
    grouped.set(groupName, group);
  }
  for (const [, item] of variables) {
    if (!item || item.private) {
      continue;
    }
    const groupName = getGroupName(item);
    const group = getByGroupName(groupName);
    group.variables.set(item.name, item);
    grouped.set(groupName, group);
  }

  const items: IndexedItem[] = [];
  for (const [group, item] of grouped.entries()) {
    const groupTitle = titleCase(group, "-");
    const pathname = `/sassdoc/${getGroupName(group)}`;
    const url = `${baseUrl}${pathname}`;
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

    for (const sassdocItem of [
      ...item.mixins.values(),
      ...item.functions.values(),
      ...item.variables.values(),
    ]) {
      const { name, description, type } = sassdocItem;
      const itemPathname = getSassDocLink(sassdocItem);
      const url = `${baseUrl}${itemPathname}`;
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
    }
  }

  return items;
}

async function indexBlogs(baseUrl: string): Promise<readonly IndexedItem[]> {
  const items: IndexedItem[] = [];
  const blogRoot = resolve(process.cwd(), "src/app/(main)/(markdown)/blog");
  const blogs = await getBlogs(blogRoot);
  const headings: HeadingWithDescription[] = [];
  for (const blog of blogs) {
    const { id, title, exerpt } = blog;
    if (blog.pinned) {
      headings.push({
        id,
        depth: 2,
        title,
        description: exerpt,
      });
    }
  }
  items.push({
    type: "page",
    title: "Blog",
    description: "Stay up-to-date with the latest news about react-md",
    objectID: `${baseUrl}/blog`,
    url: `${baseUrl}/blog`,
    pathname: "/blog",
    headings,
    keywords: ["blog", "release notes"],
    docType: "Blog",
    docGroup: "Blog",
  });

  return items;
}

interface RequiredEnvVars {
  appId: string;
  apiKey: string;
  baseUrl: string;
  indexName: string;
}

async function getEnvVars(): Promise<RequiredEnvVars> {
  const appId = process.env.ALGOLIA_APP_ID?.trim() ?? "";
  const apiKey = process.env.ALGOLIA_WRITE_API_KEY?.trim() ?? "";
  const indexName = process.env.ALGOLIA_INDEX_NAME?.trim() ?? "";
  const baseUrl = process.env.BASE_URL?.trim() ?? "";
  const missing: string[] = [];
  if (!appId) {
    missing.push("ALGOLIA_APP_ID");
  }
  if (!apiKey) {
    missing.push("ALGOLIA_WRITE_API_KEY");
  }
  if (!indexName) {
    missing.push("ALGOLIA_INDEX_NAME");
  }
  if (!baseUrl) {
    missing.push("BASE_URL");
  }
  if (missing.length > 0) {
    throw new Error(
      `The following environment variables are missing:
${missing.map((name) => `- ${name}`).join("\n")}

Update the \`.env.algolia\` with the correct values.
`
    );
  }

  if (
    !(await confirm({
      message: `Are the following variables correct?

- appId - ${appId}
- apiKey - ${apiKey}
- baseUrl - ${baseUrl}
- indexName - ${indexName}

`,
    }))
  ) {
    throw new Error(`Update the \`.env.algolia\` and run again.`);
  }

  return {
    appId,
    apiKey,
    indexName,
    baseUrl,
  };
}

async function run({
  appId,
  apiKey,
  baseUrl,
  indexName,
}: RequiredEnvVars): Promise<void> {
  const client = searchClient(appId, apiKey);
  const indexes: IndexedItem[] = [
    ...(await log(
      indexMdxPages(baseUrl),
      "Indexing MDX pages",
      "MDX pages indexed"
    )),
    ...(await log(
      indexSassDocPages(baseUrl),
      "Indexing SassDoc pages",
      "SassDoc pages indexed"
    )),
    ...(await log(
      indexBlogs(baseUrl),
      "Indexing Blog pages",
      "Blog pages indexed"
    )),
    {
      type: "page",
      title: "Material Icons and Symbols",
      description:
        "This page is used to help find icons available in react-md using Material Symbols or Material Icons svg components. Icons can be filtered by type, group, or name.",
      objectID: `${baseUrl}/components/material-icons-and-symbols`,
      url: `${baseUrl}/components/material-icons-and-symbols`,
      pathname: "/components/material-icons-and-symbols",
      headings: [],
      keywords: ["icon", "material", "component"],
      docType: "Explore",
      docGroup: "Components",
      group: "Presentation",
      components: ["FontIcon", "MaterialSymbol", "SVGIcon"],
    },
  ];

  console.log(`There are ${indexes.length} items added to the search index.`);
  await client.clearObjects({ indexName });
  await client.saveObjects({
    indexName,
    objects: indexes as unknown as Record<string, unknown>[],
  });
}

config({ path: join(process.cwd(), ".env.algolia"), quiet: true });
const envVars = await getEnvVars();
await log(
  // eslint-disable-next-line unicorn/prefer-top-level-await
  run(envVars),
  "Indexing the documentation site",
  "Documentation site indexed!"
);
