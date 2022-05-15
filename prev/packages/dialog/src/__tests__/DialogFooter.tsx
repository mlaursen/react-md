import type { ReactElement } from "react";
import { Button } from "@react-md/button";
import { render } from "@testing-library/react";

import type { DialogFooterAlignment, DialogFooterProps } from "../DialogFooter";
import { DialogFooter } from "../DialogFooter";

const aligns: readonly DialogFooterAlignment[] = [
  "none",
  "start",
  "end",
  "between",
  "stacked-start",
  "stacked-end",
];

function Test({ align }: DialogFooterProps): ReactElement {
  return (
    <DialogFooter align={align}>
      <Button>First Button</Button>
      <Button>Second Button</Button>
    </DialogFooter>
  );
}

describe("DialogFooter", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<Test />);
    expect(container).toMatchSnapshot();

    aligns.forEach((align) => {
      rerender(<Test align={align} />);
      expect(container).toMatchSnapshot();
    });
  });
});
