import React, { FC, ReactNode, createContext, useContext } from "react";

const HeaderContext = createContext(false);

interface HeaderContextProviderProps {
  header?: boolean;
  children: ReactNode;
}

type DefaultProps = Required<Pick<HeaderContextProviderProps, "header">>;
type WithDefaultProps = HeaderContextProviderProps & DefaultProps;

export const HeaderContextProvider: FC<HeaderContextProviderProps> = props => {
  const { header, children } = props as WithDefaultProps;

  return (
    <HeaderContext.Provider value={header}>{children}</HeaderContext.Provider>
  );
};

const defaultProps: DefaultProps = {
  header: false,
};

HeaderContextProvider.defaultProps = defaultProps;

export function useHeaderContext(propHeader: boolean | undefined) {
  const header = useContext(HeaderContext);
  return typeof propHeader !== "undefined" ? propHeader : header;
}
