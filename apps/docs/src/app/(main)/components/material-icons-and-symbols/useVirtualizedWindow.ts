"use client";

import { alphaNumericSort } from "@react-md/core/utils/alphaNumericSort";
import Fuse from "fuse.js";
import { useDeferredValue, useEffect, useMemo } from "react";
import { type ListProps, useListRef } from "react-window";

import { chunk } from "@/utils/lists.js";

import { type VirtualizedData } from "./RenderVirtualizedRow.js";
import { type MaterialIconAndSymbolName } from "./metadata.js";
import { type IconsByCategoryOptions, getIconsByCategory } from "./utils.js";

const getRowHeight = (row: CategoryOrIconNames, isFirst: boolean): number => {
  // if it's a category header
  if (typeof row === "string") {
    // the first category header needs less space since it isn't used to also
    // visually separate groups
    return isFirst ? 40 : 80;
  }

  return 160;
};

/**
 * I'm using the VariableSizeList instead of VariableSizeGrid because I want
 * to leverage the `Box` component and the auto-sizing grid for each row. So
 * the way the list is setup is:
 * - each item in the list is a virtualized row where:
 *   - if it is a string, it is a specific icon category
 *   - otherwise, it is a list of icons to render
 */
export type CategoryOrIconNames = string | readonly MaterialIconAndSymbolName[];

export type VirtualizedWindowProps = Pick<
  Required<ListProps<VirtualizedData>>,
  "rowCount" | "rowHeight" | "rowProps" | "listRef"
>;

interface Options extends IconsByCategoryOptions {
  search: string;
  columns: number;
  selectedIconName: MaterialIconAndSymbolName | null;
}

interface Result {
  list: readonly CategoryOrIconNames[];
  listProps: VirtualizedWindowProps;
  scrollToTop: () => void;
}

export function useVirtualizedWindow(options: Options): Result {
  const {
    iconType,
    iconFamily,
    iconCategory,
    search,
    columns,
    selectedIconName,
  } = options;
  const searchTerm = useDeferredValue(search.toLowerCase());

  const list = useMemo(() => {
    const available: CategoryOrIconNames[] = [];
    const iconsByCategory = getIconsByCategory({
      iconType,
      iconFamily,
      iconCategory,
    });

    if (searchTerm) {
      // when searching, remove the categories from the results and just display
      // all the matching icons
      const allIcons = Object.values(iconsByCategory).flat();

      const fuse = new Fuse(allIcons, {
        // make matching more strict to limit results
        threshold: 0.3,
      });
      const matches = fuse.search(searchTerm).map(({ item }) => item);
      available.push(...chunk(matches, columns));
    } else {
      // when not searching, group icons into each category label and display
      // them in order
      const sorted = alphaNumericSort(Object.entries(iconsByCategory), {
        extractor: (item) => item[0],
      });
      for (const [category, icons] of sorted) {
        available.push(category, ...chunk(icons, columns));
      }
    }

    return available;
  }, [columns, iconCategory, iconFamily, iconType, searchTerm]);
  const itemSize = (index: number): number =>
    getRowHeight(list[index], index === 0);

  const listRef = useListRef(null);
  // const outerRef = useRef<HTMLDivElement>(null);
  const itemData = useMemo<VirtualizedData>(
    () => ({
      list,
      columns,
    }),
    [columns, list]
  );

  useEffect(() => {
    const virtualizedList = listRef.current;
    if (!virtualizedList || !selectedIconName) {
      return;
    }

    const index = list.findIndex((row) => row.includes(selectedIconName));
    if (index === -1) {
      return;
    }

    virtualizedList.scrollToRow({
      index,
      align: "smart",
      behavior: "instant",
    });
  }, [list, listRef, selectedIconName]);

  return {
    list,
    listProps: {
      listRef,
      rowHeight: itemSize,
      rowCount: list.length,
      rowProps: itemData,
    },
    scrollToTop: () => listRef.current?.scrollToRow({ index: 0 }),
  };
}
