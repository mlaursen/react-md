import { getScrollbarWidth } from "@react-md/core/scroll/getScrollbarWidth";
import { useCSSVariables } from "@react-md/core/theme/useCSSVariables";
import { useResizeObserver } from "@react-md/core/useResizeObserver";
import { useWindowSize } from "@react-md/core/useWindowSize";
import { WindowSplitter } from "@react-md/core/window-splitter/WindowSplitter";
import { useWindowSplitter } from "@react-md/core/window-splitter/useWindowSplitter";
import {
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const getOffset = (): number =>
  document.body.scrollHeight > document.body.offsetHeight
    ? getScrollbarWidth()
    : 0;

export function ResizeHowToUseSheet(): ReactElement {
  const { width } = useWindowSize({ disableHeight: true });
  const { value, splitterProps } = useWindowSplitter({
    min: 416,
    max: Math.max(width * 0.6, 600),
    reversed: true,
    defaultValue: 416,
  });
  const [offset, setOffset] = useState(() => getOffset());
  useCSSVariables(
    useMemo(
      () => [
        {
          name: "--rmd-window-splitter-position",
          value: `${value + offset}px`,
        },
        { name: "--how-to-use-size", value: `${value}px` },
      ],
      [offset, value]
    )
  );
  const elementRef = useResizeObserver({
    disableHeight: true,
    onUpdate: useCallback(() => setOffset(getOffset()), []),
  });
  useEffect(() => {
    if (!getScrollbarWidth()) {
      return;
    }

    elementRef(document.body);
  }, [elementRef]);

  return (
    <WindowSplitter
      {...splitterProps}
      aria-label="Resize sheet"
      aria-controls="virtualized-grid-container"
    />
  );
}
