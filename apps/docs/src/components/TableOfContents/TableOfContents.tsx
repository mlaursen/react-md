"use client";

import { type TableOfContentsHeadings } from "@react-md/core/navigation/types";
import { useActiveHeadingId } from "@react-md/core/navigation/useActiveHeadingId";
import { Typography } from "@react-md/core/typography/Typography";
import { RenderRecursively } from "@react-md/core/utils/RenderRecursively";
import { type ReactElement, useId } from "react";

import { RenderTableOfContentsItem } from "./RenderTableOfContentsItem.jsx";
import styles from "./TableOfContents.module.scss";
import { TableOfContentsGroup } from "./TableOfContentsGroup.jsx";

export interface TableOfContentsProps {
  toc: Readonly<TableOfContentsHeadings>;
}

export function TableOfContents(props: TableOfContentsProps): ReactElement {
  const { toc } = props;

  const headingId = useId();
  const activeHeadingId = useActiveHeadingId({ headings: toc });
  return (
    <nav aria-labelledby={headingId} className={styles.container}>
      <Typography
        id={headingId}
        type="headline-5"
        margin="none"
        className={styles.sticky}
      >
        Table of Contents
      </Typography>
      <TableOfContentsGroup root>
        <RenderRecursively
          data={activeHeadingId}
          items={toc}
          render={RenderTableOfContentsItem}
          getItemKey={({ item }) => item.id}
        />
      </TableOfContentsGroup>
    </nav>
  );
}
