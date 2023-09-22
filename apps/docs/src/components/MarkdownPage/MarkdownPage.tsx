import { type MDXProps } from "mdx/types.js";
import { type ReactElement } from "react";
import { TableOfContents } from "../TableOfContents/TableOfContents.jsx";
import { type TableOfContentsItem } from "../TableOfContents/types.js";
import styles from "./MarkdownPage.module.scss";

export interface MarkdownPageProps {
  toc?: TableOfContentsItem[];
  default(props: MDXProps): ReactElement;
}

/**
 * @example
 * Main Usage
 * ```tsx
 * import type { ReactElement } from "react";
 * import { MarkdownPage } from "@/components/MarkdownPage/MarkdownPage.jsx";
 * import * as props from "./Whatever.mdx";
 *
 * export default WhateverPage(): ReactElement {
 *   return <MarkdownPage {...props} />;
 * }
 * ```
 */
export function MarkdownPage(props: MarkdownPageProps): ReactElement {
  const { toc = [], default: Content } = props;
  const isTocVisible = toc.length > 0;

  return (
    <>
      <div className={styles.container}>
        <Content />
      </div>
      {isTocVisible && <TableOfContents toc={toc} />}
    </>
  );
}
