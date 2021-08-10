import React, { ReactElement } from "react";
import { render } from "@testing-library/react";

import { Table, TableProps } from "../Table";
import { TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";
import { TableCell } from "../TableCell";
import { TableBody } from "../TableBody";
import { TableContainer } from "../TableContainer";

function Test(props: TableProps): ReactElement {
  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableCell header>Header</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Cell 1</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe("Table", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<Test />);
    expect(container).toMatchSnapshot();

    rerender(<Test dense hAlign="right" />);
    expect(container).toMatchSnapshot();

    rerender(<Test lineWrap disableHover disableBorders />);
    expect(container).toMatchSnapshot();

    rerender(<Test vAlign="top" fullWidth />);
    expect(container).toMatchSnapshot();

    rerender(
      <TableContainer>
        <Test />
      </TableContainer>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <TableContainer className="test">
        <Test />
      </TableContainer>
    );
    expect(container).toMatchSnapshot();
  });
});
