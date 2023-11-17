import { Snackbar, ToastManagerProvider } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";
import { TableOfContents } from "../TableOfContents/TableOfContents.jsx";
import { type TableOfContentsItem } from "../TableOfContents/types.js";
import styles from "./MarkdownPage.module.scss";

export interface MarkdownPageProps {
  toc?: readonly TableOfContentsItem[];
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
      <div className={cnb(styles.container, !isTocVisible && styles.noToc)}>
        <ToastManagerProvider>
          {children}
          <Snackbar />
        </ToastManagerProvider>
      </div>
      {isTocVisible && <TableOfContents toc={toc} />}
    </>
  );
}
