import React, { ReactElement } from "react";

import { Provider, useStylesState } from "./context";
import StyledTable from "./StyledTable";
import TableConfiguration from "./TableConfiguration";

export default function DefaultStylesConfigurable(): ReactElement {
  const value = useStylesState();

  return (
    <Provider value={value}>
      <TableConfiguration />
      <StyledTable />
    </Provider>
  );
}
