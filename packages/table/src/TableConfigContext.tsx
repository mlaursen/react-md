import React, {
  FC,
  createContext,
  ReactNode,
  useMemo,
  useContext,
} from "react";

export interface TableConfig {
  noWrap?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  extraPadding?: boolean;
}

type DefaultValue = Required<TableConfig>;

const TableConfigContext = createContext<DefaultValue>({
  noWrap: true,
  bordered: true,
  hoverable: true,
  extraPadding: true,
});

interface TableConfigProviderProps extends TableConfig {
  children: ReactNode;
}
export const TableConfigProvider: FC<TableConfigProviderProps> = providedProps => {
  const {
    noWrap,
    bordered,
    hoverable,
    extraPadding,
    children,
  } = providedProps as TableConfigProviderProps & DefaultValue;

  const value = useMemo(() => ({ noWrap, bordered, hoverable, extraPadding }), [
    noWrap,
    bordered,
    hoverable,
    extraPadding,
  ]);

  return (
    <TableConfigContext.Provider value={value}>
      {children}
    </TableConfigContext.Provider>
  );
};

const defaultProps: DefaultValue = {
  noWrap: true,
  bordered: true,
  hoverable: true,
  extraPadding: true,
};

TableConfigProvider.defaultProps = defaultProps;

interface ConfigurableOptions {
  propNoWrap?: boolean;
  propBordered?: boolean;
  propHoverable?: boolean;
  propExtraPadding?: boolean;
}
export function useTableConfigContext({
  propNoWrap,
  propBordered,
  propHoverable,
  propExtraPadding,
}: ConfigurableOptions) {
  const current = useContext(TableConfigContext);
  let noWrap = propNoWrap;
  let bordered = propBordered;
  let hoverable = propHoverable;
  let extraPadding = propExtraPadding;
  if (typeof noWrap === "undefined") {
    noWrap = current.noWrap;
  }

  if (typeof bordered === "undefined") {
    bordered = current.bordered;
  }

  if (typeof hoverable === "undefined") {
    hoverable = current.hoverable;
  }

  if (typeof extraPadding === "undefined") {
    extraPadding = current.extraPadding;
  }

  return {
    noWrap,
    bordered,
    hoverable,
    extraPadding,
  };
}
