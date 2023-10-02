import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { format } from "../../src/utils/format.js";
import { GENERATED_FILE_BANNER } from "../constants.js";

export async function createMarkdownPage(markdownPath: string): Promise<void> {
  const pagePath = join(dirname(markdownPath), "page.tsx");

  const contents = `${GENERATED_FILE_BANNER}
import { MarkdownPage } from "@/components/MarkdownPage/MarkdownPage.jsx";
import { type ReactElement } from "react";
import Markdown from "./README.mdx";
import { toc } from "./toc.js";

export default function GeneratedMarkdownPage(): ReactElement {
  return <MarkdownPage toc={toc}><Markdown /></MarkdownPage>;
}
`;
  const formatted = await format(contents);

  await writeFile(pagePath, formatted);
}
