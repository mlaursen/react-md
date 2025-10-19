import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { Table } from "../Table.js";
import { TableBody } from "../TableBody.js";
import { TableCell } from "../TableCell.js";
import { TableRow } from "../TableRow.js";

describe("TableBody", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLTableSectionElement>();
    const props = {
      "data-testid": "body",
      ref,
      children: (
        <TableRow>
          <TableCell>Cell 1</TableCell>
        </TableRow>
      ),
    } as const;

    const { rerender } = render(
      <Table>
        <TableBody {...props} />
      </Table>
    );

    const body = screen.getByTestId("body");
    expect(body).toMatchSnapshot();

    rerender(
      <Table disableHover disableBorders>
        <TableBody
          {...props}
          disableHover={false}
          disableBorders={false}
          style={{ color: "red" }}
          className="custom-class-name"
        />
      </Table>
    );
    expect(body).toMatchSnapshot();

    rerender(
      <Table>
        <TableBody {...props} disableHover disableBorders />
      </Table>
    );
    expect(body).toMatchSnapshot();
  });
});
