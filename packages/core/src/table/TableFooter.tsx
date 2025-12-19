"use client";

import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import { TableConfigProvider } from "./TableConfigurationProvider.js";
import { tableFooter } from "./tableFooterStyles.js";
import { type TableSectionConfiguration } from "./types.js";
import { useTableSectionConfig } from "./useTableSectionConfig.js";

export interface TableFooterProps
  extends HTMLAttributes<HTMLTableSectionElement>, TableSectionConfiguration {
  ref?: Ref<HTMLTableSectionElement>;

  /**
   * NOTE: It is recommended to use the `StickyTableSection` component instead
   * of enabling this prop since it supports dynamically adding styles while the
   * header covering table rows.
   *
   * Set this to `true` to enable the sticky behavior.
   *
   * @defaultValue `false`
   */
  sticky?: boolean;
}

/**
 * **Client Component**
 *
 * Creates a `<tfoot>` element with some basic styles. This component will
 * disable the hover effect and line wrapping by default, but the hover effect
 * and line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 *
 * @see {@link https://react-md.dev/components/table | Table Demos}
 */
export function TableFooter(props: TableFooterProps): ReactElement {
  const { ref, className, hoverable, lineWrap, children, ...remaining } = props;

  const config = useTableSectionConfig({
    type: "footer",
    lineWrap,
    hoverable,
  });

  return (
    <TableConfigProvider value={config}>
      <tfoot {...remaining} ref={ref} className={tableFooter({ className })}>
        {children}
      </tfoot>
    </TableConfigProvider>
  );
}
