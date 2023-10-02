"use client";
import {
  RenderRecursively,
  Typography,
  parseCssLengthUnit,
  useIntersectionObserver,
} from "@react-md/core";
import { useCallback, useId, useRef, useState, type ReactElement } from "react";
import { RenderTOCItem } from "./RenderTOCItem.jsx";
import { TOCGroup } from "./TOCGroup.jsx";
import styles from "./TableOfContents.module.scss";
import { type TableOfContentsItem } from "./types.js";

function getHeadings(items: readonly TableOfContentsItem[]): HTMLElement[] {
  const headings: HTMLElement[] = [];
  items.forEach((item) => {
    const heading = document.getElementById(item.id);
    if (heading) {
      headings.push(heading);
    }

    if (item.items) {
      headings.push(...getHeadings(item.items));
    }
  });

  return headings;
}

const threshold = [0.0, 1.0];
const getRootMargin = (): string => {
  const headerHeightVar = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--rmd-layout-header-height");
  const headerHeight = parseCssLengthUnit({
    value: headerHeightVar || "3.5rem",
  });

  return `-${headerHeight}px 0px 0px 0px`;
};

export interface TableOfContentsProps {
  toc: readonly TableOfContentsItem[];
}

export function TableOfContents(
  props: TableOfContentsProps
): ReactElement | null {
  const { toc } = props;

  // heavily inspired by https://github.com/mdn/yari/blob/231d6aab8f1c8efe159d268c261446c5b7ae12d9/client/src/document/hooks.ts#L171
  const [activeId, setActiveId] = useState("");
  const elements = useRef<Map<string, boolean>>();
  useIntersectionObserver({
    threshold,
    getRootMargin,
    getTargets: useCallback(() => {
      const headings = getHeadings(toc);
      const lookup = new Map<string, boolean>();
      headings.forEach((heading) => {
        lookup.set(heading.id, false);
      });
      elements.current = lookup;

      return headings;
    }, [toc]),
    onUpdate: useCallback((entries) => {
      const lookup = elements.current;
      if (!lookup) {
        return;
      }

      entries.forEach((entry) => {
        lookup.set(entry.target.id, entry.isIntersecting);
      });

      // get the first visible/intersecting item and set it
      const foundId = [...lookup.entries()].find(
        ([_id, isIntersecting]) => isIntersecting
      )?.[0];

      // if there isn't a found id, it might be a really large section where
      // another heading isn't visible, so maintain the previous one
      if (foundId) {
        setActiveId(foundId);
      }
    }, []),
  });

  const headingId = useId();
  return (
    <nav aria-labelledby={headingId} className={styles.container}>
      <Typography id={headingId} type="headline-5" margin="none">
        Table of Contents
      </Typography>
      <TOCGroup root>
        <RenderRecursively
          data={activeId}
          items={toc}
          render={RenderTOCItem}
          getItemKey={(item) => item.id}
        />
      </TOCGroup>
    </nav>
  );
}
