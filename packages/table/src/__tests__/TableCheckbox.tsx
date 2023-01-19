import { ElementInteractionProvider, useCheckboxGroup } from "@react-md/core";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FC, ReactElement, ReactNode } from "react";
import { createRef } from "react";
import { Table } from "../Table";
import { TableBody } from "../TableBody";
import { TableCheckbox } from "../TableCheckbox";
import { TableRow } from "../TableRow";

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
    const { getByRole, rerender } = render(<TableCheckbox ref={ref} />, {
      wrapper: Wrapper,
    });

    const cell = getByRole("cell", { name: "Select Row" });
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

    const { getByRole } = render(<Test />, {
      wrapper: ({ children }) => (
        <ElementInteractionProvider mode="none">
          {children}
        </ElementInteractionProvider>
      ),
    });

    const row = getByRole("row");
    const checkbox = getByRole("checkbox");
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
    const { getByRole, rerender } = render(
      <TableCheckbox aria-label="Custom Label" />,
      { wrapper: Wrapper }
    );

    const cell = getByRole("cell", { name: "Custom Label" });
    expect(cell).toMatchSnapshot();

    rerender(<TableCheckbox aria-labelledby="another-id" />);
    expect(cell).not.toHaveAttribute("aria-label");
    expect(cell).toMatchSnapshot();
  });
});
