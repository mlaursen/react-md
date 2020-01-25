import React from "react";
import { render } from "@testing-library/react";

import CircularProgress from "../CircularProgress";

describe("CircularProgress", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<CircularProgress id="progress" />);

    expect(container).toMatchSnapshot();

    rerender(<CircularProgress id="progress" centered />);
    expect(container).toMatchSnapshot();

    rerender(<CircularProgress id="progress" centered={false} />);
    expect(container).toMatchSnapshot();
  });
});
