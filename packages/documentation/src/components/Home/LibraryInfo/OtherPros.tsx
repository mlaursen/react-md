import React, { ReactElement } from "react";

import TableCellList from "./TableCellList";

const OtherPros = (): ReactElement | null => (
  <TableCellList>
    <li>
      A fairly small library size (gzipped):
      <ul>
        <li>
          Production UMD Bundle:
          <br />
          <b>86.49 KB</b>
        </li>
        <li>
          Default Production CSS Bundles:
          <br />
          <b>15.65 KB</b> - <b>15.71 KB</b>
        </li>
      </ul>
    </li>
  </TableCellList>
);

export default OtherPros;
