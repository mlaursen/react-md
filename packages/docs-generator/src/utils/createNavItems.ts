import {
  type NavigationItem,
  type NavigationItemRoute,
} from "@react-md/core/navigation/types";
import { alphaNumericSort } from "@react-md/core/utils/alphaNumericSort";

import { writeGeneratedFile } from "./writeGeneratedFile.js";

export type NavigationItemStringChildrenRoute = NavigationItemRoute & {
  children: string;
};

export function sortNavItems(
  items: readonly NavigationItemStringChildrenRoute[]
): readonly NavigationItemStringChildrenRoute[] {
  return alphaNumericSort(items, { extractor: (item) => item.children });
}

interface Options {
  name: string;
  href: string;
  children: string;
  fileName: string;
  items: readonly NavigationItem[];
}

export async function createNavItems(options: Options): Promise<void> {
  const { name, href, children, fileName, items } = options;

  await writeGeneratedFile({
    fileName,
    contents: `
import { type NavigationItem } from "@react-md/core/navigation/types";

export const ${name}: readonly NavigationItem[] = [
  {
    type: "group",
    href: "${href}",
    children: "${children}",
    items: ${JSON.stringify(items)}
  },
]
`,
  });
}
