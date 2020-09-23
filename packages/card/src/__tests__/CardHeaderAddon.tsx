import React from "react";
import { render } from "@testing-library/react";

import { CardHeaderAddon } from "../CardHeaderAddon";

describe("CardHeaderAddon", () => {
  it("should render as null if there are no children", () => {
    const { container } = render(<CardHeaderAddon />);

    expect(container).toMatchSnapshot();
    expect(container.firstElementChild).toBe(null);
  });

  it("should render correctly", () => {
    const props = {
      children: <i className="material-icons">keyboard_arrow_left</i>,
    };
    const { container, rerender } = render(<CardHeaderAddon {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<CardHeaderAddon {...props} className="custom-class-name" />);
    expect(container).toMatchSnapshot();
  });
});
