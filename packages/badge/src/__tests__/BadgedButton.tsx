import React from "react";
import { render } from "@testing-library/react";

import { BadgedButton } from "../BadgedButton";

describe("BadgedButton", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<BadgedButton id="badged-button" />);

    expect(container).toMatchSnapshot();

    rerender(<BadgedButton id="badged-button">99+</BadgedButton>);
    expect(container).toMatchSnapshot();
  });
});
