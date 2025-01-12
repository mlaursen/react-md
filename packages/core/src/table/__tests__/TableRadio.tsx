import { describe, expect, it } from "@jest/globals";
import { createRef, type FC, type ReactElement, type ReactNode } from "react";
import { useRadioGroup } from "../../form/useRadioGroup.js";
import { render, screen, userEvent, within } from "test-utils";
import { Table } from "../Table.js";
import { TableBody } from "../TableBody.js";
import { TableRadio } from "../TableRadio.js";
import { TableRow } from "../TableRow.js";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Table>
    <TableBody>
      <TableRow>{children}</TableRow>
    </TableBody>
  </Table>
);

describe("TableRadio", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLTableCellElement>();
    const { rerender } = render(<TableRadio ref={ref} />, {
      wrapper: Wrapper,
    });

    const cell = screen.getByRole("cell", { name: "Select Row" });
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    expect(ref.current).toBe(cell);
    expect(cell).toMatchSnapshot();

    rerender(
      <TableRadio
        ref={ref}
        style={{ pointerEvents: "none" }}
        className="custom-class-name"
      />
    );
    expect(cell).toMatchSnapshot();
  });

  it("should work within a clickable TableRow", async () => {
    function Test(): ReactElement {
      const { getRadioProps, setValue } = useRadioGroup({
        name: "selected",
      });

      const radioProps1 = getRadioProps("row1");
      const radioProps2 = getRadioProps("row2");

      return (
        <Table>
          <TableBody>
            <TableRow
              clickable
              selected={radioProps1.checked}
              onClick={() => {
                // only because of mismatched events
                setValue("row1");
              }}
            >
              <TableRadio {...radioProps1} />
            </TableRow>
            <TableRow
              clickable
              selected={radioProps2.checked}
              onClick={() => {
                // only because of mismatched events
                setValue("row2");
              }}
            >
              <TableRadio {...radioProps2} />
            </TableRow>
          </TableBody>
        </Table>
      );
    }

    render(<Test />);

    const [row1, row2] = screen.getAllByRole("row");
    const radio1 = within(row1).getByRole("radio");
    const radio2 = within(row2).getByRole("radio");
    expect(radio1).not.toBeChecked();
    expect(row1).not.toHaveClass("rmd-tr--selected");
    expect(radio2).not.toBeChecked();
    expect(row2).not.toHaveClass("rmd-tr--selected");

    await userEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(row1).toHaveClass("rmd-tr--selected");
    expect(radio2).not.toBeChecked();
    expect(row2).not.toHaveClass("rmd-tr--selected");

    await userEvent.click(row2);
    expect(radio1).not.toBeChecked();
    expect(row1).not.toHaveClass("rmd-tr--selected");
    expect(radio2).toBeChecked();
    expect(row2).toHaveClass("rmd-tr--selected");
  });

  it("should handle the aria-label/aria-labelledby props correctly", () => {
    const { rerender } = render(<TableRadio aria-label="Custom Label" />, {
      wrapper: Wrapper,
    });

    const cell = screen.getByRole("cell", { name: "Custom Label" });
    expect(cell).toMatchSnapshot();

    rerender(<TableRadio aria-labelledby="another-id" />);
    expect(cell).not.toHaveAttribute("aria-label");
    expect(cell).toMatchSnapshot();
  });
});
