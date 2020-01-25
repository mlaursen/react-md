import React from "react";
import { render } from "@testing-library/react";

import InputToggle from "../InputToggle";

describe("InputToggle", () => {
  it("should render correctly", () => {
    const props = { id: "toggle" };
    const { container, rerender } = render(
      <InputToggle {...props} type="radio" />
    );

    expect(container).toMatchSnapshot();

    rerender(<InputToggle {...props} type="checkbox" />);
    expect(container).toMatchSnapshot();
  });
});
