"use client";
import {
  getScrollbarWidth,
  useCSSVariables,
  useResizeObserver,
} from "@react-md/core";
import {
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type RefCallback,
} from "react";

const MIN_CELL_WIDTH = 160;
const DEFAULT_WIDTH = 1080;

interface VirtualizedColumns {
  columns: number;
  containerRef: RefCallback<HTMLDivElement>;
  containerStyle: CSSProperties;
  containerWidth: number;
}

export function useVirtualizedColumns(): VirtualizedColumns {
  const [{ containerWidth, rowWidth }, setSize] = useState({
    containerWidth: DEFAULT_WIDTH,
    rowWidth: DEFAULT_WIDTH,
  });
  const containerRef = useResizeObserver({
    onUpdate: useCallback((entry) => {
      const { height, width } = entry.contentRect;
      const { scrollHeight } = entry.target;

      setSize({
        containerWidth: width,
        rowWidth: width - (scrollHeight > height ? getScrollbarWidth() : 0),
      });
    }, []),
  });
  const columns = Math.floor(rowWidth / MIN_CELL_WIDTH);
  const containerStyle = useCSSVariables(
    useMemo(() => [{ name: "--rmd-box-columns", value: columns }], [columns]),
    true
  );

  return {
    columns,
    containerRef,
    containerStyle,
    containerWidth,
  };
}
