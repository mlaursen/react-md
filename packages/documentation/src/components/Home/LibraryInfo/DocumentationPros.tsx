import React, { ReactElement } from "react";

import Link from "components/Link";

import TableCellList from "./TableCellList";

const DocumentationPros = (): ReactElement | null => (
  <TableCellList>
    <li>
      All components, hooks, and utility functions are written and maintained in{" "}
      <Link href="https://typescriptlang.org">Typescript</Link>.
    </li>
    <li>
      All types are exported at the package root for convenience and are
      documented with <Link href="https://typedoc.org">Typedoc</Link>.
    </li>
    <li>
      Editor/IDE documentation integration if the &quot;Go to Definition&quot;
      functionality is supported.
    </li>
    <li>
      All SCSS variables, functions, and mixins are documented with{" "}
      <Link href="https://sassdoc.com">SassDoc</Link>.
    </li>
    <li>
      Multiple demos, common patterns, and use cases provided for each package.
    </li>
  </TableCellList>
);

export default DocumentationPros;
