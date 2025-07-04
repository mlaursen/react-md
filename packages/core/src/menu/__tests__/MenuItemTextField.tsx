import { describe, expect, it, jest } from "@jest/globals";
import { createRef } from "react";

import {
  render,
  rmdRender,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { DropdownMenu } from "../DropdownMenu.js";
import { MenuItem } from "../MenuItem.js";
import {
  MenuItemTextField,
  type MenuItemTextFieldProps,
} from "../MenuItemTextField.js";

async function setup(props?: Partial<MenuItemTextFieldProps>) {
  const user = userEvent.setup();
  rmdRender(
    <DropdownMenu buttonChildren="Dropdown">
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItemTextField label="Field" {...props} />
      <MenuItem>Menu Item 2</MenuItem>
    </DropdownMenu>
  );

  await user.click(screen.getByRole("button", { name: "Dropdown" }));
  const item1 = screen.getByRole("menuitem", { name: "Menu Item 1" });
  const item2 = screen.getByRole("menuitem", { name: "Menu Item 2" });
  const field = screen.getByRole("textbox", { name: "Field" });

  return {
    user,
    item1,
    item2,
    field,
  };
}

describe("MenuItemTextField", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      ref,
      label: "Label",
    } as const;

    const { rerender } = render(<MenuItemTextField {...props} />);
    const element = screen.getByRole("textbox", { name: "Label" });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <MenuItemTextField
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should support adding props to the surrounding li", async () => {
    const user = userEvent.setup();
    const liRef = createRef<HTMLLIElement>();
    const onLiClick = jest.fn();
    const props: MenuItemTextFieldProps = {
      liProps: {
        "data-testid": "li",
        ref: liRef,
        onClick: onLiClick,
        style: { background: "orange" },
        className: "test-class-name",
      },
    };

    render(<MenuItemTextField {...props} />);
    const li = screen.getByTestId("li");
    expect(liRef.current).toBeInstanceOf(HTMLLIElement);
    expect(liRef.current).toBe(li);

    expect(li).toHaveStyle("background: orange");
    expect(li).toHaveClass("test-class-name");
    expect(li).toMatchSnapshot();

    await user.click(li);
    expect(onLiClick).toHaveBeenCalledTimes(1);
  });

  it("should prevent the menu from closing when clicked", async () => {
    const { user, field } = await setup();

    await user.click(field);
    expect(field).toBeInTheDocument();
    expect(field).toHaveFocus();

    await user.type(field, "300");
    expect(field).toBeInTheDocument();
    expect(field).toHaveFocus();
    expect(field).toHaveValue("300");
  });

  it("should prevent the menu from closing when the user types a space", async () => {
    const { user, field } = await setup();

    await user.type(field, "Hello, world!");
    expect(field).toHaveValue("Hello, world!");
    expect(field).toBeInTheDocument();
  });

  it("should should prevent the focus behavior while the text box if focused and has a value", async () => {
    const { user, field, item1, item2 } = await setup();

    await user.keyboard("[ArrowDown]");
    expect(item1).toHaveFocus();

    await user.keyboard("[ArrowDown]");
    expect(field).toHaveFocus();

    await user.keyboard("[ArrowDown]");
    expect(item2).toHaveFocus();

    await user.keyboard("[ArrowUp][ArrowUp]");
    expect(item1).toHaveFocus();

    await user.keyboard("[ArrowDown]");
    expect(field).toHaveFocus();

    await user.keyboard("abc[ArrowDown]");
    expect(field).toHaveFocus();

    await user.keyboard("[ArrowUp]");
    expect(field).toHaveFocus();

    await user.keyboard("[Home]");
    expect(field).toHaveFocus();

    await user.keyboard("[End]");
    expect(field).toHaveFocus();

    await user.clear(field);
    expect(field).toHaveFocus();

    await user.keyboard("[End]");
    expect(item2).toHaveFocus();
  });

  it("should allow for a custom onKeyDown event", async () => {
    const onKeyDown = jest.fn();
    const { user, field } = await setup({ onKeyDown });

    await user.type(field, "abc");
    expect(onKeyDown).toHaveBeenCalledTimes(3);
  });
});
