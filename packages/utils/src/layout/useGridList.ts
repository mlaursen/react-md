import {
  createContext,
  RefCallback,
  useCallback,
  useContext,
  useState,
} from "react";
import cn from "classnames";

import { useResizeObserver } from "../sizing/useResizeObserver";
import { PropsWithRef } from "../types";
import { useEnsuredRef } from "../useEnsuredRef";
import { scrollbarSize } from "./scrollbarSize";

/**
 * This is the css variable that is used store the current size of each cell.
 */
export const CELL_SIZE_VAR = "--rmd-cell-size";

/**
 * This is the css variable that is used store the current margin of each cell.
 */
export const CELL_MARGIN_VAR = "--rmd-cell-margin";

/**
 * @remarks \@since 2.3.0
 */
export const DEFAULT_GRID_LIST_MAX_CELL_SIZE = 150;

/**
 * @remarks \@since 2.3.0
 */
export const DEFAULT_GRID_LIST_PADDING = 16;

export interface GridListSize {
  /**
   * The current number of columns in the `GridList`.
   */
  columns: number;

  /**
   * The current width of each cell within the grid.
   */
  cellWidth: number;
}

const context = createContext<GridListSize>({
  columns: -1,
  cellWidth: -1,
});

/**
 * @remarks \@since 2.3.0
 */
export const { Provider: GridListSizeProvider } = context;

if (process.env.NODE_ENV !== "production") {
  context.displayName = "GridListSizeProvider";
}

/**
 * Gets the current size of each cell within the `GridList` component. If this
 * is used without a parent `GridList` component, `-1` is returned instead.
 *
 * @remarks \@since 2.3.0
 */
export function useGridListSize(): GridListSize {
  return useContext(context);
}

/**
 * @remarks \@since 2.3.0
 */
export interface UseGridListOptions {
  /**
   * An optional style object to merge with the grid custom css properties
   * object.
   */
  style?: React.CSSProperties;

  /**
   * An optional className to merge with the grid list class name
   */
  className?: string;

  /**
   * Boolean if the recalculation of grid sizing should not happen for height
   * changes.
   */
  disableHeight?: boolean;

  /**
   * Boolean if the recalculation of grid sizing should not happen for width
   * changes.
   */
  disableWidth?: boolean;

  /**
   * An optional margin to apply to each cell as the `CELL_MARGIN_VAR` css
   * variable only when it is defined. This has to be a number string with a
   * `px`, `em`, `rem` or `%` suffix or else the grid will break.
   */
  cellMargin?: string;

  /**
   * The max size that each cell can be.
   */
  maxCellSize?: number;

  /**
   * Since the `GridList` requires being fully rendered in the DOM to be able to
   * correctly calculate the number of `columns` and `cellWidth`, this _might_
   * cause problems when server-side rendering when using the children renderer
   * to create a grid list dynamically based on the number of columns. If the
   * number of columns and default `cellWidth` can be guessed server-side, you
   * should provide this prop. Otherwise it will be:
   * `{ cellSize; maxCellSize, columns: -1 }`
   */
  defaultSize?: GridListSize | (() => GridListSize);

  /**
   * This is _normally_ the amount of padding on the grid list item itself to
   * subtract from the `offsetWidth` since `padding`, `border`, and vertical
   * scrollbars will be included.  If you add a border or change the padding or
   * add borders to this component, you'll need to update the `containerPadding`
   * to be the new number.
   */
  containerPadding?: number;
}

export interface ProvidedGridListProps<E extends HTMLElement> {
  ref: RefCallback<E | null>;
  style: CSSProperties;
  className: string;
}

type CSSProperties = React.CSSProperties & {
  [CELL_SIZE_VAR]: string;
  [CELL_MARGIN_VAR]?: string;
};

export type UseGridListReturnValue<E extends HTMLElement> = readonly [
  ProvidedGridListProps<E>,
  GridListSize
];

/**
 * The `useGridList` hook allows you to get all the grid and sizing
 * functionality of the `GridList` component without needing to wrap your
 * children in a `<div>` element.
 *
 * Example:
 *
 * ```tsx
 * const [gridListProps] = useGridList({
 *   cellMargin: 16,
 *   maxCellSize: 300,
 *   containerPadding: 4,
 * });
 *
 * return <div {...gridListProps}>{children}</div>;
 * ```
 *
 * Note: You must manually provide the `gridSize` to the `GridListSizeProvider`
 * component that was added in 2.3.0 if you want to use the `useGridSize` hook.
 *
 * Example:
 *
 * ```tsx
 * const [gridListProps, gridSize] = useGridList()
 *
 * return (
 *   <GridListSizeProvider value={gridSize}>
 *     <MyComponent {...gridListProps} />
 *   </GridListSizeProvider>
 * );
 * ```
 *
 * @remarks \@since 2.3.0
 */
export function useGridList<E extends HTMLElement>({
  ref: propRef,
  style,
  className,
  cellMargin,
  defaultSize,
  maxCellSize = DEFAULT_GRID_LIST_MAX_CELL_SIZE,
  disableHeight = false,
  disableWidth = false,
  containerPadding = DEFAULT_GRID_LIST_PADDING,
}: PropsWithRef<UseGridListOptions, E> = {}): UseGridListReturnValue<E> {
  const [ref, mergedRef] = useEnsuredRef(propRef);
  const [gridSize, setGridSize] = useState(
    defaultSize || { columns: -1, cellWidth: maxCellSize }
  );
  const recalculate = useCallback(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    // need to use rect instead of offsetWidth since we need decimal precision
    // for the width since offsetWidth is basically Math.ceil(width). the
    // calculations for max columns will be off on high-pixel-density monitors
    // or some zoom levels.
    let { width } = target.getBoundingClientRect();
    width -= containerPadding;

    // just need to see if there is a scrollbar visible and subtract that width.
    // don't need decimal precision here since both values will be rounded
    if (target.offsetHeight < target.scrollHeight) {
      width -= scrollbarSize("width");
    }

    const columns = Math.ceil(width / maxCellSize);
    setGridSize({ cellWidth: width / columns, columns });
  }, [containerPadding, maxCellSize, ref]);
  const [, refHandler] = useResizeObserver(recalculate, {
    ref: mergedRef,
    disableHeight,
    disableWidth,
  });

  const mergedStyle: CSSProperties = {
    ...style,
    [CELL_SIZE_VAR]: `${gridSize.cellWidth}px`,
  };
  if (cellMargin) {
    mergedStyle[CELL_MARGIN_VAR] = cellMargin;
  }

  return [
    {
      ref: refHandler,
      style: mergedStyle,
      className: cn("rmd-grid-list", className),
    },
    gridSize,
  ];
}
