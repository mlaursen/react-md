import { type TableOfContentsHeadingItem } from "@react-md/core/navigation/useTableOfContentsHeadings";
import { type RenderRecursiveItemsProps } from "@react-md/core/utils/RenderRecursively";
import { type ReactElement, useEffect, useRef } from "react";

import styles from "./RenderTableOfContentsItem.module.scss";
import { TableOfContentsGroup } from "./TableOfContentsGroup.jsx";

export function RenderTableOfContentsItem(
  props: RenderRecursiveItemsProps<TableOfContentsHeadingItem, string>
): ReactElement {
  const { item, data: activeHeadingId, children } = props;
  const { id, children: linkChildren, depth } = item;
  const active = id === activeHeadingId;
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!active || !ref.current) {
      return;
    }

    ref.current.scrollIntoView({ block: "nearest" });
  }, [active]);
  return (
    <li
      ref={ref}
      style={{ "--rmd-tree-depth": depth - 1 }}
      className={styles.item}
    >
      <a
        aria-current={active || undefined}
        href={`#${id}`}
        className={styles.link}
      >
        {linkChildren}
      </a>
      {children && <TableOfContentsGroup>{children}</TableOfContentsGroup>}
    </li>
  );
}
