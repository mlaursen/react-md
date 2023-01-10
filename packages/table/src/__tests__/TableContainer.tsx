import { render } from "@testing-library/react";
import { createRef } from "react";

import { TableContainer } from "../TableContainer";

describe("TableContainer", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "container",
      ref,
    } as const;

    const { getByTestId, rerender } = render(<TableContainer {...props} />);

    const container = getByTestId("container");
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
