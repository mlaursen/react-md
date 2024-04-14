"use client";
import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type HTMLAttributes,
} from "react";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useIntersectionObserver } from "../useIntersectionObserver.js";
import {
  TableConfigProvider,
  useTableConfig,
  type TableCellConfig,
  type TableConfigContext,
} from "./TableConfigurationProvider.js";
import { useTableContainer } from "./TableContainerProvider.js";
import { tableFooter } from "./tableFooterStyles.js";
import {
  type IsStickyTableSectionActive,
  type TableStickySectionProps,
} from "./types.js";

/**
 * @since 6.0.0
 */
export const isTableFooterStickyActive: IsStickyTableSectionActive = (
  entry,
  isInTableContainer
) => {
  const { intersectionRatio, boundingClientRect, isIntersecting } = entry;
  if (isInTableContainer) {
    return !isIntersecting;
  }

  return intersectionRatio < 1 && boundingClientRect.top >= 0;
};
/**
 * @since 6.0.0 Added support for "sticky-active" state.
 */
export interface TableFooterProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Pick<TableCellConfig, "lineWrap">,
    TableStickySectionProps {
  /**
   * This is a rename of the `disableHover` of the `TableConfig` since table
   * footers are not hoverable by default. This prop can be enabled to add the
   * row hover color within table footers, but it is not really recommended.
   *
   * @defaultValue `false`
   */
  hoverable?: boolean;

  /** @defaultValue {@link isTableFooterStickyActive} */
  isStickyActive?: IsStickyTableSectionActive;
}

/**
 * **Client Component**
 * TODO: Create separate useStickyTableFooter + StickyTableFooter component
 *
 * Creates a `<tfoot>` element with some basic styles. This component will
 * disable the hover effect and line wrapping by default, but the hover effect
 * and line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 */
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(function TableFooter(props, propRef) {
  const {
    className,
    hoverable = false,
    lineWrap: propLineWrap,
    children,
    sticky = false,
    stickyOptions,
    isStickyActive = isTableFooterStickyActive,
    disableStickyStyles = false,
    stickyActiveClassName,
    ...remaining
  } = props;

  // update the table configuration with the custom overrides for the `<tfoot>`
  const { dense, hAlign, vAlign, lineWrap, disableHover, disableBorders } =
    useTableConfig({
      lineWrap: propLineWrap,
      disableHover: !hoverable,
    });

  const configuration = useMemo<TableConfigContext>(
    () => ({
      dense,
      header: false,
      hAlign,
      vAlign,
      lineWrap,
      disableBorders,
      disableHover,
    }),
    [dense, hAlign, vAlign, lineWrap, disableBorders, disableHover]
  );

  const [tfootRef, tfootRefCallback] = useEnsuredRef(propRef);
  const { exists, containerRef } = useTableContainer();
  const [stickyActive, setStickyActive] = useState(false);
  const targetRef = useIntersectionObserver<
    HTMLTableSectionElement | HTMLElement
  >({
    ref: exists ? undefined : tfootRefCallback,
    root: containerRef,
    disabled: !sticky || disableStickyStyles,
    threshold: exists ? 0 : 1,
    getRootMargin: useCallback(() => {
      const topOffset =
        exists && tfootRef.current ? tfootRef.current.offsetHeight - 1 : 1;

      return `0px 0px -${topOffset}px 0px`;
    }, [exists, tfootRef]),
    onUpdate: useCallback(
      ([entry]) => {
        setStickyActive(isStickyActive(entry, exists));
      },
      [exists, isStickyActive]
    ),
    // allow the user defined sticky options to override the default behavior
    ...stickyOptions,
  });

  return (
    <TableConfigProvider value={configuration}>
      {exists && sticky && !disableStickyStyles && (
        // rendering a `<tbody>` since it is valid to have 0-many in a table
        // https://html.spec.whatwg.org/multipage/tables.html#the-table-element
        <tbody aria-hidden ref={targetRef} />
      )}
      <tfoot
        {...remaining}
        ref={exists ? tfootRefCallback : targetRef}
        className={tableFooter({
          className,
          sticky,
          stickyActive,
          stickyActiveClassName,
        })}
      >
        {children}
      </tfoot>
    </TableConfigProvider>
  );
});
