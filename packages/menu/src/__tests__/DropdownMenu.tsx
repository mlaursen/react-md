/* eslint-disable react/jsx-key */
import React, { CSSProperties } from "react";
import { fireEvent, render } from "@testing-library/react";

import { DropdownMenu } from "../DropdownMenu";
import { MenuItem } from "../MenuItem";

const getById = (id: string) => {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error();
  }

  return el;
};

const PROPS = {
  id: "dropdown",
  children: "Dropdown",
};

describe("DropdownMenu", () => {
  it("should render correctly with a list of strings, numbers, ListItemProps, ReactElement, or a mixture of all", () => {
    const items1 = ["Item 1", "Item 2", "Item 3"];
    const { container, rerender } = render(
      <DropdownMenu {...PROPS} items={items1} />
    );
    expect(container).toMatchSnapshot();

    fireEvent.click(getById("dropdown"));
    expect(container).toMatchSnapshot();

    const items2 = [0, 1, 2, 3, 4];
    rerender(<DropdownMenu {...PROPS} items={items2} />);
    expect(container).toMatchSnapshot();

    const items3 = [
      {
        children: "Item 1",
      },
      { leftAddon: <i>icon</i>, children: "Item 2" },
      { rightAddon: <i>icon</i>, children: "Item 3" },
    ];
    rerender(<DropdownMenu {...PROPS} items={items3} />);
    expect(container).toMatchSnapshot();

    // Note: no key required
    const items4 = [
      <li id="item-1" role="menuitem">
        Item 1
      </li>,
      <MenuItem>Item 2</MenuItem>,
      "Item 3",
      4,
    ];
    rerender(<DropdownMenu {...PROPS} items={items4} />);
    expect(container).toMatchSnapshot();
  });

  it("should pass the menuStyle and menuClassName props to the menu correctly", () => {
    const menuStyle: CSSProperties = { color: "red" };
    const menuClassName = "my-custom-class-name";
    const { getByRole } = render(
      <DropdownMenu
        {...PROPS}
        menuStyle={menuStyle}
        menuClassName={menuClassName}
        items={["Item 1", "Item 2", "Item 3"]}
      />
    );

    const button = getByRole("button");
    fireEvent.click(button);

    const menu = getByRole("menu");
    expect(menu.style.color).toBe(menuStyle.color);
    expect(menu.className).toContain(menuClassName);
  });
});
