import { createMarkdownPage } from "./createMarkdownPage.js";
import { createTableOfContents } from "./createTableOfContents.js";

export async function createMdxPage(
  markdownPath: string,
  markdownName?: string
): Promise<void> {
  await Promise.all([
    createTableOfContents(markdownPath),
    createMarkdownPage(markdownPath, markdownName),
  ]);
}
