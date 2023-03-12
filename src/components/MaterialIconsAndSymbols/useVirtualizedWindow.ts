import { delegateEvent } from "@react-md/core";
import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef } from "react";
import type { VariableSizeList } from "react-window";
import type { IconsByCategoryOptions } from "./utils";

export interface VirtualizedWindowProps {
  ref: RefObject<VariableSizeList>;
  style: CSSProperties;
  height: number;
  outerRef: RefObject<HTMLDivElement>;
}

interface Options extends IconsByCategoryOptions {
  searchTerm: string;
  columns: number;
}

export function useVirtualizedWindow(options: Options): VirtualizedWindowProps {
  const { iconType, iconFamily, iconCategory, searchTerm, columns } = options;

  const ref = useRef<VariableSizeList>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = ref.current;
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
    const list = ref.current;
    if (!list) {
      return;
    }

    list.resetAfterIndex(0);
  }, [iconType, iconFamily, iconCategory, searchTerm, columns]);

  return {
    ref,
    height: window.innerHeight,
    outerRef,
    style: {
      height: "100%",
    },
  };
}
