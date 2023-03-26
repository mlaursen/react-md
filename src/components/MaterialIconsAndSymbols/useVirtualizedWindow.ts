import { delegateEvent } from "@react-md/core";
import { chunk } from "lodash";
import type { CSSProperties, RefObject } from "react";
import { useDeferredValue, useEffect, useMemo, useRef } from "react";
import type { VariableSizeList } from "react-window";

import type { MaterialIconAndSymbolName } from "./metadata";
import type { IconsByCategoryOptions } from "./utils";
import { getIconsByCategory } from "./utils";

/**
 * I'm using the VariableSizeList instead of VariableSizeGrid because I want
 * to leverage the `Box` component and the auto-sizing grid for each row. So
 * the way the list is setup is:
 * - each item in the list is a virtualized row where:
 *   - if it is a string, it is a specific icon category
 *   - otherwise, it is a list of icons to render
 */
export type CategoryOrIconNames = string | readonly MaterialIconAndSymbolName[];

export interface VirtualizedWindowProps {
  ref: RefObject<VariableSizeList>;
  style: CSSProperties;
  height: number;
  outerRef: RefObject<HTMLDivElement>;
  itemSize(index: number): number;
  itemCount: number;
}

interface Options extends IconsByCategoryOptions {
  search: string;
  columns: number;
}

interface Result {
  list: readonly CategoryOrIconNames[];
  listProps: VirtualizedWindowProps;
}

export function useVirtualizedWindow(options: Options): Result {
  const { iconType, iconFamily, iconCategory, search, columns } = options;
  const searchTerm = useDeferredValue(search.toLowerCase());

  const list = useMemo(() => {
    const available: CategoryOrIconNames[] = [];
    const iconsByCategory = getIconsByCategory({
      iconType,
      iconFamily,
      iconCategory,
    });

    // TODO: Need to start by best match when the search term exists?
    const sorted = Object.entries(iconsByCategory);
    sorted.sort(([a], [b]) => a.localeCompare(b));

    sorted.forEach(([category, icons]) => {
      const filtered = searchTerm
        ? icons.filter((name) => name.includes(searchTerm))
        : icons;

      if (filtered.length) {
        available.push(category);
        available.push(...chunk(filtered, columns));
      }
    });

    return available;
  }, [columns, iconCategory, iconFamily, iconType, searchTerm]);
  const itemSize = (index: number): number => {
    // if it's a category header
    if (typeof list[index] === "string") {
      return index === 0 ? 40 : 80;
    }

    return 160;
  };

  const listRef = useRef<VariableSizeList>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const container = outerRef.current;
    if (!container || !list) {
      return;
    }

    const scrollCallback = (): void => {
      const scrollTop = window.scrollY - container.offsetTop;

      list.scrollTo(scrollTop);
    };

    const scrollHandler = delegateEvent("scroll", window, true, {
      passive: true,
    });

    scrollHandler.add(scrollCallback);
    return () => {
      scrollHandler.remove(scrollCallback);
    };
  }, []);
  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    list.resetAfterIndex(0);
  }, [iconType, iconFamily, iconCategory, searchTerm, columns]);

  return {
    list,
    listProps: {
      ref: listRef,
      height: window.innerHeight,
      outerRef,
      style: {
        height: "100%",
      },
      itemSize,
      itemCount: list.length,
    },
  };
}
