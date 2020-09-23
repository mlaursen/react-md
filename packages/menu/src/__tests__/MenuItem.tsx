import React from "react";
import { render } from "@testing-library/react";

import { MenuItem } from "../MenuItem";

describe("MenuItem", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<MenuItem>Item 1</MenuItem>);

    expect(container).toMatchSnapshot();

    rerender(
      <MenuItem id="menu-item-1" leftAddon={<i>icon</i>}>
        Item 1
      </MenuItem>
    );
    expect(container).toMatchSnapshot();
  });
});
