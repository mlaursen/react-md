import { MarkdownPage } from "@/components/MarkdownPage/MarkdownPage.jsx";
import { createTableOfContents } from "@/components/TableOfContents/createTableOfContents.js";
import { type ReactElement } from "react";
import Markdown from "./README.mdx";

export default async function ProgressPage(): Promise<ReactElement> {
  const toc = await createTableOfContents("./README.mdx", import.meta.url);

  return (
    <MarkdownPage toc={toc}>
      <Markdown />
    </MarkdownPage>
  );
}
