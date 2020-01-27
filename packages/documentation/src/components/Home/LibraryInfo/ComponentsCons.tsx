import React, { ReactElement } from "react";
import TableCellList from "./TableCellList";

const ComponentsCons = (): ReactElement | null => (
  <TableCellList>
    <li>
      Components are low-level which requires creating your own high-level
      components for repeated functionality or patterns.
    </li>
    <li>Typescript types can be improved when generics are involved.</li>
  </TableCellList>
);

export default ComponentsCons;
