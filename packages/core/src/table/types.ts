import { type IntersectionObserverHookOptions } from "../useIntersectionObserver.js";

export type SortOrder = "ascending" | "descending" | "none" | "other";

// interfaces that are "public" should be the full word `Configuration` while
// the private/internal should just be `Config`. "Great" naming convention!

export interface TableRowConfiguration {
  /**
   * Set to `true` if rows should no longer change background color while
   * hovered.
   *
   * @defaultValue `false`
   */
  disableHover?: boolean;

  /**
   * Set to `true` if the rows in the `TableBody` should no longer have borders
   * applied.
   *
   * @defaultValue `false`
   */
  disableBorders?: boolean;
}

/**
 * The horizontal alignment for the content within a cell.
 *
 * Note: Table default behavior is to align to the left.
 */
export type TableCellHorizontalAlignment = "left" | "center" | "right";

/**
 * The vertical alignment for the content within a cell.
 *
 * Note: When this is set to `"top"` or `"bottom"`, `padding-top` or
 * `padding-bottom` will also be applied due to how styling tables work.
 */
export type TableCellVerticalAlignment = "top" | "middle" | "bottom";

export interface TableCellConfiguration {
  hAlign?: TableCellHorizontalAlignment;
  vAlign?: TableCellVerticalAlignment;

  /**
   * Set this to `true` to allow `TableCell` content to line wrap.
   *
   * @defaultValue `false`
   */
  lineWrap?: boolean;
}

/**
 * @internal
 */
export interface TableCellConfig extends TableCellConfiguration {
  /**
   * Boolean if all the `TableCell` components should be rendered as a `<th>`
   * instead of a `<td>`. This is really just a convenience prop for the
   * `TableHeader` component so the user of `react-md` doesn't need to keep
   * setting the `type="th"` fot the `TableCell` if using the low-level
   * components.
   *
   * @internal
   */
  header?: boolean;
}

export interface TableConfig extends TableRowConfiguration, TableCellConfig {
  /**
   * Set this to `true` to decrease the height of all cells within the table.
   *
   * @defaultValue `false`
   */
  dense?: boolean;
}

export interface TableConfiguration extends TableConfig {
  /**
   * Set this to `true` to allow the table to span the full width of the
   * container element instead of having the width be determined by the content
   * within the table.
   *
   * @defaultValue `false`
   */
  fullWidth?: boolean;
}

export type TableConfigContext = Required<TableConfig>;

/** @since 6.0.0 */
export type TableStickySectionIntersectionObserverOptions = Pick<
  IntersectionObserverHookOptions<HTMLTableSectionElement>,
  "disabled" | "getThreshold" | "getRootMargin"
>;

/**
 * This **should be wrapped in `useCallback`** to increase performance.
 *
 * The default behavior is to enable the "active" state for sticky headers is:
 *
 * - if the `TableHeader` is within a `TableContainer`, add a hidden `<tbody>`
 *   after the `<thead>` and enable the active state once 1px overlaps with
 *   the container.
 * - otherwise, assume the `TableHeader` is fixed within the viewport and
 *   parse the `top` CSS style as `px`. enable the active state once 1px
 *   overlaps with this value AND the `TableHeader` exists within the
 *   viewport.
 *   - Note: This really only works with `px` and `rem` units.
 *
 * @see {@link TableStickySectionConfiguration.stickyOptions} for an example usage with custom threshold and
 * margin.
 * @since 6.0.0
 */
export type IsStickyTableSectionActive = (
  entry: IntersectionObserverEntry,
  isInTableContainer: boolean
) => boolean;

/** @since 6.0.0 */
export interface TableStickySectionConfiguration {
  /**
   * This can be used when the {@link sticky} prop is set to `true` for
   * additional behavior around the "active" state for sticky headers.
   *
   * @example Disabling Sticky Active State
   * ```ts
   * stickyOptions={{
   *   disabled: true,
   * }}
   * ```
   *
   * @example Custom Options
   * ```ts
   * stickyOptions={{
   *   getThreshold: useCallback(() => {
   *     // you can access the DOM safely from here
   *     return [0, 0.25, 0.5, 1];
   *   }, []),
   *   getRootMargin: useCallback(() => {
   *     // you can access the DOM safely from here
   *     return "-1px 0px 150px 0px";
   *   }, []),
   * }}
   * isStickyActive={useCallback((entry) => {
   *   // whatever custom logic you want. you can access the DOM safely from here
   *   return entry.isIntersecting;
   * }, [])}
   * ```
   *
   * @since 6.0.0
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API}
   */
  stickyOptions?: TableStickySectionIntersectionObserverOptions;

  /**
   * An optional className to use when the sticky section is covering other rows
   * (`active`). When this is defined, the default
   * `rmd-thead--sticky-active`/`rmd-tfoot--sticky-active` will no longer be
   * applied.
   */
  stickyActiveClassName?: string;

  /**
   * @see {@link IsStickyTableSectionActive} for a description.
   * @see {@link stickyOptions} for an example usage with custom threshold and
   * margin.
   * @since 6.0.0
   */
  isStickyActive?: IsStickyTableSectionActive;

  /**
   * Set this to `true` when the {@link sticky} prop is `true` to disable the
   * behavior of adding an additional className when the sticky mode is active.
   *
   * The `TableHeader` would gain the `.rmd-thead--sticky-active` class while
   * the `TableFooter` would gain the `.rmd-tfoot--sticky-active` class.
   *
   * @defaultValue `false`
   */
  disableStickyStyles?: boolean;
}

/** @since 6.0.0 */
export interface TableSectionConfiguration {
  /** @see {@link TableCellConfiguration.lineWrap} */
  lineWrap?: boolean;

  /**
   * @see {@link TableRowConfiguration.disableHover}
   * @defaultValue `false`
   */
  hoverable?: boolean;
}
