"use client";
import { useActiveHeadingId } from "@react-md/core/navigation/useActiveHeadingId";
import { Typography } from "@react-md/core/typography/Typography";
import {
  RenderRecursively,
  type RecursiveItem,
} from "@react-md/core/utils/RenderRecursively";
import { type TOCItem } from "docs-generator/rehype-toc";
import { useId, type ReactElement } from "react";
import { RenderTableOfContentsItem } from "./RenderTableOfContentsItem.jsx";
import styles from "./TableOfContents.module.scss";
import { TableOfContentsGroup } from "./TableOfContentsGroup.jsx";

function transformToItems(
  toc: readonly TOCItem[]
): readonly RecursiveItem<TOCItem>[];
function transformToItems(
  toc: readonly TOCItem[] | undefined
): readonly RecursiveItem<TOCItem>[] | undefined;
function transformToItems(
  toc: readonly TOCItem[] | undefined
): readonly RecursiveItem<TOCItem>[] | undefined {
  return toc?.map(({ children, ...item }) => ({
    ...item,
    items: transformToItems(children),
  }));
}

export interface TableOfContentsProps {
  toc: readonly TOCItem[];
}

export function TableOfContents(props: TableOfContentsProps): ReactElement {
  const { toc } = props;

  const headingId = useId();
  const activeHeadingId = useActiveHeadingId({ headings: toc });
  return (
    <nav aria-labelledby={headingId} className={styles.container}>
      <Typography id={headingId} type="headline-5" margin="none">
        Table of Contents
      </Typography>
      <TableOfContentsGroup root>
        <RenderRecursively
          data={activeHeadingId}
          items={transformToItems(toc)}
          render={RenderTableOfContentsItem}
          getItemKey={({ item }) => item.id}
        />
      </TableOfContentsGroup>
    </nav>
  );
}
