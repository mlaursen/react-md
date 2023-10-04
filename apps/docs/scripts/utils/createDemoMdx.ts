import { parse } from "node:path";
import { createDemoMarkdown } from "./createDemoMarkdown.js";
import { createMdxPage } from "./createMdxPage.js";

const DEMO_PAGE_MDX = "demo-page.mdx";

export async function createDemoMdx(
  demoPath: string,
  isLogged: boolean
): Promise<void> {
  const demoPageMdxPath = demoPath.replace(parse(demoPath).base, DEMO_PAGE_MDX);

  await createDemoMarkdown(demoPath, demoPageMdxPath, isLogged);
  await createMdxPage(demoPath, DEMO_PAGE_MDX);
}
