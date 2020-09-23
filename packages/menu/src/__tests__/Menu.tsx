import React, { ReactElement } from "react";
import {
  fireEvent,
  render as testRenderer,
  RenderResult,
} from "@testing-library/react";

import { DropdownMenuItem } from "../DropdownMenuItem";
import { Menu } from "../Menu";

const PROPS = {
  id: "menu",
  controlId: "menu-container",
  visible: false,
  onRequestClose: () => {},
  "aria-label": "Menu",
  children: (
    <ul>
      <li id="menu-item-1" role="menuitem" tabIndex={-1}>
        Item 1
      </li>
      <li id="menu-item-2" role="menuitem" tabIndex={-1}>
        Item 2
      </li>
      <li id="menu-item-3" role="menuitem" tabIndex={-1}>
        Item 3
      </li>
    </ul>
  ),
};

const getById = (id: string) => {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error();
  }

  return el;
};

const render = (children: ReactElement): RenderResult =>
  testRenderer(children, {
    wrapper: ({ children }) => (
      <>
        <button id="menu-container" type="button" />
        {children}
        <button id="other-element" type="button" />
      </>
    ),
  });

describe("Menu", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<Menu {...PROPS} />);
    expect(container).toMatchSnapshot();

    rerender(<Menu {...PROPS} visible />);
    expect(container).toMatchSnapshot();
  });

  it("should trigger the onRequestClose when an element outside of the menu has been clicked but is not the control element", () => {
    const onRequestClose = jest.fn();
    const props = {
      ...PROPS,
      visible: true,
      onRequestClose,
    };

    render(<Menu {...props} />);
    expect(onRequestClose).not.toBeCalled();

    const control = getById(PROPS.controlId);
    fireEvent.click(control);
    expect(onRequestClose).not.toBeCalled();

    fireEvent.click(getById("other-element"));
    expect(onRequestClose).toBeCalledTimes(1);

    fireEvent.click(document.body);
    expect(onRequestClose).toBeCalledTimes(2);

    fireEvent.click(getById("menu-item-1"));
    expect(onRequestClose).toBeCalledTimes(3);
  });

  it("should not trigger the onRequestClose prop when a nested dropdown menu is clicked", () => {
    const onRequestClose = jest.fn();
    const props = {
      ...PROPS,
      visible: true,
      onRequestClose,
      children: (
        <ul>
          <DropdownMenuItem
            id="dropdown-menu-item-1"
            items={["Dropdown Item Child 1"]}
          >
            Dropdown Item
          </DropdownMenuItem>
        </ul>
      ),
    };

    render(<Menu {...props} />);
    expect(onRequestClose).not.toBeCalled();

    fireEvent.click(getById("dropdown-menu-item-1"));
    expect(onRequestClose).not.toBeCalled();
  });
});
