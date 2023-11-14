import type { IntersectionObserverHookOptions } from "../useIntersectionObserver.js";

/** @remarks \@since 6.0.0 */
export type TableStickySectionOptions = Pick<
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
 * @see {@link TableStickySectionProps.stickyOptions} for an example usage with custom threshold and
 * margin.
 * @remarks \@since 6.0.0
 */
export type IsStickyTableSectionActive = (
  entry: IntersectionObserverEntry,
  isInTableContainer: boolean
) => boolean;

/** @remarks \@since 6.0.0 */
export interface TableStickySectionProps {
  /**
   * @defaultValue `false`
   */
  sticky?: boolean;

  /**
   * This can be used when the {@link sticky} prop is set to `true` for
   * additional behavior around the "active" state for sticky headers.
   *
   * @example
   * Disabling Sticky Active State
   * ```ts
   * stickyOptions={{
   *   disabled: true,
   * }}
   * ```
   *
   * @example
   * Custom Options
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
   * @remarks \@since 6.0.0
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API}
   */
  stickyOptions?: TableStickySectionOptions;

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
   * @remarks \@since 6.0.0
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
