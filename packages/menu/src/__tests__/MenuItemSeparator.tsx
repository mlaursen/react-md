import React from "react";
import { render } from "@testing-library/react";

import { Menu } from "../Menu";
import { MenuItem } from "../MenuItem";
import { MenuItemSeparator } from "../MenuItemSeparator";

describe("MenuItemSeparator", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<MenuItemSeparator />);
    expect(container).toMatchSnapshot();

    rerender(<MenuItemSeparator aria-orientation="vertical" />);
    expect(container).toMatchSnapshot();
  });

  it("should inherit the parent Menu's orientation unless it was manually provided", () => {
    interface Props {
      orientation?: "horizontal" | "vertical";
      horizontal?: boolean;
    }
    const Test = ({ orientation, horizontal }: Props) => (
      <>
        <button id="menu-control" type="button" />
        <Menu
          id="menu"
          controlId="menu-control"
          visible
          onRequestClose={() => {}}
          aria-label="Menu"
          horizontal={horizontal}
        >
          <MenuItem>Menu Item</MenuItem>
          <MenuItemSeparator
            aria-orientation={orientation}
            data-testid="separator"
          />
        </Menu>
      </>
    );
    const { getByTestId, rerender } = render(<Test />);

    // null for "horizontal" since it is the implicit value for separator roles
    let separator = getByTestId("separator");
    expect(separator.getAttribute("aria-orientation")).toBe(null);
    expect(separator).toMatchSnapshot();

    rerender(<Test horizontal />);
    separator = getByTestId("separator");
    expect(separator.getAttribute("aria-orientation")).toBe("vertical");
    expect(separator).toMatchSnapshot();

    rerender(<Test orientation="vertical" />);
    separator = getByTestId("separator");
    expect(separator.getAttribute("aria-orientation")).toBe("vertical");
    expect(separator).toMatchSnapshot();

    rerender(<Test horizontal orientation="horizontal" />);
    separator = getByTestId("separator");
    expect(separator.getAttribute("aria-orientation")).toBe(null);
    expect(separator).toMatchSnapshot();
  });
});
