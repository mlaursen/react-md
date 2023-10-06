import { type RenderRecursiveItemsProps } from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./RenderTOCItem.module.scss";
import { TOCGroup } from "./TOCGroup.jsx";
import { type TableOfContentsItem } from "./types.js";

export function RenderTOCItem(
  props: RenderRecursiveItemsProps<TableOfContentsItem, string>
): ReactElement {
  const { item, data: activeId, children } = props;
  const { id, value, depth } = item;
  return (
    <li style={{ "--rmd-tree-depth": depth - 1 }} className={styles.item}>
      <a
        aria-current={id === activeId || undefined}
        href={`#${id}`}
        className={styles.link}
      >
        {value}
      </a>
      {children && <TOCGroup>{children}</TOCGroup>}
    </li>
  );
}
