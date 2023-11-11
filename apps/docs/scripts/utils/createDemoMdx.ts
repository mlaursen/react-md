import { parse } from "node:path";
import { createDemoMarkdown } from "./createDemoMarkdown.js";
import { createMdxPage } from "./createMdxPage.js";

const DEMO_PAGE_MDX = "demo-page.mdx";

interface Options {
  demoPath: string;
  isLogged: boolean;
}

export async function createDemoMdx(options: Options): Promise<void> {
  const { demoPath, isLogged } = options;
  const demoPageMdxPath = demoPath.replace(parse(demoPath).base, DEMO_PAGE_MDX);

  await createDemoMarkdown({
    path: demoPath,
    outPath: demoPageMdxPath,
    isLogged,
  });
  await createMdxPage(demoPath, DEMO_PAGE_MDX);
}
