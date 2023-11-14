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
import { tableHeader } from "./tableHeaderStyles.js";
import {
  type IsStickyTableSectionActive,
  type TableStickySectionProps,
} from "./types.js";

/**
 * @remarks \@since 6.0.0
 */
export const isTableHeaderStickyActive: IsStickyTableSectionActive = (
  entry
) => {
  return (
    entry.intersectionRatio < 1 &&
    entry.boundingClientRect.bottom <= window.innerHeight
  );
};

/**
 * @remarks \@since 6.0.0 Added support for "sticky-active" state.
 */
export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Pick<TableCellConfig, "lineWrap">,
    TableStickySectionProps {
  /**
   * This is a rename of the `disableHover` of the `TableConfig` since table
   * headers are not hoverable by default. This prop can be enabled to add the
   * row hover color within table headers, but it is not really recommended.
   *
   * @defaultValue `false`
   */
  hoverable?: boolean;

  /** @defaultValue {@link isTableHeaderStickyActive} */
  isStickyActive?: IsStickyTableSectionActive;
}

/**
 * **Client Component**
 * TODO: Create separate useStickyTableHeader + StickyTableHeader component
 *
 * Creates a `<thead>` element with some basic styles. This component will also
 * update the table configuration so that all the `TableCell` children will
 * automatically become `<th>` elements instead of the normal `<td>` as well as
 * disabling the hover effect and line wrapping. The hover effect and
 * line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 */
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(function TableHeader(props, propRef) {
  const {
    className,
    hoverable = false,
    lineWrap: propLineWrap,
    children,
    sticky = false,
    stickyOptions,
    isStickyActive = isTableHeaderStickyActive,
    disableStickyStyles = false,
    ...remaining
  } = props;

  // update the table configuration with the custom overrides for the `<thead>`
  const { dense, hAlign, vAlign, lineWrap, disableHover, disableBorders } =
    useTableConfig({
      lineWrap: propLineWrap,
      disableHover: !hoverable,
    });

  const configuration = useMemo<TableConfigContext>(
    () => ({
      dense,
      header: true,
      hAlign,
      vAlign,
      lineWrap,
      disableBorders,
      disableHover,
    }),
    [dense, hAlign, vAlign, lineWrap, disableBorders, disableHover]
  );

  const [theadRef, theadRefCallback] = useEnsuredRef(propRef);
  const { exists, containerRef } = useTableContainer();
  const [stickyActive, setStickyActive] = useState(false);
  const targetRef = useIntersectionObserver({
    ref: exists ? undefined : theadRefCallback,
    root: containerRef,
    disabled: !sticky || disableStickyStyles,
    threshold: exists ? 0 : 1,
    getRootMargin: useCallback(() => {
      const thead = theadRef.current;
      if (!thead) {
        return;
      }

      let topOffset: number;
      if (exists) {
        topOffset = thead.offsetHeight - 1;
      } else {
        const top = parseFloat(window.getComputedStyle(thead).top);
        topOffset = Number.isNaN(top) ? 1 : top + 1;
      }

      return `-${topOffset}px 0px 0px`;
    }, [exists, theadRef]),
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
      <thead
        {...remaining}
        ref={exists ? theadRefCallback : targetRef}
        className={tableHeader({
          dense,
          sticky,
          stickyActive,
          className,
        })}
      >
        {children}
      </thead>
      {exists && sticky && !disableStickyStyles && (
        // rendering a `<tbody>` since it is valid to have 0-many in a table
        // https://html.spec.whatwg.org/multipage/tables.html#the-table-element
        <tbody aria-hidden ref={targetRef} />
      )}
    </TableConfigProvider>
  );
});
