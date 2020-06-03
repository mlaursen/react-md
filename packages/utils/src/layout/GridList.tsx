import React, {
  Children,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import cn from "classnames";

import applyRef from "../applyRef";
import bem from "../bem";
import useResizeObserver from "../sizing/useResizeObserver";
import GridListCell from "./GridListCell";
import getScrollbarSize from "./scrollbarSize";

/**
 * This is the css variable that is used store the current size of each cell.
 */
export const CELL_SIZE_VAR = "--rmd-cell-size";

/**
 * This is the css variable that is used store the current margin of each cell.
 */
export const CELL_MARGIN_VAR = "--rmd-cell-margin";

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

/**
 * The children render function that will be provided the current grid list size
 * object and should return renderable elements.
 *
 * Note: The first time this is called, the `columns` and `cellWidth` will be
 * the `defaultSize`.  Once the `GridList` has been fully mounted in the DOM, it
 * will begin the sizing calculations and update with the "real" values. This
 * doesn't cause any problems if you are only rendering client side, but it
 * might mess up server-side rendering, so it is recommended to update the
 * `defaultSize` when server-side rendering if this can be "known" service-side
 * in your app.
 */
export type RenderGridListChildren = (size: GridListSize) => ReactNode;

export interface GridListProps extends HTMLAttributes<HTMLDivElement> {
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
   * should provide this prop. Otherwise it will be: `{ cellSize; maxCellSize,
   * columns: -1 }`
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

  /**
   * Boolean if the current scrollbar width should no longer be subtracted from
   * the total width of the grid list. This should only be disabled if your
   * `containerPadding` is updated to include scrollbar width as well since
   * it'll mess up the grid on OSes that display scrollbars.
   */
  disableScrollbarWidth?: boolean;

  /**
   * Boolean if the resize observer should stop tracking width changes within
   * the `GridList`. This should normally stay as `false` since tracking width
   * changes will allow for dynamic content being added to the list to not mess
   * up the grid calculation when the user is on an OS that shows scrollbars.
   */
  disableHeightObserver?: boolean;

  /**
   * Boolean if the resize observer should stop tracking width changes within
   * the `GridList`. This should normally stay as `false` since tracking width
   * changes will allow for dynamic content being added to the list to not mess
   * up the grid calculation when the user is on an OS that shows scrollbars.
   */
  disableWidthObserver?: boolean;

  /**
   * The children to display within the grid list. This can either be a callback
   * function that will provide the current calculated width for each cell that
   * should return renderable elements or any renderable elements that are sized
   * with the `--rmd-cell-width` css variable.
   */
  children: ReactNode | RenderGridListChildren;

  /**
   * Boolean if the current cell sizing should automatically be cloned into each
   * child. This will only work if the `children` is renderable element or a
   * list of renderable elements that accept the `style` and `className` props.
   */
  clone?: boolean;

  /**
   * Boolean if each child within the `GridList` should be wrapped with the
   * `GridListCell` component.  This will only work if the `children` is not a
   * `function`.
   */
  wrapOnly?: boolean;
}

type CSSProperties = React.CSSProperties & {
  [CELL_SIZE_VAR]: string;
  [CELL_MARGIN_VAR]?: string;
};

const block = bem("rmd-grid-list");
const isRenderFunction = (
  children: GridListProps["children"]
): children is RenderGridListChildren => typeof children === "function";

/**
 * The `GridList` component is a different way to render a list of data where
 * the number of columns is dynamic and based on the max-width for each cell.
 * Instead of setting a percentage width to each cell based on the number of
 * columns, this will dynamically add columns to fill up the remaining space and
 * have each cell grow up to a set max-width. A really good use-case for this is
 * displaying a list of images or thumbnails and allowing the user to see a full
 * screen preview once selected/clicked.
 */
const GridList = forwardRef<HTMLDivElement, GridListProps>(function GridList(
  {
    style,
    className,
    children,
    clone = false,
    wrapOnly = false,
    cellMargin,
    defaultSize,
    maxCellSize = 150,
    containerPadding = 16,
    disableHeightObserver = false,
    disableWidthObserver = false,
    ...props
  },
  forwardedRef
) {
  const [gridSize, setGridSize] = useState(
    defaultSize || { columns: -1, cellWidth: maxCellSize }
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const recalculate = useCallback(() => {
    if (!ref.current) {
      return;
    }

    // need to use rect instead of offsetWidth since we need decimal precision
    // for the width since offsetWidth is basically Math.ceil(width). the
    // calculations for max columns will be off on high-pixel-density monitors
    // or some zoom levels.
    let { width } = ref.current.getBoundingClientRect();
    width -= containerPadding;

    // just need to see if there is a scrollbar visible and subtract that width.
    // don't need decimal precision here since both values will be rounded
    if (ref.current.offsetHeight < ref.current.scrollHeight) {
      width -= getScrollbarSize("width");
    }

    const columns = Math.ceil(width / maxCellSize);
    setGridSize({ cellWidth: width / columns, columns });
  }, [maxCellSize, containerPadding]);

  const refHandler = useCallback(
    (instance: HTMLDivElement | null) => {
      applyRef(instance, forwardedRef);
      ref.current = instance;

      if (instance) {
        recalculate();
      }
    },
    [forwardedRef, recalculate]
  );

  useResizeObserver({
    disableHeight: disableHeightObserver,
    disableWidth: disableWidthObserver,
    onResize: recalculate,
    target: ref,
  });
  const mergedStyle: CSSProperties = {
    ...style,
    [CELL_SIZE_VAR]: `${gridSize.cellWidth}px`,
    [CELL_MARGIN_VAR]: cellMargin || undefined,
  };

  let content: ReactNode = null;
  if (isRenderFunction(children)) {
    content = children(gridSize);
  } else if (clone || wrapOnly) {
    content = Children.map(
      children,
      (child) => child && <GridListCell clone={clone}>{child}</GridListCell>
    );
  } else {
    content = children;
  }

  return (
    <div
      {...props}
      ref={refHandler}
      style={mergedStyle}
      className={cn(block(), className)}
    >
      {content}
    </div>
  );
});

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    GridList.propTypes = {
      style: PropTypes.object,
      clone: PropTypes.bool,
      wrapOnly: PropTypes.bool,
      className: PropTypes.string,
      children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
      cellMargin: PropTypes.string,
      maxCellSize: PropTypes.number,
      defaultSize: PropTypes.oneOfType([
        PropTypes.shape({
          columns: PropTypes.number.isRequired,
          cellWidth: PropTypes.number.isRequired,
        }),
        PropTypes.func,
      ]),
      containerPadding: PropTypes.number,
      disableHeightObserver: PropTypes.bool,
      disableWidthObserver: PropTypes.bool,
    };
  } catch (e) {}
}

export default GridList;
