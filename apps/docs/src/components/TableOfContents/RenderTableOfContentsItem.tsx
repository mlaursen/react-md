import { type RenderRecursiveItemsProps } from "@react-md/core/utils/RenderRecursively";
import { type TOCItem } from "docs-generator/rehype-toc";
import { useEffect, useRef, type ReactElement } from "react";
import styles from "./RenderTableOfContentsItem.module.scss";
import { TableOfContentsGroup } from "./TableOfContentsGroup.jsx";

export function RenderTableOfContentsItem(
  props: RenderRecursiveItemsProps<TOCItem, string>
): ReactElement {
  const { item, data: activeHeadingId, children } = props;
  const { id, value, depth } = item;
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
        {value}
      </a>
      {children && <TableOfContentsGroup>{children}</TableOfContentsGroup>}
    </li>
  );
}
