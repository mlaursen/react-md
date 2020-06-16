import React, { ReactElement } from "react";

import Link from "components/Link";

import { UNPKG } from "./constants";
import TableCellList from "./TableCellList";

const OtherPros = (): ReactElement | null => (
  <TableCellList>
    <li>
      UMD bundles available for both development and production through the
      unpkg CDN.
      <ul>
        <li>
          Development:
          <br />
          <Link href={`${UNPKG}/umd/react-md.development.js`}>
            {`${UNPKG}/umd/react-md.development.js`}
          </Link>
        </li>
        <li>
          Production: <br />
          <Link href={`${UNPKG}/umd/react-md.production.min.js`}>
            {`${UNPKG}/umd/react-md.production.min.js`}
          </Link>
        </li>
      </ul>
    </li>
    <li>
      A fairly small library size (gzipped):
      <ul>
        <li>
          Production UMD Bundle:
          <br />
          <b>202.95 KB</b>
        </li>
        <li>
          Default Production CSS Bundles:
          <br />
          <b>15.65 KB</b> - <b>15.71</b>
        </li>
      </ul>
    </li>
  </TableCellList>
);

export default OtherPros;
