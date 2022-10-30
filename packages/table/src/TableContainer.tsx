import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { cnb } from "cnbuilder";

export function tableContainer({ className }: { className?: string }): string {
  return cnb("rmd-table-container", className);
}

export type TableContainerProps = HTMLAttributes<HTMLDivElement>;

/**
 * An extremely "useful" component that should be used with the `Table`
 * component if you want to make a responsive table within the page. If you
 * don't want to use this component, you can just apply `overflow: auto` to a
 * parent element of the table.
 */
export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  function TableContainer(props, ref) {
    const { className, children, ...remaining } = props;

    return (
      <div {...remaining} ref={ref} className={tableContainer({ className })}>
        {children}
      </div>
    );
  }
);
