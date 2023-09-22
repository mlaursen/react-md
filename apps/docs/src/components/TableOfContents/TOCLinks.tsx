/* eslint-disable @typescript-eslint/no-use-before-define */
import { typography } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import styles from "./TOCLinks.module.scss";
import { type TableOfContentsItem } from "./types.js";

export interface TOCLinksProps {
  items: TableOfContentsItem[];
  root?: boolean;
  activeId: string;
}

export function TOCLinks(props: TOCLinksProps): ReactElement {
  const { items, root, activeId } = props;
  return (
    <ul
      className={cnb(
        styles.list,
        root && styles.root,
        typography({ type: "subtitle-1" })
      )}
    >
      {items.map((item) => (
        <TOCLink key={item.id} {...item} activeId={activeId} />
      ))}
    </ul>
  );
}

interface TOCLinkProps extends TableOfContentsItem {
  activeId: string;
}

function TOCLink(props: TOCLinkProps): ReactElement {
  const { id, activeId, depth, value, children } = props;
  return (
    <li style={{ "--rmd-tree-depth": depth - 1 }} className={styles.item}>
      <a
        aria-current={id === activeId || undefined}
        href={`#${id}`}
        className={styles.link}
      >
        {value}
      </a>
      {children && <TOCLinks items={children} activeId={activeId} />}
    </li>
  );
}
