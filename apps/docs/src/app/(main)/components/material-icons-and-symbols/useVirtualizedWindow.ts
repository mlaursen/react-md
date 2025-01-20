"use client";

import { delegateEvent } from "@react-md/core/delegateEvent";
import { alphaNumericSort } from "@react-md/core/utils/alphaNumericSort";
import Fuse from "fuse.js";
import {
  type RefObject,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  type VariableSizeList,
  type VariableSizeListProps,
} from "react-window";

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

export interface VirtualizedWindowProps
  extends Pick<
    Required<VariableSizeListProps<VirtualizedData>>,
    "height" | "outerRef" | "itemSize" | "itemCount" | "style" | "itemData"
  > {
  ref: RefObject<VariableSizeList>;
}

interface Options extends IconsByCategoryOptions {
  search: string;
  columns: number;
  selectedIconName: MaterialIconAndSymbolName | null;
}

interface Result {
  list: readonly CategoryOrIconNames[];
  listProps: VirtualizedWindowProps;
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
      const allIcons = Object.values(iconsByCategory).reduce<
        MaterialIconAndSymbolName[]
      >((names, icons) => [...names, ...icons], []);

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
      sorted.forEach(([category, icons]) => {
        available.push(category);
        available.push(...chunk(icons, columns));
      });
    }

    return available;
  }, [columns, iconCategory, iconFamily, iconType, searchTerm]);
  const itemSize = (index: number): number =>
    getRowHeight(list[index], index === 0);

  const listRef = useRef<VariableSizeList>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const itemData = useMemo<VirtualizedData>(
    () => ({
      list,
      columns,
    }),
    [columns, list]
  );

  useEffect(() => {
    const virtualizedList = listRef.current;
    const container = outerRef.current;
    if (!container || !virtualizedList) {
      return;
    }

    const scrollCallback = (): void => {
      const scrollTop = window.scrollY - container.offsetTop;

      virtualizedList.scrollTo(scrollTop);
    };

    const scrollHandler = delegateEvent("scroll", window, true, {
      passive: true,
    });

    scrollCallback();

    scrollHandler.add(scrollCallback);
    return () => {
      scrollHandler.remove(scrollCallback);
    };
  }, []);
  useEffect(() => {
    const virtualizedList = listRef.current;
    if (!virtualizedList) {
      return;
    }

    virtualizedList.resetAfterIndex(0);
  }, [iconType, iconFamily, iconCategory, searchTerm, columns]);
  useEffect(() => {
    const container = outerRef.current;
    if (!selectedIconName || !container) {
      return;
    }

    let offset = -(container.offsetTop + getRowHeight(list[0], true));
    for (let i = 0; i < list.length; i++) {
      const row = list[i];
      offset += getRowHeight(row, i === 0);
      if (typeof row !== "string" && row.includes(selectedIconName)) {
        const viewportBottom = window.innerHeight - container.offsetTop - 48;
        const selectedIconBottom = offset - window.scrollY + 160;
        const difference = selectedIconBottom - viewportBottom;
        if (difference > 0) {
          window.scrollTo({
            top: window.scrollY + difference,
            behavior: "instant",
          });
        }

        return;
      }
    }
  }, [list, columns, selectedIconName]);

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
      itemData,
    },
  };
}
