import React from "react";
import { render } from "@testing-library/react";

import { MenuButton } from "../MenuButton";

describe("MenuButton", () => {
  it("should render correctly", () => {
    const props = { id: "button", visible: false };
    const { container, rerender } = render(<MenuButton {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<MenuButton {...props} visible />);
    expect(container).toMatchSnapshot();

    rerender(<MenuButton {...props} disableDropdownIcon />);
    expect(container).toMatchSnapshot();

    rerender(<MenuButton {...props} disableDropdownIcon visible />);
    expect(container).toMatchSnapshot();
  });
});
