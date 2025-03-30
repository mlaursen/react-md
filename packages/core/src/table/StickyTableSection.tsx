"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { TableConfigProvider } from "./TableConfigurationProvider.js";
import { tableFooter } from "./tableFooterStyles.js";
import { tableHeader } from "./tableHeaderStyles.js";
import {
  type TableSectionConfiguration,
  type TableStickySectionConfiguration,
} from "./types.js";
import { useStickyTableSection } from "./useStickyTableSection.js";
import { useTableSectionConfig } from "./useTableSectionConfig.js";

/** @since 6.0.0 */
export interface StickyTableSectionProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    TableStickySectionConfiguration,
    TableSectionConfiguration {
  type: "header" | "footer";

  /**
   * An optional className to use when the sticky section is covering other rows
   * (`active`). When this is defined, the default
   * `rmd-thead--sticky-active`/`rmd-tfoot--sticky-active` will no longer be
   * applied.
   */
  stickyActiveClassName?: string;
}

/**
 * **Client Component**
 *
 * This component is used to render a sticky `<thead>`/`<tfoot>` that
 * dynamically applies styles whenever the `<thead>`/`<tfoot>` are covering
 * content in the table.
 *
 * @see {@link https://next.react-md.dev/components/table | Table Demos}
 * @see {@link https://next.react-md.dev/components/table#sticky-tables | Sticky Table Demos}
 * @since 6.0.0
 */
export const StickyTableSection = forwardRef<
  HTMLTableSectionElement,
  StickyTableSectionProps
>(function StickyTableSection(props, ref) {
  const {
    type,
    className,
    hoverable,
    lineWrap,
    children,
    stickyOptions,
    isStickyActive,
    disableStickyStyles = false,
    stickyActiveClassName,
    ...remaining
  } = props;

  const isHeader = type === "header";
  const Section = isHeader ? "thead" : "tfoot";
  const styles = isHeader ? tableHeader : tableFooter;
  const { tbody, sectionRef, stickyActive } = useStickyTableSection({
    ref,
    type,
    stickyOptions,
    isStickyActive,
    disableStickyStyles,
    stickyActiveClassName,
  });
  const config = useTableSectionConfig({
    type,
    lineWrap,
    hoverable,
  });

  return (
    <TableConfigProvider value={config}>
      {!isHeader && tbody}
      <Section
        {...remaining}
        ref={sectionRef}
        className={styles({
          className,
          dense: config.dense,
          sticky: true,
          stickyActive,
          stickyActiveClassName,
        })}
      >
        {children}
      </Section>
      {isHeader && tbody}
    </TableConfigProvider>
  );
});
