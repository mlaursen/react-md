import { createRef } from "react";
import { render } from "../../test-utils";

import { Table } from "../Table";
import { TableBody } from "../TableBody";
import { TableCell } from "../TableCell";
import { TableRow } from "../TableRow";

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

    const { getByTestId, rerender } = render(
      <Table>
        <TableBody {...props} />
      </Table>
    );

    const body = getByTestId("body");
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
