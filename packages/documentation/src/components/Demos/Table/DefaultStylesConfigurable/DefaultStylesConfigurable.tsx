import React, { FC } from "react";

import { Provider, useStylesState } from "./context";
import StyledTable from "./StyledTable";
import TableConfiguration from "./TableConfiguration";

import "./DefaultStylesConfigurable.scss";

const DefaultStylesConfigurable: FC = () => {
  const value = useStylesState();

  return (
    <Provider value={value}>
      <TableConfiguration />
      <StyledTable />
    </Provider>
  );
};

export default DefaultStylesConfigurable;
