import { type ReactElement, type ReactNode } from "react";
import { TableOfContents } from "../TableOfContents/TableOfContents.jsx";
import { type TableOfContentsItem } from "../TableOfContents/types.js";
import styles from "./MarkdownPage.module.scss";

export interface MarkdownPageProps {
  toc?: TableOfContentsItem[];
  children: ReactNode;
}

/**
 * @example
 * Main Usage
 * ```tsx
 * import { MarkdownPage } from "@/components/MarkdownPage/MarkdownPage.jsx";
 * import { createTableOfContents } from "@/components/TableOfContents/createTableOfContents.js";
 * import { type ReactElement } from "react";
 * import Markdown from "./README.mdx";
 *
 * export default async function GettingStartedPage(): Promise<ReactElement> {
 *   const toc = await createTableOfContents("./README.mdx", import.meta.url);
 *
 *   return (
 *     <MarkdownPage toc={toc}>
 *       <Markdown />
 *     </MarkdownPage>
 *   );
 * }
 * ```
 */
export function MarkdownPage(props: MarkdownPageProps): ReactElement {
  const { toc = [], children } = props;
  const isTocVisible = toc.length > 0;

  return (
    <>
      <div className={styles.container}>{children}</div>
      {isTocVisible && <TableOfContents toc={toc} />}
    </>
  );
}
