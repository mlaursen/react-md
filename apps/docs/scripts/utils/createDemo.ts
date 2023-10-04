import { parse } from "node:path";
import { createDemoMarkdown } from "./createDemoMarkdown.js";
import { createMarkdownPage } from "./createMarkdownPage.js";
import { createTableOfContents } from "./createTableOfContents.js";

const GENERATED_NAME = "demo-page.mdx";

export async function createDemo(path: string, watch: boolean): Promise<void> {
  const generated = path.replace(parse(path).base, GENERATED_NAME);
  await createDemoMarkdown(path, generated, watch);
  await createTableOfContents(generated);
  await createMarkdownPage(path, GENERATED_NAME);
}
