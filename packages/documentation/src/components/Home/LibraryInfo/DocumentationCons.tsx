import React, { ReactElement } from "react";

import TableCellList from "./TableCellList";

const DocumentationCons = (): ReactElement | null => (
  <TableCellList>
    <li>English is the only official documentation language at this time.</li>
    <li>Some Typescript types could be improved</li>
  </TableCellList>
);

export default DocumentationCons;
