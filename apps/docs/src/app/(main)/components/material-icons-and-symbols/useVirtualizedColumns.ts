"use client";

import { useInlineCSSVariables } from "@react-md/core/theme/useInlineCSSVariables";
import { useResizeObserver } from "@react-md/core/useResizeObserver";
import {
  type CSSProperties,
  type RefCallback,
  useCallback,
  useMemo,
  useState,
} from "react";

import { SELECTED_ICON } from "./searchParams.js";

const MIN_CELL_WIDTH = 160;

interface VirtualizedColumns {
  columns: number;
  containerRef: RefCallback<HTMLDivElement>;
  containerStyle: CSSProperties;
}

export function useVirtualizedColumns(): VirtualizedColumns {
  const [containerWidth, setContainerWidth] = useState(() => {
    let width = window.innerWidth - 32;
    if (window.innerWidth > 1025) {
      width -= 256;
    }

    const params = new URLSearchParams(globalThis.location.search);
    if (params.has(SELECTED_ICON)) {
      width -= 416;
    }

    return width;
  });
  const containerRef = useResizeObserver({
    disableHeight: true,
    onUpdate: useCallback((entry) => {
      setContainerWidth(entry.contentRect.width);
    }, []),
  });
  const columns = Math.floor(containerWidth / MIN_CELL_WIDTH);
  const containerStyle = useInlineCSSVariables(
    useMemo(() => [{ name: "--rmd-box-columns", value: columns }], [columns])
  );

  return {
    columns,
    containerRef,
    containerStyle,
  };
}
