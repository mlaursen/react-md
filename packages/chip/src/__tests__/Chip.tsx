import React from "react";
import { render } from "@testing-library/react";

import Chip from "../Chip";

describe("Chip", () => {
  it("should render correctly", () => {
    const props = { children: "Content" };
    const { container, rerender } = render(<Chip {...props} />);

    expect(container).toMatchSnapshot();

    const leftIcon = <i className="material-icons">keyboard_arrow_left</i>;
    const rightIcon = <i className="material-icons">keyboard_arrow_right</i>;

    rerender(<Chip {...props} leftIcon={leftIcon} />);
    expect(container).toMatchSnapshot();

    rerender(<Chip {...props} rightIcon={rightIcon} />);
    expect(container).toMatchSnapshot();
  });
});
