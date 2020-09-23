import React from "react";
import { render } from "@testing-library/react";
import { create } from "react-test-renderer";

import { DialogFooter, DialogFooterProps } from "../DialogFooter";

const aligns: DialogFooterProps["align"][] = [
  "none",
  "start",
  "end",
  "between",
  "stacked-start",
  "stacked-end",
];

describe("DialogFooter", () => {
  it("should render correctly", () => {
    const { container } = render(<DialogFooter>Footer</DialogFooter>);
    const footer = container.querySelector("footer") as HTMLElement;

    expect(footer).not.toBeNull();
    expect(footer.textContent).toBe("Footer");
  });

  it('should apply the "rmd-dialog__footer--flex" className if the align prop is not "none"', () => {
    const { container, rerender } = render(<DialogFooter align="none" />);
    const footer = container.querySelector("footer") as HTMLElement;
    expect(footer.className).not.toContain("rmd-dialog__footer--flex");

    aligns.slice(1).forEach((align) => {
      rerender(<DialogFooter align={align} />);
      expect(footer.className).toContain("rmd-dialog__footer--flex");
    });
  });

  it('should apply the "rmd-dialog__footer--ALIGN" className if the align prop is not "none"', () => {
    const { container, rerender } = render(<DialogFooter align="none" />);
    const footer = container.querySelector("footer") as HTMLElement;
    expect(footer.className).not.toContain("rmd-dialog__footer--none");

    aligns.slice(1).forEach((align) => {
      rerender(<DialogFooter align={align} />);
      expect(footer.className).toContain(`rmd-dialog__footer--${align}`);
    });
  });

  it('should default to align="end"', () => {
    const { container } = render(<DialogFooter />);

    const footer = container.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();

    expect(footer.className).toContain("rmd-dialog__footer--end");
  });

  it("should render correctly (with snapshots)", () => {
    aligns.forEach((align) => {
      expect(
        create(
          <DialogFooter id="dialog-footer" align={align}>
            <button id="close-dialog" type="button">
              Close
            </button>
            <button id="confirm-dialog" type="button">
              Confirm
            </button>
          </DialogFooter>
        ).toJSON()
      ).toMatchSnapshot();

      expect(
        create(
          <DialogFooter id="dialog-footer" className="custom-class names-here">
            <button id="close-dialog" type="button">
              Close
            </button>
            <button id="confirm-dialog" type="button">
              Confirm
            </button>
          </DialogFooter>
        ).toJSON()
      ).toMatchSnapshot();
    });
  });
});
