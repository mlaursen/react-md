"use client";

import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import { TableConfigProvider } from "./TableConfigurationProvider.js";
import { tableHeader } from "./tableHeaderStyles.js";
import { type TableSectionConfiguration } from "./types.js";
import { useTableSectionConfig } from "./useTableSectionConfig.js";

export interface TableHeaderProps
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
 * Creates a `<thead>` element with some basic styles. This component will also
 * update the table configuration so that all the `TableCell` children will
 * automatically become `<th>` elements instead of the normal `<td>` as well as
 * disabling the hover effect and line wrapping. The hover effect and
 * line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 *
 * @see {@link https://react-md.dev/components/table | Table Demos}
 */
export function TableHeader(props: TableHeaderProps): ReactElement {
  const {
    ref,
    className,
    sticky,
    lineWrap,
    hoverable,
    children,
    ...remaining
  } = props;

  const config = useTableSectionConfig({
    type: "header",
    lineWrap,
    hoverable,
  });
  const { dense } = config;

  return (
    <TableConfigProvider value={config}>
      <thead
        {...remaining}
        ref={ref}
        className={tableHeader({
          className,
          dense,
          sticky,
        })}
      >
        {children}
      </thead>
    </TableConfigProvider>
  );
}
