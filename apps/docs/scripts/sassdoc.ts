import {
  type NavigationItemStringChildrenRoute,
  createNavItems,
  sortNavItems,
} from "docs-generator/utils/createNavItems";
import { log, logComplete } from "docs-generator/utils/log";
import {
  getAliasedFileName,
  writeGeneratedFile,
} from "docs-generator/utils/writeGeneratedFile";
import { existsSync } from "node:fs";
import {
  type GeneratedSassDoc,
  type GeneratedSassDocWithOrder,
  generate,
} from "sassdoc-generator";
import { type FormattedSassDocItem } from "sassdoc-generator/types";

import { titleCase } from "../src/utils/strings.js";
import {
  CORE_SRC,
  GENERATED_SASSDOC_FILE,
  GENERATED_SASSDOC_NAV_ITEMS_FILE,
} from "./constants.js";
import { ensureGeneratedDir } from "./ensureGeneratedDir.js";

function stringify(
  map: ReadonlyMap<string, FormattedSassDocItem>,
  order: ReadonlyMap<string, number>
): string {
  const entries = [...map.entries()];
  entries.sort(([a], [b]) => (order.get(a) ?? 0) - (order.get(b) ?? 0));

  return JSON.stringify(Object.fromEntries(entries));
}

async function createSassDocFile(
  generated: GeneratedSassDocWithOrder
): Promise<void> {
  const {
    mixins,
    functions,
    variables,
    mixinsOrder,
    variablesOrder,
    functionsOrder,
  } = generated;

  await writeGeneratedFile({
    fileName: GENERATED_SASSDOC_FILE,
    contents: `
import { type FormattedMixinItem, type FormattedVariableItem, type FormattedFunctionItem } from "sassdoc-generator/types";

// adding \`| undefined\` since i don't have the \`noUncheckedIndexedAccess\`
// ts option enabled and causes invalid types when using \`||\`
export const SASSDOC_MIXINS: Record<string, FormattedMixinItem | undefined> = ${stringify(mixins, mixinsOrder)};
export const SASSDOC_FUNCTIONS: Record<string, FormattedFunctionItem | undefined> = ${stringify(functions, functionsOrder)};
export const SASSDOC_VARIABLES: Record<string, FormattedVariableItem | undefined> = ${stringify(variables, variablesOrder)};

`,
  });
}

async function generateNavItems(options: GeneratedSassDoc): Promise<void> {
  const { mixins, functions, variables } = options;
  const groups = new Set<string>();
  mixins.forEach((item) => groups.add(item.group));
  functions.forEach((item) => groups.add(item.group));
  variables.forEach((item) => groups.add(item.group));

  const components: NavigationItemStringChildrenRoute[] = [];
  const remainingItems: NavigationItemStringChildrenRoute[] = [];
  groups.forEach((group) => {
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
  });

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

if (process.argv.includes("--touch")) {
  const empty: GeneratedSassDocWithOrder = {
    mixins: new Map(),
    functions: new Map(),
    variables: new Map(),
    mixinsOrder: new Map(),
    functionsOrder: new Map(),
    variablesOrder: new Map(),
  };
  const update = "Run `pnpm --filter docs sassdoc` to update.";

  if (!existsSync(GENERATED_SASSDOC_NAV_ITEMS_FILE)) {
    await log(
      generateNavItems(empty),
      "",
      `Created an empty "${getAliasedFileName(GENERATED_SASSDOC_NAV_ITEMS_FILE)}". ${update}`
    );
  } else {
    logComplete(
      `Skipped creating "${getAliasedFileName(GENERATED_SASSDOC_NAV_ITEMS_FILE)}" since it already exists. ${update}`
    );
  }
  if (!existsSync(GENERATED_SASSDOC_FILE)) {
    await log(
      createSassDocFile(empty),
      "",
      `Created an empty "${getAliasedFileName(GENERATED_SASSDOC_FILE)}". ${update}`
    );
  } else {
    logComplete(
      `Skipped creating "${getAliasedFileName(GENERATED_SASSDOC_FILE)}" since it already exists. ${update}`
    );
  }

  process.exit(0);
}

async function run(): Promise<void> {
  await ensureGeneratedDir();
  const generated = await generate({ src: CORE_SRC });
  await Promise.all([
    createSassDocFile(generated),
    generateNavItems(generated),
  ]);
}

await log(run(), "", "sassdoc script completed");
