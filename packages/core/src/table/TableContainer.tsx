"use client";

import {
  type HTMLAttributes,
  type ReactElement,
  type Ref,
  useMemo,
} from "react";

import { useEnsuredRef } from "../useEnsuredRef.js";
import {
  type TableContainerContext,
  TableContainerProvider,
} from "./TableContainerProvider.js";
import { tableContainer } from "./tableContainerStyles.js";

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

/**
 * **Client Component**
 *
 * An extremely "useful" component that should be used with the `Table`
 * component if you want to make a responsive table within the page. If you
 * don't want to use this component, you can just apply `overflow: auto` to a
 * parent element of the table.
 *
 * @see {@link https://react-md.dev/components/table | Table Demos}
 */
export function TableContainer(props: TableContainerProps): ReactElement {
  const { ref, className, children, ...remaining } = props;
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
