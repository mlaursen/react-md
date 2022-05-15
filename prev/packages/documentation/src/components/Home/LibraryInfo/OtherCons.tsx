import type { ReactElement } from "react";

import TableCellList from "./TableCellList";

export default function OtherCons(): ReactElement | null {
  return (
    <TableCellList>
      <li>
        <strong>Internet Explorer 11 is not fully supported</strong>.
      </li>
      <li>Probably overkill for small projects.</li>
      <li>
        This is a <b>side project</b> for the one active developer.
      </li>
      <li>Does not have a fully active community.</li>
      <li>Releases will be slow.</li>
    </TableCellList>
  );
}
