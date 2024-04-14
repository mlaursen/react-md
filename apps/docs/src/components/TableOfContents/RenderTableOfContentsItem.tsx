import { type RenderRecursiveItemsProps } from "@react-md/core/utils/RenderRecursively";
import { type TOCItem } from "docs-generator/rehype-toc";
import { type ReactElement } from "react";
import styles from "./RenderTableOfContentsItem.module.scss";
import { TableOfContentsGroup } from "./TableOfContentsGroup.jsx";

export function RenderTableOfContentsItem(
  props: RenderRecursiveItemsProps<TOCItem, string>
): ReactElement {
  const { item, data: activeHeadingId, children } = props;
  const { id, value, depth } = item;
  return (
    <li style={{ "--rmd-tree-depth": depth - 1 }} className={styles.item}>
      <a
        aria-current={id === activeHeadingId || undefined}
        href={`#${id}`}
        className={styles.link}
      >
        {value}
      </a>
      {children && <TableOfContentsGroup>{children}</TableOfContentsGroup>}
    </li>
  );
}
