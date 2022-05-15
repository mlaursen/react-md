import type { ReactElement } from "react";

import Code from "components/Code";

import TableCellList from "./TableCellList";

export default function AccessibilityPros(): ReactElement | null {
  return (
    <TableCellList>
      <li>Attempts to fix color contrast ratios automatically.</li>
      <li>
        Implements keyboard movement and searching for known accessible widgets.
      </li>
      <li>
        Maintains tab focus even while navigating through nested menus or
        dialogs.
      </li>
      <li>
        Adds warnings when different <Code>aria-*</Code> props are required but
        were omitted.
      </li>
    </TableCellList>
  );
}
