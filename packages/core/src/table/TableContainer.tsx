"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";
import { useEnsuredRef } from "../useEnsuredRef.js";
import {
  TableContainerProvider,
  type TableContainerContext,
} from "./TableContainerProvider.js";
import { tableContainer } from "./tableContainerStyles.js";

export type TableContainerProps = HTMLAttributes<HTMLDivElement>;

/**
 * **Client Component**
 *
 * An extremely "useful" component that should be used with the `Table`
 * component if you want to make a responsive table within the page. If you
 * don't want to use this component, you can just apply `overflow: auto` to a
 * parent element of the table.
 */
export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  function TableContainer(props, ref) {
    const { className, children, ...remaining } = props;
    const [nodeRef, refCallback] = useEnsuredRef(ref);

    const value = useMemo<TableContainerContext>(
      () => ({
        exists: true,
        containerRef: nodeRef,
      }),
      [nodeRef]
    );

    return (
      <TableContainerProvider value={value}>
        <div
          {...remaining}
          ref={refCallback}
          className={tableContainer({ className })}
        >
          {children}
        </div>
      </TableContainerProvider>
    );
  }
);
