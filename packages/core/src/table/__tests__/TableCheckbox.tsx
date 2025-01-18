import { describe, expect, it } from "@jest/globals";
import { createRef, type FC, type ReactElement, type ReactNode } from "react";
import { render, screen, userEvent } from "../../test-utils/index.js";

import { useCheckboxGroup } from "../../form/useCheckboxGroup.js";
import { Table } from "../Table.js";
import { TableBody } from "../TableBody.js";
import { TableCheckbox } from "../TableCheckbox.js";
import { TableRow } from "../TableRow.js";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Table>
    <TableBody>
      <TableRow>{children}</TableRow>
    </TableBody>
  </Table>
);

describe("TableCheckbox", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLTableCellElement>();
    const { rerender } = render(<TableCheckbox ref={ref} />, {
      wrapper: Wrapper,
    });

    const cell = screen.getByRole("cell", { name: "Select Row" });
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    expect(ref.current).toBe(cell);
    expect(cell).toMatchSnapshot();

    rerender(
      <TableCheckbox
        ref={ref}
        style={{ pointerEvents: "none" }}
        className="custom-class-name"
      />
    );
    expect(cell).toMatchSnapshot();
  });

  it("should work within a clickable TableRow", async () => {
    function Test(): ReactElement {
      const { getCheckboxProps } = useCheckboxGroup({
        name: "selected",
      });

      const checkboxProps = getCheckboxProps("row1");
      const { checked, onChange } = checkboxProps;

      return (
        <Table>
          <TableBody>
            <TableRow clickable selected={checked} onClick={onChange}>
              <TableCheckbox {...checkboxProps} />
            </TableRow>
          </TableBody>
        </Table>
      );
    }

    render(<Test />);

    const row = screen.getByRole("row");
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    expect(row).not.toHaveClass("rmd-tr--selected");

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(row).toHaveClass("rmd-tr--selected");

    await userEvent.click(row);
    expect(checkbox).not.toBeChecked();
    expect(row).not.toHaveClass("rmd-tr--selected");
  });

  it("should handle the aria-label/aria-labelledby props correctly", () => {
    const { rerender } = render(<TableCheckbox aria-label="Custom Label" />, {
      wrapper: Wrapper,
    });

    const cell = screen.getByRole("cell", { name: "Custom Label" });
    expect(cell).toMatchSnapshot();

    rerender(<TableCheckbox aria-labelledby="another-id" />);
    expect(cell).not.toHaveAttribute("aria-label");
    expect(cell).toMatchSnapshot();
  });
});
