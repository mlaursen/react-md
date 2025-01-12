import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "test-utils";

import { TableContainer } from "../TableContainer.js";

describe("TableContainer", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "container",
      ref,
    } as const;

    const { rerender } = render(<TableContainer {...props} />);

    const container = screen.getByTestId("container");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(container);
    expect(container).toMatchSnapshot();

    rerender(
      <TableContainer
        {...props}
        style={{ backgroundColor: "red" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
