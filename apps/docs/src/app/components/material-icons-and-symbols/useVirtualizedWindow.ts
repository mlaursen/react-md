import { alphaNumericSort, delegateEvent, useSsr } from "@react-md/core";
import Fuse from "fuse.js";
import lodash from "lodash";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  type RefObject,
} from "react";
import {
  type VariableSizeList,
  type VariableSizeListProps,
} from "react-window";
import { type VirtualizedData } from "./RenderVirtualizedRow.jsx";
import { type MaterialIconAndSymbolName } from "./metadata.js";
import { getIconsByCategory, type IconsByCategoryOptions } from "./utils.js";

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
      available.push(...lodash.chunk(matches, columns));
    } else {
      // when not searching, group icons into each category label and display
      // them in order
      const sorted = alphaNumericSort(Object.entries(iconsByCategory), {
        extractor: (item) => item[0],
      });
      sorted.forEach(([category, icons]) => {
        available.push(category);
        available.push(...lodash.chunk(icons, columns));
      });
    }

    return available;
  }, [columns, iconCategory, iconFamily, iconType, searchTerm]);
  const itemSize = (index: number): number => {
    // if it's a category header
    if (typeof list[index] === "string") {
      // the first category header needs less space since it isn't used to also
      // visually separate groups
      return index === 0 ? 40 : 80;
    }

    return 160;
  };

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
  const ssr = useSsr();

  return {
    list,
    listProps: {
      ref: listRef,
      height: ssr ? 1920 : window.innerHeight,
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
