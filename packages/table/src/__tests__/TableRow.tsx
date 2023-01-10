import { render } from "@testing-library/react";
import { createRef } from "react";

import { Table } from "../Table";
import { TableBody } from "../TableBody";
import { TableCell } from "../TableCell";
import { tableRow, TableRow } from "../TableRow";

describe("TableRow", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLTableRowElement>();
    const props = {
      "data-testid": "row",
      ref,
      children: <TableCell>Content</TableCell>,
    } as const;

    const { getByTestId, rerender } = render(
      <Table>
        <TableBody>
          <TableRow {...props} />
        </TableBody>
      </Table>
    );

    const row = getByTestId("row");
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

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(tableRow()).toMatchSnapshot();
    });
  });
});
