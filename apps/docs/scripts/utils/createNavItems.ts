import {
  type NavigationItem,
  type NavigationItemRoute,
} from "@react-md/core/navigation/types";
import { alphaNumericSort } from "@react-md/core/utils/alphaNumericSort";
import { logComplete } from "docs-generator/utils/log";
import { writeFile } from "node:fs/promises";
import { format } from "prettier";

import { GENERATED_FILE_BANNER } from "../constants.js";

export type NavigationItemStringChildrenRoute = NavigationItemRoute & {
  children: string;
};

interface Options {
  name: string;
  fileName: string;
  aliasedName: string;
  items: readonly NavigationItem[];
}

export function sortNavItems(
  items: readonly NavigationItemStringChildrenRoute[]
): readonly NavigationItemStringChildrenRoute[] {
  return alphaNumericSort(items, { extractor: (item) => item.children });
}

export async function createNavItems(options: Options): Promise<void> {
  const { name, fileName, aliasedName, items } = options;

  await writeFile(
    fileName,
    await format(
      `${GENERATED_FILE_BANNER}
import { type NavigationItem } from "@react-md/core/navigation/types";

export const ${name}: readonly NavigationItem[] = [
  {
    type: "group",
    href: "/sassdoc",
    children: "Sass API Docs",
    items: ${JSON.stringify(items)}
  },
]
`,
      { filepath: fileName }
    )
  );

  logComplete(`Generated "${aliasedName}"`);
}
