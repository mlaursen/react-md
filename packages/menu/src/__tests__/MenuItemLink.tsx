import React from "react";
import { render } from "@testing-library/react";

import { MenuItemLink } from "../MenuItemLink";

describe("MenuItemLink", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(
      <MenuItemLink href="#">ItemLink 1</MenuItemLink>
    );

    expect(container).toMatchSnapshot();

    rerender(
      <MenuItemLink id="menu-item-1" leftAddon={<i>icon</i>} href="#">
        ItemLink 1
      </MenuItemLink>
    );
    expect(container).toMatchSnapshot();
  });
});
