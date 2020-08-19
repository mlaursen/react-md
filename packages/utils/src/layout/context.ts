import { createContext, useContext } from "react";

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

export const { Provider: GridListSizeProvider } = context;

/**
 * Gets the current size of each cell within the `GridList` component. If this
 * is used without a parent `GridList` component, `-1` is returned instead.
 *
 * @since 2.3.0
 */
export function useGridListSize(): GridListSize {
  return useContext(context);
}
