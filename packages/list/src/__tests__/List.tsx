import React from "react";
import { render } from "@testing-library/react";

import { List } from "../List";

describe("List", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<List />);

    expect(container).toMatchSnapshot();

    rerender(<List ordered />);
    expect(container).toMatchSnapshot();

    rerender(<List dense />);
    expect(container).toMatchSnapshot();

    rerender(<List horizontal />);
    expect(container).toMatchSnapshot();
  });
});
