import React, { ReactElement } from "react";

import { Code } from "components/Code";
import Link from "components/Link";

import { UNPKG } from "./constants";
import TableCellList from "./TableCellList";

const StylingPros = (): ReactElement | null => (
  <TableCellList>
    <li>Styles provided by SCSS.</li>
    <li>
      Styles are designed so that the last defined and/or included styles take
      precedence. Ensures that adding a custom <Code>className</Code>
      to a component should always override the default
      <Code>react-md</Code> styles.
    </li>
    <li>Configurable theming and for dark mode support.</li>
    <li>Built-in support for RTL languages.</li>
    <li>
      Sensible defaults that can be overridden and opted-out to minify bundle
      size.
    </li>
    <li>
      Multiple mixins and functions to dynamically update your theme with
      built-in validation and warning messages when used incorrectly.
    </li>
    <li>
      2300+ pre-built themes available through the{" "}
      <Link href={`${UNPKG}/css/`}>unpkg CDN</Link>.
    </li>
    <li>Works with CSS Modules.</li>
    <li>Should work with any CSS-in-JS solution.</li>
  </TableCellList>
);

export default StylingPros;
