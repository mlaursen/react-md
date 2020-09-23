import React, { ReactElement } from "react";
import { render, RenderResult } from "@testing-library/react";

import { TableCell } from "../TableCell";
import { TableRow } from "../TableRow";
import { Table } from "../Table";
import { TableHeader } from "../TableHeader";
import { TableBody } from "../TableBody";

const renderHeader = (children: ReactElement): RenderResult =>
  render(children, {
    wrapper: ({ children }) => (
      <Table>
        <TableHeader>
          <TableRow>{children}</TableRow>
        </TableHeader>
      </Table>
    ),
  });

const renderBody = (children: ReactElement): RenderResult =>
  render(children, {
    wrapper: ({ children }) => (
      <Table>
        <TableBody>
          <TableRow>{children}</TableRow>
        </TableBody>
      </Table>
    ),
  });

describe("TableCell", () => {
  it("should render as a th in the TableHeader by default", () => {
    const { rerender, getByTestId } = renderHeader(
      <TableCell data-testid="cell">Hello!</TableCell>
    );

    let cell = getByTestId("cell");
    expect(cell.tagName).toBe("TH");

    rerender(
      <TableCell data-testid="cell" header={false}>
        Hello!
      </TableCell>
    );

    cell = getByTestId("cell");
    expect(cell.tagName).toBe("TD");
  });

  it("should render as a td in the TableBody by default", () => {
    const { rerender, getByTestId } = renderBody(
      <TableCell data-testid="cell">Hello!</TableCell>
    );

    let cell = getByTestId("cell");
    expect(cell.tagName).toBe("TD");

    rerender(
      <TableCell data-testid="cell" header>
        Hello!
      </TableCell>
    );

    cell = getByTestId("cell");
    expect(cell.tagName).toBe("TH");
  });

  it('should apply the scope="col" automatically for a header in the TableHeader if the scope is not provided', () => {
    const props = { "data-testid": "cell", children: "Hello!" };
    const { rerender, getByTestId } = renderHeader(<TableCell {...props} />);

    let cell = getByTestId("cell");
    expect(cell.getAttribute("scope")).toBe("col");

    rerender(<TableCell {...props} scope="row" />);
    expect(cell.getAttribute("scope")).toBe("row");

    rerender(<TableCell {...props} header={false} />);

    cell = getByTestId("cell");
    expect(cell.getAttribute("scope")).toBe(null);
  });

  it('should apply the scope="row" automatically for a header in the TableRow if the scope is not provided', () => {
    const props = { "data-testid": "cell", children: "Hello!" };
    const { rerender, getByTestId } = renderBody(<TableCell {...props} />);

    let cell = getByTestId("cell");
    expect(cell.getAttribute("scope")).toBe(null);

    rerender(<TableCell {...props} scope="col" />);
    expect(cell.getAttribute("scope")).toBe("col"); // even though it _is_ invalid

    rerender(<TableCell {...props} header />);

    cell = getByTestId("cell");
    expect(cell.getAttribute("scope")).toBe("row");

    rerender(<TableCell {...props} header scope="col" />);
    expect(cell.getAttribute("scope")).toBe("col");
  });
});
