import React from "react";
import { render } from "@testing-library/react";

import { LinearProgress } from "../LinearProgress";

describe("LinearProgress", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<LinearProgress id="linear" />);

    expect(container).toMatchSnapshot();

    rerender(<LinearProgress id="linear" vertical />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress id="linear" vertical verticalHeight={null} />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress id="linear" vertical verticalHeight={300} />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress id="linear" reverse />);
    expect(container).toMatchSnapshot();
  });
});
