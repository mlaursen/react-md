import { useEnsuredRef } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes, RefObject } from "react";
import { createContext, forwardRef, useContext, useMemo } from "react";

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface TableContainerContext {
  exists: boolean;
  containerRef: RefObject<HTMLDivElement>;
}

const context = createContext<Readonly<TableContainerContext>>({
  exists: false,
  containerRef: { current: null },
});
context.displayName = "TableContainer";
const { Provider } = context;

/**
 * This is used to implement the sticky header and footer intersection observer
 * behavior.
 *
 * @internal
 * @remarks \@since 6.0.0
 */
export function useTableContainer(): Readonly<TableContainerContext> {
  return useContext(context);
}

/**
 * @remarks \@since 6.0.0
 */
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
    const [nodeRef, refCallback] = useEnsuredRef(ref);

    const value = useMemo(
      () => ({
        exists: true,
        containerRef: nodeRef,
      }),
      [nodeRef]
    );

    return (
      <Provider value={value}>
        <div
          {...remaining}
          ref={refCallback}
          className={tableContainer({ className })}
        >
          {children}
        </div>
      </Provider>
    );
  }
);
