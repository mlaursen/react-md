import type { ReactElement } from "react";

import TableCellList from "./TableCellList";

export default function DocumentationCons(): ReactElement | null {
  return (
    <TableCellList>
      <li>English is the only official documentation language at this time.</li>
      <li>Some Typescript types could be improved</li>
    </TableCellList>
  );
}
