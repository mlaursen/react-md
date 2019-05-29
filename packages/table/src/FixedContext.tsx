import React, {
  FC,
  useContext,
  createContext,
  ReactNode,
  useMemo,
} from "react";

interface FixedContext {
  header?: boolean;
  footer?: boolean;
}

type DefaultValue = Required<FixedContext>;

const TableFixedContext = createContext({ header: false, footer: false });

interface FixedContextProviderProps extends FixedContext {
  children: ReactNode;
}
export const FixedContextProvider: FC<FixedContextProviderProps> = props => {
  const { header, footer, children } = props as FixedContextProviderProps &
    DefaultValue;

  const value = useMemo(() => ({ header, footer }), [header, footer]);

  return (
    <TableFixedContext.Provider value={value}>
      {children}
    </TableFixedContext.Provider>
  );
};

export function useFixedContext(
  header: boolean | undefined,
  footer: boolean | undefined
) {
  const context = useContext(TableFixedContext);
  if (typeof header === "undefined") {
    ({ header } = context);
  }

  if (typeof footer === "undefined") {
    ({ footer } = context);
  }

  return { header, footer };
}
