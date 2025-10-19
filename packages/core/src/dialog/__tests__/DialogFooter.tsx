import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { Button } from "../../button/Button.js";
import { render, screen } from "../../test-utils/index.js";
import { DialogFooter } from "../DialogFooter.js";
import { type DialogFooterAlignment, dialogFooter } from "../styles.js";

describe("DialogFooter", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "footer",
      ref,
    } as const;

    const { rerender } = render(<DialogFooter {...props} />);

    const footer = screen.getByTestId("footer");
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBe(footer);
    expect(footer).toMatchSnapshot();

    rerender(
      <DialogFooter
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(footer).toMatchSnapshot();
  });

  it("should support different alignments", () => {
    const { rerender } = render(
      <DialogFooter data-testid="footer">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </DialogFooter>
    );

    const footer = screen.getByTestId("footer");
    expect(footer).toMatchSnapshot();

    const alignments: DialogFooterAlignment[] = [
      "none",
      "start",
      "end",
      "between",
      "stacked-start",
      "stacked-end",
    ];

    alignments.forEach((align) => {
      rerender(
        <DialogFooter data-testid="footer" align={align}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </DialogFooter>
      );

      expect(footer).toMatchSnapshot();
    });
  });
});

describe("dialogFooter class name utility", () => {
  it("should be callable with no arguments", () => {
    expect(dialogFooter()).toMatchSnapshot();
  });
});
