import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "../../test-utils/index.js";

import { Table } from "../Table.js";
import { TableBody } from "../TableBody.js";
import { TableCell } from "../TableCell.js";
import { TableRow } from "../TableRow.js";

describe("TableRow", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLTableRowElement>();
    const props = {
      "data-testid": "row",
      ref,
      children: <TableCell>Content</TableCell>,
    } as const;

    const { rerender } = render(
      <Table>
        <TableBody>
          <TableRow {...props} />
        </TableBody>
      </Table>
    );

    const row = screen.getByTestId("row");
    expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
    expect(ref.current).toBe(row);
    expect(row).toMatchSnapshot();

    rerender(
      <Table>
        <TableBody>
          <TableRow
            {...props}
            style={{ cursor: "pointer" }}
            className="custom-class-name"
          />
        </TableBody>
      </Table>
    );
    expect(row).toMatchSnapshot();

    rerender(
      <Table disableHover disableBorders>
        <TableBody>
          <TableRow {...props} disableHover={false} disableBorders={false} />
        </TableBody>
      </Table>
    );
    expect(row).toMatchSnapshot();

    rerender(
      <Table>
        <TableBody>
          <TableRow {...props} disableHover disableBorders />
        </TableBody>
      </Table>
    );
    expect(row).toMatchSnapshot();
  });
});
