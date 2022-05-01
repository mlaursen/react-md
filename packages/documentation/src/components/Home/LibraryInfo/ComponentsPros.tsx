import type { ReactElement } from "react";

import Code from "components/Code";

import TableCellList from "./TableCellList";

export default function ComponentsPros(): ReactElement | null {
  return (
    <TableCellList>
      <li>More than 80 exported components.</li>
      <li>Components are low-level which allows for a lot of customization.</li>
      <li>
        Can be thought of as an extension of native HTML Elements. Every prop
        available on the native counterpart are available and refs are forwarded
        to the DOM node.
      </li>
      <li>
        Strictly typed in Typescript and loosely typed with{" "}
        <Code>PropTypes</Code>.
      </li>
    </TableCellList>
  );
}
