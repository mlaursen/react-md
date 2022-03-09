import type { ReactElement } from "react";
import TableCellList from "./TableCellList";

export default function ComponentsCons(): ReactElement | null {
  return (
    <TableCellList>
      <li>
        Components are low-level which requires creating your own high-level
        components for repeated functionality or patterns.
      </li>
      <li>Typescript types can be improved when generics are involved.</li>
    </TableCellList>
  );
}
