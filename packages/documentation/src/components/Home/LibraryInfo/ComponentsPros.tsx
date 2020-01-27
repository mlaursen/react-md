import React, { ReactElement } from "react";

import Code from "components/Code/Code";

import TableCellList from "./TableCellList";

const ComponentsPros = (): ReactElement | null => (
  <TableCellList>
    <li>More than 80 exported components.</li>
    <li>Components are low-level which allows for a lot of customization.</li>
    <li>
      Can be thought of as an extension of native HTML Elements. Every prop
      available on the native counterpart are available and refs are forwareded
      to the DOM node.
    </li>
    <li>
      Strictly typed in Typescript and loosely typed with <Code>PropTypes</Code>
      .
    </li>
  </TableCellList>
);

export default ComponentsPros;
